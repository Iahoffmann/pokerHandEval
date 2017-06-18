const readline = require('readline');
const evaluator = require('./lib/util.js');
const text = require('./lib/textConstants');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: text.promptText.prompt
});

rl.prompt();

rl.on('line', (line) => {
    console.log(evaluator.evaluateHand(line));
    rl.prompt();
}).on('close', () => {
    console.log(text.promptText.goodBye);
    process.exit(0);
});
