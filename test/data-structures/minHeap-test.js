import test from 'tape';
import { MinHeap } from '../../src/data-structures/data-structures';

const MODULE = 'MIN_HEAP';

test(`${MODULE} - constructor should create a heap out of an array`, t => {

    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 1, 2, 4,6, 7 ],
        heap = new MinHeap(elements);

    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - constructor should create an empty heap if no array is passed in`, t => {
    let heap = new MinHeap();

    t.deepEqual(heap.items, []);
    t.end();
});

test(`${MODULE} - insert should leave an element at the bottom of the heap if it is larger than it's parent`, t => {
    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 1, 2, 4, 6, 7],
        heap = new MinHeap(elements);

    t.deepEqual(heap.items, expected);
    heap.insert(10);
    expected.push(10);
    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - insert should bubble up an element until it's smaller than all of its children`, t => {

    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 1, 2, 4, 6, 7 ],
        heap = new MinHeap(elements);

    t.deepEqual(heap.items, expected);
    heap.insert(-1);
    expected = [-1, 2, 1, 6, 7, 4];
    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - extractMin should do nothing if the heap is empty`, t => {
    let heap = new MinHeap();
    t.notOk(heap.extractMin());
    t.end();
});

test(`${MODULE} - extractMin should remove the first element in a heap`, t => {
    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 2, 6, 4, 7 ],
        heap = new MinHeap(elements),
        min;

    min = heap.extractMin();
    t.equal(min, 1);
    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - heapify should do nothing on an empty array`, t => {
    let heap = new MinHeap();
    t.deepEqual(heap.heapify([]), []);
    t.end();
});

test(`${MODULE} - heapify should turn an array with elements into a MinHeap`, t => {
    let elements = [ 3, 22, -1, 42, -2, 33, 24 ],
        expected = [ -2, 3, -1, 42, 22, 33, 24 ],
        heap = new MinHeap();

    t.deepEqual(heap.heapify(elements), expected);
    t.end();
});

test(`${MODULE} - peek should return the minimum value in the MinHeap`, t => {
    let elements = [ 2, 7, 4, 1, 6 ],
        expected = 1,
        heap = new MinHeap(elements);

    t.deepEqual(heap.peek(), expected);
    t.end();
});

test(`${MODULE} - peek should return undefined if the heap is empty`, t => {
    let heap = new MinHeap();

    t.equal(heap.peek(), undefined);
    t.end();
});
