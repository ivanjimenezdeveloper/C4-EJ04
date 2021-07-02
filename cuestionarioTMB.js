const inquirer= require ("inquirer");

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
    }

  ])
  return (respuesta);
}

(async () => {
  console.log(await tipoTransporte());
})();

