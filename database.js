import mysql from "mysql2";
import dotenv from "dotenv";


dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();



//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/*
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const selectImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Se requiere permiso para acceder a la galería.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    const imageUri = result.assets[0].uri;
    setSelectedImage({ uri: imageUri });
    await uploadImageToFirebase(imageUri);
  }
};

const uploadImageToFirebase = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageName = `empresas/${Date.now()}.jpg`;
    const imageRef = ref(storage, imageName);

    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);

    console.log("Imagen subida:", imageUrl);
    await saveImageUrlToDatabase(imageUrl);
  } catch (error) {
    console.error("Error al subir imagen:", error);
  }
};

const saveImageUrlToDatabase = async (imageUrl) => {
  try {
    const storedEmpresaId = await AsyncStorage.getItem("empresaId");
    if (!storedEmpresaId) return;

    const response = await fetch("https://solobackendintegradora.onrender.com/empresas/imagen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empresaId: storedEmpresaId, imagen: imageUrl }),
    });

    const result = await response.json();
    console.log("URL guardada en MySQL:", result);
  } catch (error) {
    console.error("Error al guardar la URL en MySQL:", error);
  }
};
*/



//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------






async function insertarImagenEmpresa(id, imagen) {
  return await query("CALL InsertarImagenEmpresa(?, ?)", [id, imagen]);
}

async function obtenerImagenEmpresa(id) {
  const result = await query("CALL ObtenerImagenEmpresa(?)", [id]);
  return result.length > 0 ? result[0].imagen : null;
}

async function actualizarImagenEmpresa(id, imagen) {
  return await query("CALL ActualizarImagenEmpresa(?, ?)", [id, imagen]);
}

async function eliminarImagenEmpresa(id) {
  return await query("CALL EliminarImagenEmpresa(?)", [id]);
}

// Procedimientos para Imágenes de Servicios
async function insertarImagenServicio(id, imagen) {
  return await query("CALL InsertarImagenServicio(?, ?)", [id, imagen]);
}

async function obtenerImagenServicio(id) {
  const result = await query("CALL ObtenerImagenServicio(?)", [id]);
  return result.length > 0 ? result[0].imagen : null;
}

async function actualizarImagenServicio(id, imagen) {
  return await query("CALL ActualizarImagenServicio(?, ?)", [id, imagen]);
}

async function eliminarImagenServicio(id) {
  return await query("CALL EliminarImagenServicio(?)", [id]);
}




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
  console.log("Resultado de la consulta:", rows);
  return rows;
}


export async function ModificarEstadoEmpresa(empresaid, nuevoestado) {
  const [rows] = await pool.query(
    'CALL ModificarEstadoEmpresa(?, ?)',
    [empresaid, nuevoestado]
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
    'CALL obtenerEmpresasRechazadas()'
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
  const [rows] = await pool.query(
    'CALL ObtenerServiciosEmpresa(?)',
    [empresa_id]
);
return rows;
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
