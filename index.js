const { program } = require("commander");

(async () => {
  program.option("-c, --color <color>", "Especifica un color en hexadecimal");
  program.option("-a, --abrev ", "da los datos abreviados");
  program.parse(process.argv);

  const { color, abrev } = program.opts();
})();
