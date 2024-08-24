from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from models import ReadingMaterial, MCQQuiz, ShortAnswerQuiz, Material
from llm import generateLLM
import os
import uuid

app = Flask(__name__)

CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('MONGO_URI')
}

db = MongoEngine(app)

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

    return jsonify({'id': str(material_doc.id)}), 201

if __name__ == '__main__':
    app.run(debug=True)
