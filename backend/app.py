from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from models import ReadingMaterial, MCQQuiz, ShortAnswerQuiz, Material, Race
from llm import generateLLM
from flask_socketio import SocketIO
import json
import os

app = Flask(__name__)

CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('MONGO_URI')
}
db = MongoEngine(app)

@app.route("/api/materials/<string:material_id>", methods=["GET"])
def get_materials_by_id(material_id):
    try:
        material = Material.objects.get_or_404(id=material_id)
        return jsonify({
            "status": 200,
            "message": "Retrieved learning materials!",
            "data": json.loads(material.to_json())
        })
    except Exception as e:
        return jsonify({
            "status": 404,
            "message": str(e),
        }), 404

@app.route('/api/materials', methods=['POST'])
def create_materials():
    data = request.get_json()
    generated_output = generateLLM(data["text"])

    if generated_output is None:
        return jsonify({
            'status': 500,
            'message': 'Failed to generate learning materials.'
        }), 500

    title = generated_output.get("title")
    short_description = generated_output.get("short_description")
    materials_data = generated_output.get("materials", [])

    mongo_materials = []
    for idx, item in enumerate(materials_data, start=1):  # Start index from 1
        item['id'] = idx  # Assign the index as the id
        if item["type"] == "reading":
            mongo_materials.append(ReadingMaterial(**item))
        elif item["type"] == "mcq_quiz":
            mongo_materials.append(MCQQuiz(**item))
        elif item["type"] == "open_ended_quiz":
            mongo_materials.append(ShortAnswerQuiz(**item))

    material_doc = Material(
        title=title,
        short_description=short_description,
        materials=mongo_materials
    )
    material_doc.save()

    return jsonify({
        'status': 201,
        'message': 'Successfully generated new learning materials!',
        'data': {'id': str(material_doc.id)}
    }), 201

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

@app.route('/api/materials', methods=['GET'])
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

@app.route('/api/races', methods=["POST"])
def create_race():
    email = request.json.get('email')
    material_id = request.json.get('material_id')
    if not isinstance(material_id, str):
        print(f"{material_id} is of type {type(material_id)}")
        return jsonify({"error": "material_id must be a string"}), 400

    race = Race(participants=[email], material_id=material_id, is_active=False)
    race.save()
    return jsonify({'race_id': str(race.id)}), 201

@app.route('/api/races/<string:material_id>', methods=["PATCH"])
def add_player(material_id):
    try:
        data = request.get_json()
        email = data.get("email")

        if not email:
            return jsonify({"status": 400, "message": "Email is required"}), 400

        race = Race.objects(material_id=material_id).first()

        if not race:
            return jsonify({"status": 404, "message": "Race not found"}), 404

        if email in race.participants:
            return jsonify({"status": 400, "message": "Participant already in the race"}), 400

        race.participants.append(email)
        race.save()

        return jsonify({"status": 200, "message": "Participant added successfully", "data": race.participants}), 200

    except Exception as e:
        return jsonify({"status": 500, "message": str(e)}), 500

@app.route('/api/races/<string:material_id>/participants', methods=["GET"])
def get_participants(material_id):
    try:
        race = Race.objects(material_id=material_id).first()

        if not race:
            return jsonify({"status": 404, "message": "Race not found"}), 404

        return jsonify({"status": 200, "message": "Participants retrieved successfully", "data": race.participants}), 200

    except Exception as e:
        return jsonify({"status": 500, "message": str(e)}), 500

@app.route('/api/races', methods=['GET'])
def get_all_races():
    try:
        races = Race.objects.all()  
        races_list = []

        for race in races:
            race_data = {
                'id': str(race.id),
                'participants': race.participants,
                'start_time': race.start_time.isoformat(),
                'material_id': race.material_id,  # Adjusted to match your model
                'is_active': race.is_active
            }
            races_list.append(race_data)

        return jsonify({
            'status': 200,
            'message': 'Successfully retrieved all races!',
            'data': races_list
        }), 200

    except Exception as e:
        return jsonify({
            'status': 500,
            'message': str(e),
        }), 500

@app.route('/api/races/<string:material_id>/toggle', methods=["PATCH"])
def toggle_race(material_id):
    try:
        data = request.get_json()
        is_active = data.get("is_active")

        if is_active is None:
            return jsonify({"status": 400, "message": "is_active field is required"}), 400

        race = Race.objects(material_id=material_id).first()

        if not race:
            return jsonify({"status": 404, "message": "Race not found"}), 404

        race.is_active = is_active
        race.save()

        return jsonify({"status": 200, "message": "Race status updated successfully", "data": {"is_active": race.is_active}}), 200

    except Exception as e:
        return jsonify({"status": 500, "message": str(e)}), 500

@app.route('/api/races/<string:material_id>', methods=["GET"])
def get_race(material_id):
    try:
        race = Race.objects(material_id=material_id).first()
        
        if not race:
            return jsonify({"status": 404, "message": "Race not found"}), 404

        return jsonify({
            "status": 200,
            "message": "Race found",
            "data": json.loads(race.to_json())
        }), 200

    except Exception as e:
        return jsonify({"status": 500, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True);