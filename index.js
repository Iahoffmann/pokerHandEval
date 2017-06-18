const readline = require('readline');
const evaluator = require('./lib/util.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Please enter your hand> '
});

rl.prompt();

rl.on('line', (line) => {
    const testString = '6s 2h 3d 4c 5s'; //TODO REPLACE
    console.log(evaluator.evaluateHand(testString));
    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});
