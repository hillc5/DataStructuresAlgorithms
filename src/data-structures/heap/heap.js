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
    while(parentIdx >= 0 && lt(arr[elIdx], arr[parentIdx], comparatorFn)) {
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
 * Creates a new Heap with the given array of elements.  The
 * given array of elements are 'heapified' in place which does not
 * preserve the original list of elements
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
 * Removes and returns the given element in this heap, or undefined if
 * the element is not found.  Heap order is restored after the
 * removal
 *
 * @param element
 * @returns {*}
 */
Heap.prototype.remove = function(element) {
    let removeIdx = this.items.indexOf(element),
        result;

    if (removeIdx > -1) {
        swap(removeIdx, this.items.length - 1, this.items);
        result = this.items.pop();
        bubbleDown(removeIdx, this.items, this.comparatorFn);
    }
    return result;
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
 * Returns the size of this heap
 * @returns {*}
 */
Heap.prototype.size = function() {
    return this.items.length;
};

/**
 * Removes all items from this heap
 */
Heap.prototype.clearAll = function() {
    this.items = [];
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

/**
 * Sorts and returns the given array using the given comparatorFn if
 * defined.  This operation does not make a copy of the given array
 * and can be considered as destructive.
 *
 * @param arr
 * @param comparatorFn
 * @returns {Array}
 */
Heap.sort = function(arr, comparatorFn) {
    let heap = new Heap(arr, comparatorFn),
        result = [];

    while(heap.items.length > 0) {
        result.push(heap.extractMin());
    }

    return result;
};