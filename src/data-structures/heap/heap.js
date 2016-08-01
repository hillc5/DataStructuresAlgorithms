import { swap } from '../../utils/array-utils';

function parentIndex(child) {
    return Math.floor((child - 1) / 2);
}

function leftChildIndex(parent) {
    return 2 * parent + 1;
}

function rightChildIndex(parent) {
    return 2 * parent + 2;
}

function bubbleUp(elIdx, arr) {
    let parentIdx = parentIndex(elIdx);

    while(arr[elIdx] < arr[parentIdx]) {
        swap(elIdx, parentIdx, arr);

        elIdx = parentIdx;
        parentIdx = parentIndex(elIdx);
    }
}

function bubbleDown(elIdx, arr) {
    let leftChildIdx = leftChildIndex(elIdx),
        rightChildIdx = rightChildIndex(elIdx),
        el = arr[elIdx],
        leftChild = arr[leftChildIdx],
        rightChild = arr[rightChildIdx],
        swapIdx;

    while(el > leftChild || el > rightChild) {
        if (el > leftChild && el > rightChild) {
            swapIdx = leftChild < rightChild ? leftChildIdx : rightChildIdx;
        } else if (el > leftChild) {
            swapIdx = leftChildIdx;
        } else if (el > rightChild) {
            swapIdx = rightChildIdx;
        }
        swap(elIdx, swapIdx, arr);
        elIdx = swapIdx;
        leftChildIdx = leftChildIndex(elIdx);
        rightChildIdx = rightChildIndex(elIdx);
        el = arr[elIdx];
        leftChild = arr[leftChildIdx];
        rightChild = arr[rightChildIdx];
    }
}

/**
 * Creates a new MinHea with the given array of elements
 *
 * @param arr
 * @constructor
 */
export default function MinHeap(arr = []) {
    this.items = this.heapify(arr);
}

/**
 * Pushes a new element onto the MinHeap while maintaining
 * the minimum heap property.
 *
 * @param element
 */
MinHeap.prototype.insert = function(element) {

    this.items.push(element);

    if (this.items.length > 1) {
        bubbleUp(this.items.length - 1, this.items);
    }
};

/**
 * Removes and returns the minimum value in the
 * MinHeap
 * @returns {*}
 */
MinHeap.prototype.extractMin = function() {
    swap(0, this.items.length - 1, this.items);
    let result = this.items.pop();
    bubbleDown(0, this.items);
    return result;
};

/**
 * Returns the value stored at the head of the MinHeap
 *
 * @returns {*}
 */
MinHeap.prototype.peek = function() {
    return this.items[0];
};

/**
 * Arranges the given array so that it satisfies the
 * MinHeap property.
 *
 * @param arr
 * @returns {*}
 */
MinHeap.prototype.heapify = function(arr) {
    let startIdx = arr.length - 1;
    while(startIdx > 0) {
        bubbleUp(startIdx, arr);
        startIdx -= 1;
    }
    return arr;
};