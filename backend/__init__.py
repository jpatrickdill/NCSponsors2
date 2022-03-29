from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder="build")

if not os.environ.get("DEV"):
    app.config["SERVER_NAME"] = "marchathon.nchsband.com"

print(app.config["SERVER_NAME"])


@app.route("/", defaults={"path": "200.html"})
@app.route("/<path:path>")
def serve_react(path):
    return send_from_directory(app.static_folder, path)


if __name__ == "__main__":
    app.run("localhost", 3001, debug=True)
