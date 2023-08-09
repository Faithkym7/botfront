from flask import Flask, request, jsonify
from flask_cors import CORS
from keyword_processor import process_user_input

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3000/"])

@app.route('/test', methods=['POST'])
def test():
    content_type = request.headers.get('Content-Type')
    
    if content_type == 'application/json':
        data = request.json
        user_text = data.get('text', '').lower()  # Convert input text to lowercase
        reply = process_user_input(user_text)
        response_data = {
            "message": reply
        }
        return jsonify(response_data)
    else:
        return jsonify({"message": "Content type is not supported."})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5002)
