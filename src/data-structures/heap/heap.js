import { swap } from '../../utils/array-utils';
import { lessThan as lt, greaterThan as gt } from '../../utils/compare-utils';

function parentIndex(child) {
    return Math.floor((child - 1) / 2);
}

function leftChildIndex(parent) {
    return 2 * parent + 1;
}

function rightChildIndex(parent) {
    return 2 * parent + 2;
}

function bubbleUp(elIdx, arr, comparatorFn) {
    let parentIdx = parentIndex(elIdx);

    // el < parent -> bubbleUp
    while(lt(arr[elIdx], arr[parentIdx], comparatorFn)) {
        swap(elIdx, parentIdx, arr);

        elIdx = parentIdx;
        parentIdx = parentIndex(elIdx);
    }
}

function bubbleDown(elIdx, arr, comparatorFn) {
    let leftChildIdx = leftChildIndex(elIdx),
        rightChildIdx = rightChildIndex(elIdx),
        el = arr[elIdx],
        leftChild = arr[leftChildIdx],
        rightChild = arr[rightChildIdx],
        swapIdx;

    // el > leftChild || el > rightChild -> bubble el down
    while(gt(el, leftChild, comparatorFn) || gt(el, rightChild, comparatorFn)) {
        if (gt(el, leftChild, comparatorFn) && gt(el, rightChild, comparatorFn)) {
            // if el > left && el > right -> swap with the smaller of the two
            swapIdx = lt(leftChild, rightChild, comparatorFn) ? leftChildIdx : rightChildIdx;
        } else if (gt(el, leftChild, comparatorFn)) {
            swapIdx = leftChildIdx;
        } else if (gt(el, rightChild, comparatorFn)) {
            swapIdx = rightChildIdx;
        }
        swap(elIdx, swapIdx, arr);

        // Now that we've swapped, continue the bubble down starting at
        // the index that we just swapped el to.
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
export default function Heap(arr = [], comparatorFn) {
    this.items = Heap.heapify(arr, comparatorFn);
    this.comparatorFn = comparatorFn;
}

/**
 * Pushes a new element onto the Heap while maintaining
 * the minimum heap property.
 *
 * @param element
 */
Heap.prototype.insert = function(element) {

    this.items.push(element);

    if (this.items.length > 1) {
        bubbleUp(this.items.length - 1, this.items, this.comparatorFn);
    }
};

/**
 * Removes and returns the minimum value in the
 * Heap
 * @returns {*}
 */
Heap.prototype.extractMin = function() {
    swap(0, this.items.length - 1, this.items);
    let result = this.items.pop();
    bubbleDown(0, this.items, this.comparatorFn);
    return result;
};

/**
 * Returns the value stored at the head of the Heap
 *
 * @returns {*}
 */
Heap.prototype.peek = function() {
    return this.items[0];
};

/**
 * Arranges the given array so that it satisfies the
 * Heap property.
 *
 * @param arr
 * @returns {*}
 */
Heap.heapify = function(arr, comparatorFn) {
    let startIdx = arr.length - 1;
    while(startIdx > 0) {
        bubbleUp(startIdx, arr, comparatorFn);
        startIdx -= 1;
    }
    return arr;
};