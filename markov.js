/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.chain = {};
        this.makeChains();
        this.makeText();

    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {

        for (let i = 0; i < this.words.length; i++) {
            if (!this.chain[this.words[i]]) {
                this.words[i + 1] ? this.chain[this.words[i]] = [this.words[i + 1]] : this.chain[this.words[i]] = null
            }
            else if (this.chain[this.words[i]]) {
                this.chain[this.words[i]].push(this.words[i + 1]);
            }
        }
        console.log(this.chain);
        return this.chain;
    }

    /** return random text from chains */

    makeText(numWords = 100) {
        let text = [];
        let nextWord;
        let numKeys = Object.keys(this.chain).length;

        // for (let i = 1; i <= numWords; i++) {
        while (text.length < numWords) {
            if (text.length === 0) {
                // selects a random key to become the first word in text
                console.log('starting---')
                nextWord = Object.keys(this.chain)[Math.floor(Math.random() * numKeys)]
                text.push(nextWord)
            }
            else {
                //selects next word from possible choices created in makeChains()

                if (this.chain[nextWord] == null) {
                    nextWord = Object.keys(this.chain)[Math.floor(Math.random() * numKeys)]
                }
                else {
                    nextWord = this.chain[nextWord][Math.floor(Math.random() * this.chain[nextWord].length)]
                }
                text.push(nextWord)
            }
        }
        console.log(text.join(" "));
        console.log("---ending\n\n");
        return text.join(" ");
    }
}
let mm = new MarkovMachine("the cat in the hat");

module.exports = { MarkovMachine };