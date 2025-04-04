import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
}).promise();


pool.getConnection()
  .then(connection => {
    console.log('Conexión a la base de datos exitosa');
    connection.release();
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });


  export async function ModificarPagoEmpresaTran(empresaid) {
    const [rows] = await pool.query(
      'CALL ModificarPagoEmpresaTran(?)',
      [empresaid]
  );
  return rows;
  }

  export async function ModificarPagoEmpresaEfe(empresaid) {
    const [rows] = await pool.query(
      'CALL ModificarPagoEmpresaEfe(?)',
      [empresaid]
  );
  return rows;
  }





  

  export async function VerHorarios(fecha) {
    const [rows] = await pool.query("CALL VerHorarios(?)", [fecha]);
    return rows;
  }


export async function guardarImagenE(imagenBuffer, id) {
  try {
    const [result] = await pool.query(
      "UPDATE empresas SET imagen = ? WHERE id = ?",
      [imagenBuffer, id]
    );
    console.log("Imagen insertada con ID:", result.insertId);
    return result.insertId;
  } catch (error) {
    console.error("Error al insertar la imagen en la base de datos:", error);
    throw error;
  }
}

export async function obtenerImagenPorIdE(id) {
  const [rows] = await pool.query(
    "SELECT imagen FROM empresas WHERE id = ?",
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
}

//-----
//-----
//-----
//-----

export async function guardarImagenS(imagenBuffer, id) {
  try {
    const [result] = await pool.query(
      "UPDATE empresas SET imagen = ? WHERE id = ?;",
      [imagenBuffer, id]
    );
    console.log("Imagen insertada con ID:", result.insertId); 
    return result.insertId;
  } catch (error) {
    console.error("Error al insertar la imagen en la base de datos:", error);
    throw error;
  }
}

export async function obtenerImagenPorIdS(id) {
  const [rows] = await pool.query(
    "SELECT imagen, type FROM empresas WHERE id = ?",
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
}

//-----
//-----
//-----
//-----








//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------




export async function Login(correo) {
  const [rows] = await pool.query(
      'CALL Login(?)',
      [correo]
  );
  return rows;
}


export async function Logins(correo) {
  const [rows] = await pool.query("CALL LoginUsuario(?)", [correo]);
  return rows;
}


export async function ModificarEstadoEmpresa(empresaid, nuevoestado, nuevoestadosus) {
  const [rows] = await pool.query(
    'CALL ModificarEstadoEmpresa(?, ?, ?)',
    [empresaid, nuevoestado, nuevoestadosus]
);
return rows;
}

export async function ModificarAdmicion(empresaid, nuevoestado) {
  const [rows] = await pool.query(
    'CALL ModificarAdmicion(?, ?)',
    [empresaid, nuevoestado]
);
return rows;
}

export async function ModificarSuscripcion(empresaid, nuevoestado) {
  const [rows] = await pool.query(
    'CALL ModificarSuscripcion(?, ?)',
    [empresaid, nuevoestado]
);
return rows;
}

export async function ObtenerEmpresasActivas() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresasActivas()'
);
return rows;
}

export async function obtenerEmpresasNoAdmitidas() {
  const [rows] = await pool.query(
    'CALL obtenerEmpresasNoAdmitidas()'
);
return rows;
}

export async function obtenerEmpresasRechazadas() {
  const [rows] = await pool.query(
    'CALL obtenerEmpresasRechazadas()'
);
return rows;
}

// Procedimientos para Empresas
export async function agregarEmpresa(nombre, rfc, direccion, correoEmpresa, correoAdmin, telefono, contrasena, imagen) {
  const [rows] = await pool.query(
    'CALL AgregarEmpresa(?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, rfc, direccion, correoEmpresa, correoAdmin, telefono, contrasena, imagen]
);
return rows;

}

export async function obtenerEmpresas() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresas()'
);
return rows;
}

export async function verEmpresaUnica(empresa_id) {
  const [rows] = await pool.query(
    'CALL VerEmpresaUnica(?)',
    [empresa_id]
);
return rows;
}

export async function actualizarEmpresa(empresa_id, nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen) {
  const [rows] = await pool.query(
    'CALL ActualizarEmpresa(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [empresa_id, nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen]
);
return rows;
}

export async function eliminarEmpresa(empresa_id) {
  const [rows] = await pool.query(
    'CALL EliminarEmpresa(?)',
    [empresa_id]
);
return rows;
}

// Procedimientos para Servicios
export async function agregarServicio(empresa, nombre, descripcion, precio, duracion) {
  const [rows] = await pool.query(
    'CALL AgregarServicio(?, ?, ?, ?, ?)',
    [empresa, nombre, descripcion, precio, duracion]
);
return rows;
}

export async function obtenerServicios() {
  const [rows] = await pool.query(
    'CALL ObtenerServicios()'
);
return rows;
}

export async function ObtenerEmpresasSuscripciones() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresasSuscripciones()'
);
return rows;
}

export async function obtenerServiciosEmpresa(empresa_id) {
  try {
    const [rows] = await pool.query('CALL ObtenerServiciosEmpresa(?)', [empresa_id]);
    //console.log("Resultados de la consulta:", rows);
    return rows;
  } catch (error) {
    console.error("Error al obtener los servicios de la empresa:", error);
    throw error; // Lanza el error para que Express lo capture
  }
}


export async function obtenerServicioEspecifico(servicio_id) {
  const [rows] = await pool.query(
    'CALL ObtenerServicioEspecifico(?)',
    [servicio_id]
);
return rows;
}

export async function actualizarServicio(servicio_id, empresa, nombre, descripcion, precio, duracion) {
  const [rows] = await pool.query(
    'CALL ActualizarServicio(?, ?, ?, ?, ?, ?)',
    [servicio_id, empresa, nombre, descripcion, precio, duracion]
);
return rows;
}

export async function eliminarServicio(servicio_id) {
  const [rows] = await pool.query(
    'CALL EliminarServicio(?)',
    [servicio_id]
);
return rows;
}

// Procedimientos para Usuarios//////////////////////////////////////////////////////////////////////////////////////////////




export async function crearUsuario(nombre, apellido, correo, contrasena, telefono) {
  const [rows] = await pool.query(
    'CALL CrearUsuario(?,?,?,?,?)',
    [nombre, apellido, correo, contrasena, telefono]
  );
  return rows; // Devolvemos las filas que devuelve el procedimiento almacenado
}


export async function obtenerUsuarios() {
  const [rows] = await pool.query(
    'CALL ObtenerUsuarios()'
);
return rows;
}

export async function obtenerUsuarioUnico(usuario_id) {
  const [rows] = await pool.query(
    'CALL ObtenerUsuarioUnico(?)',
    [usuario_id]
);
return rows;
}

export async function actualizarUsuario(usuario_id, nombre, apellido, correo, contrasena) {
  const [rows] = await pool.query(
    'CALL ActualizarUsuario(?, ?, ?, ?, ?)',
    [usuario_id, nombre, apellido, correo, contrasena]
);
return rows;
}

export async function eliminarUsuario(usuario_id) {
  const [rows] = await pool.query(
    'CALL EliminarUsuario(?)',
    [usuario_id]
);
return rows;
}

// Procedimientos para Citas
export async function crearCita(empresa, usuario, servicio, fecha, hora) {
  const [rows] = await pool.query(
    'CALL CrearCita(?, ?, ?, ?, ?)',
    [empresa, usuario, servicio, fecha, hora]
);
return rows;
}

export async function obtenerCitasEmpresa(empresa_id) {
  const [rows] = await pool.query('CALL ObtenerCitasEmpresa(?)', [empresa_id]);
  if (rows[0] && Array.isArray(rows[0])) {
      rows[0] = rows[0].map(cita => ({
          ...cita,
          fecha: cita.fecha ? cita.fecha.toISOString().split('T')[0] : null
      }));
  }
  return rows;
}


export async function obtenerCitasUsuario(usuario_id) {
  const [rows] = await pool.query(
    'CALL ObtenerCitasUsuario(?)',
    [usuario_id]
);
return rows;
}

export async function obtenerCitaUnica(cita_id) {
  const [rows] = await pool.query(
    'CALL ObtenerCitaUnica(?)',
    [cita_id]
);
return rows;
}

export async function cancelarCita(cita_id) {
  const [rows] = await pool.query(
    'CALL CancelarCita(?)',
    [cita_id]
);
return rows;
}
