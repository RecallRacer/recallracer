import uuid
from flask_mongoengine import MongoEngine
from datetime import datetime

db = MongoEngine()

class ReadingMaterial(db.EmbeddedDocument):
    id = db.IntField(primary_key=True, required=True)
    type = db.StringField(required=True, default="reading")
    material = db.StringField(required=True)

class MCQQuiz(db.EmbeddedDocument):
    id = db.IntField(primary_key=True, required=True)
    type = db.StringField(required=True, default="mcq_quiz")
    question = db.StringField(required=True)
    options = db.MapField(db.StringField(), required=True)
    correct_answer = db.StringField(required=True)

class ShortAnswerQuiz(db.EmbeddedDocument):
    id = db.IntField(primary_key=True, required=True)
    type = db.StringField(required=True, default="short_answer_quiz")
    question = db.StringField(required=True)
    correct_answer = db.StringField(required=True)

class Material(db.Document):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = db.StringField(required=True)
    short_description = db.StringField(required=True)
    materials = db.ListField(db.GenericEmbeddedDocumentField())

class Race(db.Document):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    participants = db.ListField(db.StringField(), required=True)  # List of participant emails
    start_time = db.DateTimeField(default=datetime.utcnow)
    material_id = db.StringField(required=True)  # No primary_key=True here
    is_active = db.BooleanField(default=False)  # Indicates if the race is still active

    meta = {
        'collection': 'races',  # Name of the collection in MongoDB
        'ordering': ['-start_time']  # Default ordering by start time, descending
    }

