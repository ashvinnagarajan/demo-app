import schedule
import time
import yaml
import os
import requests
import threading
from datetime import datetime
from flask import Blueprint, jsonify, request

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

# List of recipient email addresses
RECIPIENTS = [
    'ashvinagarajan@gmail.com',
    'anerip@outlook.com',
]

MESSAGES_FILE = 'messages.yaml'
START_DATE = datetime(2025, 4, 7)

API_URL = "https://b72z172n67.execute-api.us-east-2.amazonaws.com/dev"

sender_email = "ashvinnagarajan@gmail.com"
sender_password = "cofh enmv cssx fmrs"  # Use an App Password if 2FA is enabled

# Initialize the Blueprint
affirmation_bp = Blueprint('affirmation_bp', __name__)

scheduler_thread = None
stop_event = threading.Event()

def load_messages():
    with open(MESSAGES_FILE, 'r') as f:
        data = yaml.safe_load(f)
        return data.get('messages', [])

def load_poets():
    with open(MESSAGES_FILE, 'r') as f:
        data = yaml.safe_load(f)
        return data.get('poets', [])

def load_quotes():
    with open(MESSAGES_FILE, 'r') as f:
        data = yaml.safe_load(f)
        return data.get('quotes', [])

def get_entry_index():
    today = datetime.now()
    delta_days = (today.date() - START_DATE.date()).days
    return delta_days

paragraph_about_her = "She's incredibly kind and loves thoughtful gestures. She has a great sense of humor."

def get_cute_message(message, poet, quote):
    today = datetime.now().date()
    prompt = (
        f"Today is {today}. Write a cute message I can send to my girlfriend. "
        f"Here's something about her: {paragraph_about_her}"
        f"Use this theme or message as a starting point: {message}."
        f"I also want a poem about romance from {poet}."
        f"I also want a motivational quote from {quote}."
        "It should be in the format: message, poem, quote. Don't use any labels for the sections."
        "Don't reference specific events or promises for the future."
    )
    response = requests.post(
        f"{API_URL}/api/dialog",
        json={"messages": [{"role": "user", "content": prompt}]},
    )
    response.raise_for_status()
    print(response.json())
    return response.json().get("response", "You're amazing and I love you more every day!")

def get_photo_attachment():
    # Placeholder logic — replace with real Google Photos integration
    photo_path = "/path/to/photo.jpg"
    with open(photo_path, "rb") as img:
        return MIMEImage(img.read(), name="sweet_photo.jpg")

def create_email(receiver_email, message, poet, quote):
    # Load messages
    # Get the cute message
    gen_ai_message = get_cute_message(message, poet, quote)

    # Create email
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "💌 A little something for you"

    # Add body
    body = (
        f"Hi love,\n\n"
        f"{gen_ai_message}\n\n"
        f"Hope this brings a smile to your face today 💕\n\n"
        f"With love,\nYour favorite human 🥰"
    )
    msg.attach(MIMEText(body, "plain"))

    # Attach photo
    # photo = get_photo_attachment()
    # msg.attach(photo)

    return msg

def send_emails(message, poet, quote):
    for recipient in RECIPIENTS:
        msg = create_email(recipient, message, poet, quote)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print("Email sent successfully!")


def job():
    messages = load_messages()
    poets = load_poets()
    quotes = load_quotes()
    index = get_entry_index()
    
    message = messages[index % len(messages)]
    poet = poets[index % len(poets)]
    quote = quotes[index % len(quotes)]
    send_emails(message, poet, quote)
    return message

def scheduler_loop():
    print("Scheduler thread running...")
    while not stop_event.is_set():
        schedule.run_pending()
        time.sleep(60)
    print("Scheduler thread stopped.")
    
def start_scheduler():
    global scheduler_thread
    if scheduler_thread and scheduler_thread.is_alive():
        print("Scheduler already running.")
        return

    schedule.clear() 
    schedule.every().day.at("09:00").do(job)

    stop_event.clear()  # Reset stop flag
    scheduler_thread = threading.Thread(target=scheduler_loop, daemon=True)
    scheduler_thread.start()
    print("Scheduler started.")

def stop_scheduler():
    stop_event.set()  # Signal the thread to stop
    print("Stop signal sent to scheduler.")

@affirmation_bp.route('/start', methods=['GET'])
def start_affirmation_scheduler():
    """
    Start the affirmation scheduler manually via an endpoint for testing purposes.
    """
    try:
        start_scheduler()
        return jsonify({"status": "Scheduler started"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@affirmation_bp.route('/stop', methods=['GET'])
def stop_affirmation_scheduler():
    try:
        stop_scheduler()
        return jsonify({"status": "Scheduler stopped"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@affirmation_bp.route('/messages/today', methods=['GET'])
def get_today_message():
    """
    Get the message for today based on the current date.
    """
    try:
        message = job()
        return jsonify({"message": message}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500