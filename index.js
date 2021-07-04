const { program } = require("commander");
const chalk = require("chalk");
const { tipoTransporte } = require("./cuestionarioTMB");
const api = require("./API/metro");
const mail = require("./email/mail");

(async () => {
  // Recibimos parametros de ejecucion
  program.option("-c, --color <color>", "Especifica un color en hexadecimal");
  program.option("-a, --abrev ", "da los datos abreviados");
  program.parse(process.argv);
  const { color, abrev } = program.opts();

  // Recogemos las respuestas del cuestionario sobre el tipo de transporte
  const respuesta = await tipoTransporte();

  // Si el transporte elegido es bus paramos la ejecucion del programa
  if (respuesta.tipo === "bus") {
    console.log(
      chalk.yellow(
        "No tenemos información disponible sobre los buses https://www.tmb.cat/es/home"
      )
    );
    process.exit(0);
  }

  // Si no es bus miramos si la linea consultada (que es un string) existe. Esta funcion devuelve un false si no existe
  // y un codigo de línea si la linea consultada existe
  console.log(await api.existeLinea(respuesta.consultaLinea));

  // Si la linea consultada no existe pararemos la ejecucion del programa. Si ha pedido que se muestren los errores
  // mostraremos un console log en negrita y de color rojo indicando que no existe la linea

  // Si la linea existe mostraremos el nombre de la línea y su descripcion. Si no se especifica color en la ejecucion debe mostrar
  // el color que nos da la api de la linea en caso contrario el texto tendra el color especificado por el usuario

  // Debemos extraer la informacion de las paradas y mostrarlas por consola. Ojo se utilizan diferentes modificadores siendo abrev
  // que se especifica en la la ejecucion del programa ademas de coordenadas y fecha inaguracion que se especifica en el cuestinario

  // Una vez mostradas debemos llamar al siguiente consultorio que preguntara si quiere que lo enviemos por mail y si la respuesta es
  // afirmativa debemos preguntar el correo destinatario

  // Ahora con las paradas guardadas debemos guardar en el archivo paradas.txt que se encuentra en la carpeta adjunto la informacion que
  // hemos mostrado por pantalla (nombre de la linea y sus paradas)

  // Tras guardar el archivo con los datos anteriores lo enviaremos por mail llamando a la función enviarMail. Finalizaremos el programa con un mensaje de
  // correo enviado.
})();
