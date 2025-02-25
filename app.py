from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            dob TEXT,
            gender TEXT,
            age INTEGER,
            birthplace TEXT,
            id_number TEXT,
            phone TEXT,
            email TEXT,
            address TEXT,
            emergency_contact TEXT,
            blood_type TEXT,
            diseases TEXT,
            surgeries TEXT,
            family_history TEXT,
            chronic_disease TEXT,
            hospitalized TEXT,
            injury TEXT,
            current_condition TEXT,
            medication TEXT,
            allergies TEXT,
            substances TEXT,
            diet_exercise TEXT,
            stress_mood TEXT,
            mental_treatment TEXT,
            therapy TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form
    name = data['name']
    dob = data['dob']
    gender = data['gender']
    age = data['age']
    birthplace = data['birthplace']
    id_number = data['id']
    phone = data['phone']
    email = data['email']
    address = data['address']
    emergency_contact = data['emergency_contact']
    blood_type = data['blood_type']
    diseases = data['diseases']