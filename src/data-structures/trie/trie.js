function Node(value) {
    this.value = value;
    this.children = {};
}

Node.prototype.addChild = function(key, value) {
    this.children[key] = value;
};

Node.prototype.getChild = function(key) {
    return this.children[key];
};

Node.prototype.isWord = function() {
    return !!this.value;
};

function Trie(word) {
    this.root = new Node('', false);
    this.add(word);
}

Trie.prototype.add = function(word='') {
    let node = this.root,
        count = 0;

    while(count < word.length) {
        let key = word[count],
            child = node.getChild(key);

        if (child) {
            node = child;
        } else {
            let isWord = (count + 1 === word.length),
                value = isWord ? word : '',
                tempNode = new Node(value);

            node.addChild(key, tempNode);
            node = tempNode;
        }
        count++;
    }
};

export default Trie;