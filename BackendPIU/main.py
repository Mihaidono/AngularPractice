from pymongo.mongo_client import MongoClient
from flask import Flask, jsonify, request


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    with open("mongo_connection_uri", "r") as file:
        connection_uri = file.read()
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(connection_uri)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['item_db']


item_collection = get_database()
app = Flask(__name__)


@app.route('/api/resource', methods=['POST'])
def create_item():
    # code to create a new resource
    return jsonify({'message': 'Resource created successfully'})


@app.route('/api/resource/<id>', methods=['PUT'])
def update_item(id):
    # code to update an existing resource
    return jsonify({'message': 'Resource updated successfully'})


@app.route('/api/resource/<id>', methods=['GET'])
def get_item(id):
    # code to get a specific resource
    return jsonify({'message': 'Here is your resource'})


@app.route('/api/resource/<id>', methods=['DELETE'])
def delete_resource(id):
    # code to delete a specific resource
    return jsonify({'message': 'Resource deleted successfully'})


if __name__ == '__main__':
    app.run()
