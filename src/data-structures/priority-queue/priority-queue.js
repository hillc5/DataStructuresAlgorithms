import { Heap } from '../data-structures';


function PriorityQueue(values, comparatorFn) {
    // Heap is destructive for speed purposes
    let items = values ? [].concat(values) : [];
    this.heap = new Heap(items, comparatorFn);
    this.comparatorFn = comparatorFn;
    
    Object.defineProperties(this, {
        size: {
            get: () => this.heap.size()
        }
    });
}

PriorityQueue.prototype.add = function(value) {
    this.heap.insert(value);
};

PriorityQueue.prototype.remove = function(value) {
    return !!this.heap.remove(value);
};

PriorityQueue.prototype.poll = function() {
    return this.heap.extractMin();
};

PriorityQueue.prototype.peek = function() {
    return this.heap.peek();
};

PriorityQueue.prototype.toArray = function() {
    // Need to copy heap items so as not to destroy that array
    return Heap.sort([...this.heap.items], this.comparatorFn);
};

PriorityQueue.prototype.clear = function() {
    this.heap.clearAll();
};

export default PriorityQueue;