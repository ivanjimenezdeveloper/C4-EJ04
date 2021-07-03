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
          name: "Bus",
        },
        {
          value: "metro",
          name: "Metro",
        }
      ]
    },
    {
        value: "informacion extra",
        name: "informacionExtra",
        type: "checkbox",
        message: "¿Qué información extra quiere obtener de cada parada?",
        when:(respuestas)=> respuestas.tipo==="metro",
        choices: [

          {
            value:"coordenadas",
            name:"Coordenadas",
          }
          ,
          {
            value:"FechaDeInauguracion",
            name:"Fecha de Inauguración",
          }

        ]
    },
        {
           name: "errores",
           type: "confirm",
           message:"¿Quiere que le informemos de los errores?",
           when:(respuestas)=> respuestas.tipo==="metro",
        },
        {
          name: "consultaLinea",
          type: "input",
          message:"¿Qué línea quiere consultar?",
          when:(respuestas)=> respuestas.tipo==="metro",

        },



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
