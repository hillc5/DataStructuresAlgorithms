import BSTree from '../binary-search-tree/binary-tree';


function PriorityQueue(values, comparatorFn) {
    this.tree = new BSTree(values, comparatorFn);
    
    Object.defineProperties(this, {
        size: {
            get: () => this.tree.size
        }
    });
}

PriorityQueue.prototype.add = function(value) {
    this.tree.addNode(value);    
};

PriorityQueue.prototype.poll = function() {
    return this.tree.removeSmallestNode().value;
};

PriorityQueue.prototype.peek = function() {
    return this.tree.getSmallestValue();
};

PriorityQueue.prototype.toArray = function() {
    return this.tree.valuesInOrder();
};

PriorityQueue.prototype.clear = function() {
    this.tree.removeAll();
};

export default PriorityQueue;