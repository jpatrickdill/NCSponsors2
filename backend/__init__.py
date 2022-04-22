import json
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
    app.config["CORS_ORIGIN"] = "*"
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
    data = request.get_json(force=True)

    q = Query.update(donations)

    q = q.set(donations.data, bytes.decode(request.get_data(), "utf-8"))
    q = q.where(donations.id == receipt_id)

    with db.connect() as conn:
        r = conn.execute(str(q) + " RETURNING *").first()

    if data.get("student"):
        print(data["student"])

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


@app.route("/api/oops", methods=["GET"])
def get_oops():
    with db.connect() as conn:
        receipts = conn.execute(text("select * from donations"))

        total = 0
        for r in receipts:
            if not r.data:
                continue

            data = json.loads(r.data)
            total += float(data["fields"]["donation"]["amount"][1:])

    return jsonify(total)


@app.route("/api/students", methods=["GET"])
def get_students():
    with db.connect() as conn:
        r = conn.execute("select * from roster")
        students = [
            {
                "name": student.full_name.strip(),
                "id": student.id
            } for student in r
        ]

        students = sorted(students, key=lambda s: s["name"].split(" ")[-1])
        return jsonify(students)


@app.route("/api/paymentcallback")
def paypal_callback():
    return "hi"


if __name__ == "__main__":
    app.run("0.0.0.0", 3001, debug=True)
