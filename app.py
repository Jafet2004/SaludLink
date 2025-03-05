from flask import Flask, request, jsonify
import sqlite3

# Crear la aplicación Flask
app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, 
        name TEXT, 
        dob TEXT, 
        gender TEXT, 
        cedula TEXT UNIQUE, 
        phone TEXT, 
        email TEXT
    )''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json()
        with sqlite3.connect('database.db') as conn:
            c = conn.cursor()
            c.execute('''INSERT INTO users (name, dob, gender, cedula, phone, email)
                         VALUES (?, ?, ?, ?, ?, ?)''', 
                         (data['name'], data['dob'], data['gender'], data['cedula'], data['phone'], data['email']))
            conn.commit()
        return jsonify({"status": "success"}), 200
    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "message": "Cédula ya registrada"}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/search/<cedula>', methods=['GET'])
def search(cedula):
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE cedula = ?', (cedula,))
    user = c.fetchone()
    conn.close()

    if user:
        return jsonify({"status": "success", "user": dict(user)}), 200
    else:
        return jsonify({"status": "not found"}), 404

# Inicializar la base de datos al iniciar
if __name__ == '__main__':
    init_db()  # Llamar a la inicialización de la base de datos
    app.run(debug=True)
