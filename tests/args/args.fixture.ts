const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(`Today we ${args._} that life is ${args.life} on ${args.planet}`);
