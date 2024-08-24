from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine 

from models import ReadingMaterial, MCQQuiz, ShortAnswerQuiz, Material, Race
from flask_socketio import SocketIO, join_room, leave_room, send
from flask_cors import CORS
import os
import uuid

app = Flask(__name__)
CORS(app)

# Initialize MongoEngine
app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('MONGO_URI')
}
db = MongoEngine(app)

# Initialize SocketIO
socketio = SocketIO(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': '200'})

@app.route('/api/materials', methods=['POST'])
def create_material():
    data = request.get_json()
    materials = []

    for item in data:
        if item['type'] == 'reading':
            material = ReadingMaterial(material=item['material'])
        elif item['type'] == 'mcq_quiz':
            material = MCQQuiz(question=item['question'], options=item['options'], correct_answer=item['correct_answer'])
        elif item['type'] == 'short_answer_quiz':
            material = ShortAnswerQuiz(question=item['question'], correct_answer=item['correct_answer'])
        materials.append(material)

    material_doc = Material(materials=materials)
    material_doc.save()

    return jsonify({'id': str(material_doc.id)}), 201

@app.route('/api/materials/user/<string:usermail>', methods=['GET'])
def get_material_by_user(usermail):
    races = Race.objects(participants=usermail)
    if not races:
        return jsonify({"error": "No materials found for this user"}), 404

    materials = []
    for race in races:
        material = Material.objects(id=race.material).first()
        if material:
            materials.append({
                "race_name": race.race_name,
                "material_id": str(material.id),
                "materials": [
                    {
                        "type": item.type,
                        "content": item.material if item.type == "reading" else {
                            "question": item.question,
                            "options": getattr(item, "options", None),
                            "correct_answer": item.correct_answer
                        }
                    } for item in material.materials
                ]
            })
    return jsonify(materials), 200

@app.route('/api/materials/all', methods=['GET'])
def get_all_materials():
    materials = Material.objects()
    all_materials = []
    for material in materials:
        all_materials.append({
            "id": str(material.id),
            "materials": [
                {
                    "type": item.type,
                    "content": item.material if item.type == "reading" else {
                        "question": item.question,
                        "options": getattr(item, "options", None),
                        "correct_answer": item.correct_answer
                    }
                } for item in material.materials
            ]
        })
    return jsonify(all_materials), 200

@app.route('/create-race', methods=["POST"])
def create_race():
    race_name = request.json.get('race_name')
    admin_user = request.json.get('usermail')
    material_id = request.json.get('material')
    if not isinstance(material_id, str):
        print(f"{material_id} is of type {type(material_id)}")
        return jsonify({"error": "material_id must be a string"}), 400

    race = Race(race_name=race_name, participants=[admin_user], material=material_id)
    race.save()
    return jsonify({'race_id': str(race.id)}), 201


@socketio.on('join-race')
def handle_join_race(data): 
    race_id = data['race_id']
    usermail = data["usermail"]
    username = data['username']
    race = Race.objects(id=race_id).first()
    if race and usermail not in race.participants:
        race.participants.append(username)
        race.save()
        join_room(str(race_id))
        new_notif = {
            'race_id': race_id,
            'notification': f'{username} has joined the race!',
            'notif_type': 'join'
        }
        handle_notification(new_notif)

@socketio.on('leave-race')
def handle_leave_race(data):
    race_id = data['race_id']
    usermail = data['usermail']
    username = data['username']

    race = Race.objects(id=race_id).first()
    if race and usermail in race.participants:
        race.participants.remove(usermail)
        race.save()
        leave_room(str(race_id))
        new_notif = {
            'race_id': race_id,
            'notification': f'{username} has left the race!',
            'notif_type': 'leave'
        }
        handle_notification(new_notif)


@socketio.on('notify')
def handle_notification(data):
    race_id = data['race_id']
    notification = data['notification']
    notif_type = data['notif_type'] # achievement || finished || join || leave

    race = Race.objects(id=race_id).first()
    if race:
        send(notification, to=str(race_id))


if __name__ == '__main__':
    socketio.run(app, debug=True, use_reloader=False)