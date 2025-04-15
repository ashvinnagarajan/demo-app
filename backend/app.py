from flask import Flask
from flask_cors import CORS
from dialog import dialog_bp
from users import users_bp
from affirmation import affirmation_bp
from affirmation import start_scheduler
import threading

app = Flask(__name__)
CORS(app)

# Register the Blueprint
app.register_blueprint(users_bp)
app.register_blueprint(dialog_bp)
app.register_blueprint(affirmation_bp)

@app.route('/')
def home():
    return "Hello from Flask with Blueprints!"

if __name__ == "__main__":
    scheduler_thread = threading.Thread(target=start_scheduler, daemon=True)
    scheduler_thread.start()

    app.run(host='0.0.0.0', port=5000)
