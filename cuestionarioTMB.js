const inquirer= require ("inquirer");
const chalk = require("chalk");
// Tipo de transporte
const tipoTransporte = async () =>{
  const respuesta = await inquirer.prompt([
    {
      name: "tipo",
      type: "list",
      message:"¿Qué tipo de transporte quiere consultar?",
      choices: [
        {
          value: "bus",
          name: "bus",
        },
        {
          value: "metro",
          name: "metro",
        }
      ]
    },
    // {
    //   console.log(`No tenemos información disponible sobre los buses ${https://www.tmb.cat/es/home}´));
    //   when:(respuestas)=> respuestas.tipo==="bus";
    // }

  ])
  return (respuesta);
}

(async () => {
  const respuesta = await tipoTransporte();
  console.log(respuesta);

  if(respuesta.tipo === "bus"){
    console.log(chalk.yellow("No tenemos información disponible sobre los buses https://www.tmb.cat/es/home"));
    process.exit(0)
  }
}
)();
