from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Data soal regex TTS
QUESTIONS = {
    "rendang": {
        "mudah": [
            {"number": 1, "regex": r"\b[lL]aos\b", "answer": "laos", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[sS]erai\b", "answer": "serai", "row": 2, "col": 0, "direction": "down"},
        ],
        "sedang": [
            {"number": 1, "regex": r"\b[sS]antan\b", "answer": "santan", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[kK]unyit\b", "answer": "kunyit", "row": 0, "col": 3, "direction": "down"},
        ],
        "sulit": [
            {"number": 1, "regex": r"\b[cC]abai\b", "answer": "cabai", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[kK]emiri\b", "answer": "kemiri", "row": 1, "col": 2, "direction": "down"},
        ],
    },
    "soto": {
        "mudah": [
            {"number": 1, "regex": r"\b[bB]awang\b", "answer": "bawang", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[jJ]ahe\b", "answer": "jahe", "row": 2, "col": 1, "direction": "down"},
        ],
        "sedang": [
            {"number": 1, "regex": r"\b[kK]unyit\b", "answer": "kunyit", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[dD]aun\b", "answer": "daun", "row": 1, "col": 2, "direction": "down"},
        ],
        "sulit": [
            {"number": 1, "regex": r"\b[kK]apulaga\b", "answer": "kapulaga", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[kK]ayu\b", "answer": "kayu", "row": 2, "col": 3, "direction": "down"},
        ],
    },
    "rawon": {
        "mudah": [
            {"number": 1, "regex": r"\b[kK]luwek\b", "answer": "kluwek", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[gG]ula\b", "answer": "gula", "row": 1, "col": 2, "direction": "down"},
        ],
        "sedang": [
            {"number": 1, "regex": r"\b[lL]engkuas\b", "answer": "lengkuas", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[sS]antan\b", "answer": "santan", "row": 2, "col": 3, "direction": "down"},
        ],
        "sulit": [
            {"number": 1, "regex": r"\b[kK]etumbar\b", "answer": "ketumbar", "row": 0, "col": 0, "direction": "across"},
            {"number": 2, "regex": r"\b[kK]encur\b", "answer": "kencur", "row": 2, "col": 4, "direction": "down"},
        ],
    }
}


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
