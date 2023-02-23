class TrieNode {
    #numChildren = 0;

    constructor(char) {
        this.char = char;
        this.children = new Array(26).fill(null);
        this.isEndWord = false;
    }

    #getIndex(char) {
        return char.charCodeAt() - 'a'.charCodeAt();
    }

    isEmpty() {
        return this.#numChildren === 0;
    }

    addChild(char) {
        if (!this.getChildAt(char)) {
            this.children[this.#getIndex(char)] = new TrieNode(char);
            this.#numChildren++;
        }
    }

    removeChild(char) {
        if (this.getChildAt(char)) {
            this.children[this.#getIndex(char)] = null;
            this.#numChildren--;
        }
    }

    getChildAt(char) {
        return this.children[this.#getIndex(char)];
    }

    markAsEndWord() {
        this.isEndWord = true;
    }

    unmarkAsEndWord() {
        this.isEndWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode('');
    }

    add(word) {
        // Start at the root node
        let curr = this.root;

        // For Each character in the given word
        // 1. See if a node for that character exists at the current node
        // 2. If yes, check that node for the next character
        // 3. If no, add a new TrieNode for that character
        for (let i = 0; i < word.length; i++) {
            const char = word[i].toLowerCase();
            const child = curr.getChildAt(char);
            if (child) {
                curr = child;
            } else {
                curr.addChild(char);
                curr = curr.getChildAt(char);
            }
        }

        curr.markAsEndWord();
    }

    #deleteWord(word, node, currLevel) {
        let deletedNode = false;

        // Found last character node in Trie
        if (currLevel === word.length) {

            // If leaf node, nullify node
            // and mark deleted as true
            if (node.isEmpty()) {
                node = null;
                deletedNode = true;
            } else {
                node.unmarkAsEndWord();
                deletedNode = false;
            }
        } else {
            const char = word[currLevel];
            const childNode = node.getChildAt(char);
            const deletedChild = this.#deleteWord(word, childNode, currLevel + 1);

            // IF Child node deleted, check:
            // If current node is an endWord
            //   If yes, do not delete
            //   If no, BUT has other children, do not delete
            //   If no, AND no other children, delete
            if (deletedChild) {
                node.removeChild(char)
                if (node.isEndWord) {
                    deletedNode = false;
                } else if (!node.isEmpty()) {
                    deletedNode = false;
                } else {
                    node = null;
                    deletedNode = true;
                }
            } else {
                deletedNode = false;
            }
        }

        return deletedNode;
    }

    delete(word) {
        if (!this.root || !word) {
            return;
        }

        this.#deleteWord(word, this.root, 0);
    }

    search(word) {
        let curr = this.root;
        for (let i = 0; i < word.length; i++) {
            const child = curr.getChildAt(word[i]);
            if (!child) {
                return false;
            }

            curr = child;
        }

        return curr.isEndWord;
    }
}

export default Trie;