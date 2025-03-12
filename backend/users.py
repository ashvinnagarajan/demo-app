from flask import Blueprint, jsonify, request
import boto3

# Initialize the Blueprint
users_bp = Blueprint('users_bp', __name__)

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
table = dynamodb.Table('users')
counter_table = dynamodb.Table('CounterTable')

# GET all users
@users_bp.route('/users', methods=['GET'])
def get_users():
    response = table.scan()
    return jsonify(response['Items'])

# GET a specific user by ID
@users_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    response = table.get_item(Key={'id': int(user_id)})
    if 'Item' in response:
        return jsonify(response['Item'])
    return jsonify({"error": "User not found"}), 404

# POST: Add a new user
@users_bp.route('/users', methods=['POST'])
def add_user():
    data = request.json
    if "name" not in data or "email" not in data:
        return jsonify({"error": "Name and email are required"}), 400
    new_user_id = get_next_user_id()
    new_user = {
        "id": new_user_id,
        "name": data.get("name"),
        "email": data.get("email")
    }
    table.put_item(Item=new_user)
    return jsonify(new_user), 201

# PUT: Update a user
@users_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    response = table.get_item(Key={'id': int(user_id)})
    if 'Item' not in response:
        return jsonify({"error": "User not found"}), 404
    updated_user = {
        "id": int(user_id),
        "name": data.get("name", response['Item']['name']),
        "email": data.get("email", response['Item']['email'])
    }
    table.put_item(Item=updated_user)
    return jsonify(updated_user)

# DELETE a user
@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    table.delete_item(Key={'id': int(user_id)})
    return jsonify({"message": "User deleted"}), 200

# Helper function to generate a new incrementing ID
def get_next_user_id() -> int:
    response = counter_table.update_item(
        Key={'counter_name': 'user_id'},
        UpdateExpression='ADD current_value :inc',
        ExpressionAttributeValues={':inc': 1},
        ReturnValues='UPDATED_NEW'
    )
    return int(response['Attributes']['current_value'])
