const { MarkovMachine } = require("./markov");
// const { cat, webCat, handleOutput } = require('./makeText');

describe("test mm", function() {
    let markov = new MarkovMachine("the cat in the hat");
    expect(markov).toBeInstanceOf(MarkovMachine);
})

