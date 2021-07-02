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
    `https://api.tmb.cat/v1/transit/linies/metro/${codigoLinea.properties.CODI_LINIA}/estacions?app_id=${apiId}&app_key=${apiKey}`
  );
  const json = await respuesta.json();

  return json.features;
};

exports = {
  existeLinea,
  datosLinea,
};
