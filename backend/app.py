from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from models import ReadingMaterial, MCQQuiz, ShortAnswerQuiz, Material
from llm import generateLLM
import json
import os

app = Flask(__name__)

CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('MONGO_URI')
}

db = MongoEngine(app)

# e43bc500-5811-48ff-8885-53d16b8be7b5

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
    generated_materials = generateLLM(data["text"])

    mongo_materials = []
    for item in generated_materials:
        if item["type"] == "reading":
            mongo_materials.append(ReadingMaterial(**item))
        elif item["type"] == "mcq_quiz":
            mongo_materials.append(MCQQuiz(**item))
        elif item["type"] == "open_ended_quiz":
            mongo_materials.append(ShortAnswerQuiz(**item))

    material_doc = Material(materials=mongo_materials)
    material_doc.save()

    return jsonify({
        'status': 201,
        'message': 'Successfully generated new learning materials!',
        'data': {'id': material_doc.id}
        }), 201

if __name__ == '__main__':
    app.run(debug=True)
