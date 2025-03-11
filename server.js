const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());

const config = {
    user: 'sa',
    password: '123456',
    server: 'TH3B4R4K\\MSSQLSERVER2022', // Escapado de la barra invertida
    database: 'expedienteDB',
    options: {
        encrypt: true, // Usa esto para Azure
        trustServerCertificate: true // Cambia esto según tu entorno
    }
};

// Insertar datos
app.post('/insert', async (req, res) => {
    try {
        await sql.connect(config);
        const {
            cedula,
            nombreCompleto,
            fechaNacimiento,
            genero,
            edad,
            lugarNacimiento,
            direccion,
            contactoEmergencia,
            telefono,
            correo,
            tipoSangre,
            enfermedades,
            cirugias,
            historialFamiliar,
            enfermedadCronica,
            consumoSustancias,
            alimentacionEjercicio,
            manejoEstres,
            tratamientoMental,
            tipoTerapia
        } = req.body;

        const result = await sql.query`INSERT INTO Usuarios 
            (Cedula, NombreCompleto, FechaNacimiento, Genero, Edad, LugarNacimiento, Direccion, 
            ContactoEmergencia, Telefono, Correo, TipoSangre, Enfermedades, Cirugias, 
            HistorialFamiliar, EnfermedadCronica, ConsumoSustancias, AlimentacionEjercicio, 
            ManejoEstres, TratamientoMental, TipoTerapia) 
            VALUES 
            (${cedula}, ${nombreCompleto}, ${fechaNacimiento}, ${genero}, ${edad}, ${lugarNacimiento}, 
            ${direccion}, ${contactoEmergencia}, ${telefono}, ${correo}, ${tipoSangre}, 
            ${enfermedades}, ${cirugias}, ${historialFamiliar}, ${enfermedadCronica}, 
            ${consumoSustancias}, ${alimentacionEjercicio}, ${manejoEstres}, ${tratamientoMental}, 
            ${tipoTerapia})`;
        
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Buscar datos
app.get('https://saludlink.netlify.app/buscar/:id', async (req, res) => {
    try {
        await sql.connect(config);
        const id = req.params.id;
        const result = await sql.query`SELECT * FROM Usuarios WHERE Id = ${id}`;
        res.status(200).send(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

const cors = require('cors');
app.use(cors());

async function insertarDatos(datos) {
    const response = await fetch('https://saludlink.netlify.app/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    
    if (!response.ok) {
        throw new Error('Error al insertar datos');
    }
    return response.json();
}