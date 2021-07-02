const { program } = require("commander");

program.option("-c, --color <nombre>", "Especifica un nombre");

program.parse(process.argv);

const { nombre } = program.opts();
