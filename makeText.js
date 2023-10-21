/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require("./markov");


/** read file at path and print it out. */

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            let markov = new MarkovMachine(data);
        }
    });
}

/** read page at URL and print it out. */

async function webCat(path) {
    try {
        let resp = await axios.get(path);
        let markov = new MarkovMachine(resp.data)
    } catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}

function handleOutput(path, input){
    if (input === 'file') {
        cat(path)
    } else if (input === 'url') {
        webCat(path)
    }
    
}

let path = process.argv[3];
let input = process.argv[2];
handleOutput(path, input)

