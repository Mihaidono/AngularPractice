from bson import ObjectId
from pymongo.mongo_client import MongoClient
from flask import Flask, request


def get_database():
    with open("mongo_connection_uri", "r") as file:
        connection_uri = file.read()
    client = MongoClient(connection_uri)
    return client['piu_item_db']


item_collection = get_database()["item_list"]

app = Flask(__name__)


@app.route('/piu/create_item', methods=['POST'])
def create_item():
    try:
        object_to_be_created = request.get_json()
        item_collection.insert_one(object_to_be_created)
        return 'Object created successfully', 201
    except Exception:
        return 'Object could not be created', 400


@app.route('/piu/update_item/<id>', methods=['PUT'])
def update_item_by_id(id):
    try:
        object_update_to_be_made = request.get_json()
        result = item_collection.update_one({'_id': ObjectId(id)}, {'$set': object_update_to_be_made})
        if result.modified_count == 1:
            return 'Object updated successfully', 200
        else:
            return 'Object not found', 404
    except Exception:
        return 'Object could not be updated', 400


@app.route('/piu/get_item_by_id/<id>', methods=['GET'])
def get_item_by_id(id):
    try:
        item = item_collection.find_one({'_id': ObjectId(id)})
        if item:
            item['_id'] = str(item['_id'])
            return item, 200
    except Exception:
        return 'Object could not be returned', 400
    return "Object's ID does not exist", 404


@app.route('/piu/get_all_items', methods=['GET'])
def get_all_item():
    try:
        items = list(item_collection.find())
        for item in items:
            item['_id'] = str(item['_id'])
        return items, 200
    except Exception:
        return 'Objects could not be found', 400


@app.route('/piu/delete_item_by_id/<id>', methods=['DELETE'])
def delete_item_by_id(id):
    try:
        result = item_collection.delete_one({'_id': ObjectId(id)})
        if result.deleted_count == 1:
            return 'Object deleted successfully', 200
        else:
            return 'Object not found', 404
    except Exception:
        return 'Object could not be deleted', 400


if __name__ == '__main__':
    app.run()
