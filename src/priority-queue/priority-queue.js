import BSTree from '../binary-search-tree/binary-tree';


function PriorityQueue(values, comparatorFn) {
    this.tree = new BSTree(values, comparatorFn);
    
    Object.defineProperties(this, {
        size: {
            get: () => this.tree.size
        }
    });
}

PriorityQueue.prototype.push = function(value) {
    this.tree.addNode(value);    
};

PriorityQueue.prototype.pop = function() {
    return this.tree.removeSmallestNode().value;
};

PriorityQueue.prototype.toArray = function() {
    return this.tree.valuesInOrder();
};

export default PriorityQueue;