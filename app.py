from flask import Flask, render_template, request, redirect, url_for
import json
import os

app = Flask(__name__)

# Data soal regex TTS
DATA_FILE = os.path.join(os.path.dirname(__file__), "questions.json")

def load_questions():
    with open(DATA_FILE, encoding="utf-8") as f:
        return json.load(f)

QUESTIONS = load_questions()

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        difficulty = request.form.get("difficulty")
        part = request.form.get("part")
        return redirect(url_for("game", difficulty=difficulty, part=part))
    return render_template("index.html")


@app.route("/game")
def game():
    difficulty = request.args.get("difficulty")
    part = request.args.get("part")
    questions = QUESTIONS.get(part, {}).get(difficulty, [])
    return render_template("game.html", difficulty=difficulty, part=part, questions=questions)


if __name__ == "__main__":
    app.run(debug=True)
