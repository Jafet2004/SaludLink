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
        cedula TEXT UNIQUE, 
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
    )''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json()
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('''INSERT INTO users 
            (name, dob, gender, age, birthplace, cedula, phone, email, address, emergency_contact, 
             blood_type, diseases, surgeries, family_history, chronic_disease, hospitalized, injury, 
             current_condition, medication, allergies, substances, diet_exercise, stress_mood, 
             mental_treatment, therapy) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', 
            (data['name'], data['dob'], data['gender'], data['age'], data['birthplace'], 
             data['cedula'], data['phone'], data['email'], data['address'], data['emergency_contact'], 
             data['blood_type'], data['diseases'], data['surgeries'], data['family_history'], 
             data['chronic_disease'], data['hospitalized'], data['injury'], data['current_condition'], 
             data['medication'], data['allergies'], data['substances'], data['diet_exercise'], 
             data['stress_mood'], data['mental_treatment'], data['therapy']))
        conn.commit()
        conn.close()
        return jsonify({"status": "success"}), 200
    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "message": "Cédula ya registrada"}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/search/<cedula>', methods=['GET'])
def search(cedula):
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # Permite acceder a los datos como diccionario
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE cedula = ?', (cedula,))
    user = c.fetchone()
    conn.close()
    
    if user:
        return jsonify({"status": "success", "user": dict(user)}), 200
    else:
        return jsonify({"status": "not found"}), 404

if __name__ == '__main__':
    init_db()
    app.run(debug=True)