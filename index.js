const { Pool } = require('pg');

const config = {
    host: "localhost",
    port: 5432,
    database: "alwaysmusic",
    user: "postgres",
    password: "0000",
};

const pool = new Pool(config);

//Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.

const nuevoEstudiante = async (nombre, rut, curso, nivel) => {
    try {
        const text = "insert into alumnos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)";
        const values = [nombre, rut, curso, nivel];

        await pool.query(text, values);
        console.log(`Estudiante ${nombre} agregado con éxito`);
        
    } catch (error) {
        console.error("Error al ingresar el nuevo estudiante", error);
    } finally{
        pool.end();
    }
};

//Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut. 

const consultarPorRut = async (rut) => {
    try {
        const text = "select * from alumnos where rut = $1";
        const values = [rut];
        const response = await pool.query(text, values);
        console.log(response.rows);
    } catch (error) {
        console.error("Error al consultar el rut del estudiante", error);
    } finally{
        pool.end();
    }
};

//Crear una función asíncrona para obtener por consola todos los estudiantes registrados. 

const todosLosEstudiantes = async () => {
    try {
        const text = "select * from alumnos";
        const response = await pool.query(text);
        console.log(response.rows);
    } catch (error) {
        console.error("Error al querer ver a todos los estudiantes", error);
    } 
};

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos. 

const actualizardatos = async (rut, nombre, curso, nivel) => {
    try {
        const text = "update alumnos set nombre = $1, curso = $2, nivel = $3 WHERE rut = $4";
        const values = [nombre, curso, nivel, rut];

        await pool.query(text, values);
        console.log(`Estudiante ${nombre} editado con éxito`);

    } catch (error) {
        console.error("Error al querer actualizar los datos de los estudiantes", error);
    } finally{
        pool.end();
    }    
};

// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos

const eliminarRegistro = async (rut) => {
    try {        
        const text = "delete from alumnos where rut = $1";
        const values = [rut];
        
        await pool.query(text, values);
        console.log(`Registro de estudiante con rut ${rut} eliminado`);
    } catch (error) {
        console.error("Error al querer eliminar a un estudiante", error);
    } finally{
        pool.end();
    }
};

const args = process.argv.slice(2);
const opciones = args[0];

switch (opciones) {
    case 'nuevo': //node index.js nuevo "ingresar nombre" "ingresar rut" "Html5" "13"
        const [nombre, rut, curso, nivel] = args.slice(1);
        nuevoEstudiante(nombre, rut, curso, nivel);
        break;
    case 'rut': //node index.js rut 'ingresar rut'
        const rutEstudiante = args[1];
        consultarPorRut(rutEstudiante);
        break;
    case 'consulta': //node index.js consulta
        todosLosEstudiantes();
        break;
    case 'editar': //node index.js editar 'ingresar rut' 'Valito' 'JavaScript' '5465400'
        const [rutActualizar, nuevoNombre, nuevoCurso, nuevoNivel] = args.slice(1);
        actualizardatos(rutActualizar, nuevoNombre, nuevoCurso, nuevoNivel);
        break;
    case 'eliminar': //node index.js eliminar 'ingresar rut'
        const rutEliminar = args[1];
        eliminarRegistro(rutEliminar);
        break;
    default:
        console.log("La opcion ingresada no es valida. Por favor ingrese alguna de estas opciones: nuevo, buscar, consulta, editar o eliminar");
}
