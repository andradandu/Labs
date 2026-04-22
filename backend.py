from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import getpass

app = Flask(__name__)
CORS(app)

def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="profile_db",
        user=getpass.getuser(),
        password=""
    )

# --- API 1 ---
@app.route('/api/personal')
def get_personal():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM personal LIMIT 1")
    row = cur.fetchone()

    cur.close()
    conn.close()

    return jsonify({
        "name": row[1],
        "dateOfBirth": row[2],
        "education": row[3],
        "placesLived": row[4]
    })

# --- API 2 ---
@app.route('/api/professional')
def get_professional():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM professional")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []
    for r in rows:
        result.append({
            "title": r[1],
            "company": r[2],
            "period": r[3]
        })

    return jsonify(result)

# --- API 3 ---
@app.route('/api/hobbies')
def get_hobbies():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM hobbies")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = [{"interest": r[1]} for r in rows]

    return jsonify(result)

app.run(debug=True)