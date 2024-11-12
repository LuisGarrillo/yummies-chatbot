from flask import Flask, flash, redirect, jsonify, request, session
import model

app = Flask(__name__)
app.config['PERMANENT_SESSION_LIFETIME'] = 31536000
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = 'yuGmmLiesM'

@app.route("/chatbot", methods=["POST"])
def chatbot():
    client_message = request.get_json(request.get_data)
    respose = model.exchange(client_message["input"])
    data = {
        "bot_response": respose
    }
    return jsonify(data) 
