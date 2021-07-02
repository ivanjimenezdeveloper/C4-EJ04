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
    return -1;
  }
  console.log(linea);
};

exports = {
  existeLinea,
};
