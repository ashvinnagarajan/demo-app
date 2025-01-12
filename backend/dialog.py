# dialog.py (Blueprint for dialog-related routes)
from flask import Blueprint, jsonify, request
from openai import AsyncOpenAI
import constants

# Initialize the Blueprint
dialog_bp = Blueprint('dialog_bp', __name__)

client = AsyncOpenAI(
  organization=constants.ORG_ID,
  project=constants.DEFAULT_PROJECT_ID,
  api_key=constants.API_KEY,
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
            model=constants.MODEL,
            messages=messages,
        )
        full_response: str = completion.choices[0].message.content

        return jsonify({"response": full_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500