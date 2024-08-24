from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    context = {
        "status": 200,
        "message": "Hello, World!",
        "data": {}
    }

    return context

if __name__ == '__main__':
    app.run(debug=True)