import os
from flask import Blueprint, jsonify, request
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
DEFAULT_PROJECT_ID = os.getenv("DEFAULT_PROJECT_ID")
MODEL = os.getenv("MODEL")
ORG_ID = os.getenv("ORG_ID")


# Initialize the Blueprint
dialog_bp = Blueprint('dialog_bp', __name__)

client = AsyncOpenAI(
  organization=ORG_ID,
  project=DEFAULT_PROJECT_ID,
  api_key=API_KEY,
)

# GET all users
@dialog_bp.route('/api/dialog', methods=['POST'])
async def get_dialog_response():
    data = request.json
    messages = data.get('messages', [])

    if not messages:
        return jsonify({"error": "No messages provided"}), 400

    try:
        completion = await client.chat.completions.create(
            model=MODEL,
            messages=messages,
        )
        full_response: str = completion.choices[0].message.content

        return jsonify({"response": full_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500