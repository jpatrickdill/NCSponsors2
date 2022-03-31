import os
from uuid import uuid4

from flask import Flask, send_from_directory, jsonify, request, abort
from flask_cors import CORS
from pypika import Table, Query
from time import time

from sqlalchemy import text

from backend.db import db

app = Flask(__name__, static_folder="build")

if not os.environ.get("DEV"):
    app.config["SERVER_NAME"] = "marchathon.nchsband.com"
else:
    cors = CORS(app)

print(app.config["SERVER_NAME"])

# pypika setup

donations = Table("donations")


# routes

@app.route("/", defaults={"path": "200.html"})
@app.route("/<path:path>")
def serve_react(path):
    return send_from_directory(app.static_folder, path)


@app.route("/api/session")
def session_id():
    # get random receipt id for future payment

    trans_id = str(uuid4())
    ts = int(time())

    with db.connect() as conn:
        q = Query.into(donations)
        q = q.columns("id", "timestamp") \
            .insert(trans_id, ts)

        r = conn.execute(str(q) + " RETURNING *")

    return jsonify({
        "id": trans_id,
        "timestamp": ts
    })


@app.route("/api/receipt/<receipt_id>", methods=["POST"])
def update_receipt(receipt_id):
    q = Query.update(donations)

    q = q.set(donations.data, bytes.decode(request.get_data(), "utf-8"))
    q = q.where(donations.id == receipt_id)

    with db.connect() as conn:
        r = conn.execute(str(q) + " RETURNING *").first()

    return jsonify({
        "id": r.id,
        "timestamp": r.timestamp,
        "data": r.data
    })


@app.route("/api/receipt/<receipt_id>", methods=["GET"])
def get_receipt(receipt_id):
    with db.connect() as conn:
        r = conn.execute(text("select * from donations where id=:rid"), rid=receipt_id).first()
        if r is None:
            abort(404)

    return jsonify({
        "id": r.id,
        "timestamp": r.timestamp,
        "data": r.data
    })


@app.route("/api/paymentcallback")
def paypal_callback():
    return "hi"


if __name__ == "__main__":
    app.run("localhost", 3001, debug=True)
