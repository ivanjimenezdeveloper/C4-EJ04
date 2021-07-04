require("dotenv").config();
const fetch = require("node-fetch");

const urlMetro = process.env.API_METRO;
const apiId = process.env.API_ID;
const apiKey = process.env.API_KEY;
const urlMetroAutenticado = `${urlMetro}?app_id=${apiId}&app_key=${apiKey}`;

const getLineasMetro = async () => {
  const respuesta = await fetch(urlMetroAutenticado);
  const paradas = await respuesta.json();

  return paradas.features;
};

const comprobarLinea = async (linea, lineas) => {
  const lineaReturn = lineas.filter((lineaApi) =>
    lineaApi.properties.NOM_LINIA.toLowerCase() === linea.toLowerCase()
      ? lineaApi
      : ""
  );

  return lineaReturn || false;
};

const existeLinea = async (lineaRespuesta) => {
  const lineas = await getLineasMetro();
  const linea = await comprobarLinea(lineaRespuesta, lineas);

  if (!linea) {
    return false;
  }
  return linea.properties.CODI_LINEA;
};
const datosLinea = async (lineaRespuesta) => {
  const lineas = await getLineasMetro();
  const linea = await comprobarLinea(lineaRespuesta, lineas);
  if (!linea) {
    return false;
  }
  const codigoLinea = { ...linea[0] };

  const respuesta = await fetch(
    `${urlMetro}/${codigoLinea.properties.CODI_LINIA}/estacions?app_id=${apiId}&app_key=${apiKey}`
  );
  const json = await respuesta.json();

  return json.features;
};

const getNombreParadas = (
  paradasLinea,
  { abrev, coordenadas, fechaInaguracion }
) =>
  paradasLinea.map((parada) => {
    const paradaToReturn = {};

    paradaToReturn.NOM_ESTACIO = abrev
      ? parada.properties.NOM_ESTACIO.substring(0, 3)
      : parada.properties.NOM_ESTACIO;

    if (coordenadas) paradaToReturn.coordinates = parada.geometry.coordinates;

    if (fechaInaguracion)
      paradaToReturn.DATA_INAUGURACIO = parada.properties.DATA_INAUGURACIO;

    return paradaToReturn;
  });

// Ejemplo de datos de paradas
// (async () => {
//   const nombreParadas = getNombreParadas(await datosLinea("L10S"), {
//     abrev: false,
//     coordenadas: true,
//     fechaInaguracion: true,
//   });
//   console.log(nombreParadas);
// })();

exports = {
  existeLinea,
  datosLinea,
  getNombreParadas,
};
