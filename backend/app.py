from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from models import ReadingMaterial, MCQQuiz, ShortAnswerQuiz, Material
import os
import uuid

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('MONGO_URI')
}

db = MongoEngine(app)

class Material(db.Document):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    materials = db.ListField(db.GenericEmbeddedDocumentField())

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

if __name__ == '__main__':
    app.run(debug=True)
