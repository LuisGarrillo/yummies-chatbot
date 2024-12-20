from flask import Flask, flash, redirect, jsonify, request, session, make_response, render_template
import model

app = Flask(__name__)
app.config['PERMANENT_SESSION_LIFETIME'] = 31536000
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = 'yuGmmLiesM'

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chatbot", methods=["POST"])
def chatbot():
    client_message = request.get_json(request.get_data)
    response = model.exchange(client_message["input"])
    data = {
        "bot_response": response
    }
    return jsonify(data)
