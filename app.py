from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, 
        name TEXT, 
        dob TEXT, 
        gender TEXT, 
        age INTEGER, 
        birthplace TEXT, 
        cedula TEXT, 
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
        therapy TEXT)''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT INTO users (name, dob, gender, age, birthplace, cedula, phone, email, address, emergency_contact, blood_type, diseases, surgeries, family_history, chronic_disease, hospitalized, injury, current_condition, medication, allergies, substances, diet_exercise, stress_mood, mental_treatment, therapy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
              (data['name'], data['dob'], data['gender'], data['age'], data['birthplace'], data['cedula'], data['phone'], data['email'], data['address'], data['emergency_contact'], data['blood_type'], data['diseases'], data['surgeries'], data['family_history'], data['chronic_disease'], data['hospitalized'], data['injury'], data['current_condition'], data['medication'], data['allergies'], data['substances'], data['diet_exercise'], data['stress_mood'], data['mental_treatment'], data['therapy']))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 200

@app.route('/search/<cedula>', methods=['GET'])
def search(cedula):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE cedula = ?', (cedula,))
    user = c.fetchone()
    conn.close()
    if user:
        user_dict = {
            "id": user[0],
            "name": user[1],
            "dob": user[2],
            "gender": user[3],
            "age": user[4],
            "birthplace": user[5],
            "cedula": user[6],
            "phone": user[7],
            "email": user[8],
            "address": user[9],
            "emergency_contact": user[10],
            "blood_type": user[11],
            "diseases": user[12],
            "surgeries": user[13],
            "family_history": user[14],
            "chronic_disease": user[15],
            "hospitalized": user[16],
            "injury": user[17],
            "current_condition": user[18],
            "medication": user[19],
            "allergies": user[20],
            "substances": user[21],
            "diet_exercise": user[22],
            "stress_mood": user[23],
            "mental_treatment": user[24],
            "therapy": user[25]
        }
        return jsonify({"status": "success", "user": user_dict}), 200
    else:
        return jsonify({"status": "not found"}), 404

if __name__ == '_main_':
    init_db()
    app.run(debug=True)