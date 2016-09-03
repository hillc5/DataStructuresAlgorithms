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
    let endIdx = arr.length - 1;
    while(leftChildIndex(elIdx) <= endIdx) {
        let leftChildIdx = leftChildIndex(elIdx),
            rightChildIdx = rightChildIndex(elIdx),
            swapIdx = elIdx;

        if (gt(arr[swapIdx], arr[leftChildIdx], comparatorFn)) {
            swapIdx = leftChildIdx;
        }

        if (rightChildIdx <= endIdx && gt(arr[swapIdx], arr[rightChildIdx], comparatorFn)) {
            swapIdx = rightChildIdx;
        }

        if (swapIdx === elIdx) {
            break;
        } else {
            swap(elIdx, swapIdx, arr);
            elIdx = swapIdx;
        }
    }
}

/**
 * Creates a new Heap with the given array of elements
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
 * the minimum heap property determined by the comparatorFn.
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
 * Removes and returns the minimum/maximum value in the
 * Heap as determined by the comparatorFn
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
 * Heap property determined by the comparatorFn.
 *
 * @param arr
 * @returns {*}
 */
Heap.heapify = function(arr, comparatorFn) {
    let startIdx = parentIndex(arr.length - 1);
    while(startIdx >= 0) {
        bubbleDown(startIdx, arr, comparatorFn);
        startIdx -= 1;
    }
    return arr;
};