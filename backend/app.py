from flask import Flask
from flask_cors import CORS
from dialog import dialog_bp
from users import users_bp

app = Flask(__name__)
CORS(app)

# Register the Blueprint
app.register_blueprint(users_bp)
app.register_blueprint(dialog_bp)

@app.route('/')
def home():
    return "Hello from Flask with Blueprints!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
