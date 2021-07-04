const { program } = require("commander");
const chalk = require("chalk");
const {tipoTransporte} = require ("./cuestionarioTMB");
const api = require ("./API/metro");
const mail = require ("./email/mail");

(async () => {
  program.option("-c, --color <color>", "Especifica un color en hexadecimal");
  program.option("-a, --abrev ", "da los datos abreviados");
  program.parse(process.argv);

  const { color, abrev } = program.opts();
  const respuesta = await tipoTransporte();
  if(respuesta.tipo === "bus"){
    console.log(chalk.yellow("No tenemos información disponible sobre los buses https://www.tmb.cat/es/home"));
    process.exit(0)}

   console.log(await api.existeLinea(respuesta.consultaLinea));
})();
