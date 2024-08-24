import uuid
from flask_mongoengine import MongoEngine

db = MongoEngine()

class ReadingMaterial(db.EmbeddedDocument):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = db.StringField(required=True, default="reading")
    material = db.StringField(required=True)

class MCQQuiz(db.EmbeddedDocument):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = db.StringField(required=True, default="mcq_quiz")
    question = db.StringField(required=True)
    options = db.MapField(db.StringField(), required=True)
    correct_answer = db.StringField(required=True)

class ShortAnswerQuiz(db.EmbeddedDocument):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = db.StringField(required=True, default="short_answer_quiz")
    question = db.StringField(required=True)
    correct_answer = db.StringField(required=True)

class Material(db.Document):
    id = db.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    materials = db.ListField(db.GenericEmbeddedDocumentField())
