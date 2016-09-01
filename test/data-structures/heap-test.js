import test from 'tape';
import { Heap } from '../../src/data-structures/data-structures';

const MODULE = 'MIN_HEAP';

test(`${MODULE} - constructor should create a heap out of an array`, t => {

    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 1, 2, 4,6, 7 ],
        heap = new Heap(elements);

    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - constructor should create an empty heap if no array is passed in`, t => {
    let heap = new Heap();

    t.deepEqual(heap.items, []);
    t.end();
});

test(`${MODULE} - insert should leave an element at the bottom of the heap if it is larger than it's parent`, t => {
    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 1, 2, 4, 6, 7],
        heap = new Heap(elements);

    t.deepEqual(heap.items, expected);
    heap.insert(10);
    expected.push(10);
    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - insert should bubble up an element until it's smaller than all of its children`, t => {

    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 1, 2, 4, 6, 7 ],
        heap = new Heap(elements);

    t.deepEqual(heap.items, expected);
    heap.insert(-1);
    expected = [-1, 2, 1, 6, 7, 4];
    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - extractMin should do nothing if the heap is empty`, t => {
    let heap = new Heap();
    t.notOk(heap.extractMin());
    t.end();
});

test(`${MODULE} - extractMin should remove the first element in a heap`, t => {
    let elements = [ 2, 7, 4, 1, 6 ],
        expected = [ 2, 6, 4, 7 ],
        heap = new Heap(elements),
        min;

    min = heap.extractMin();
    t.equal(min, 1);
    t.deepEqual(heap.items, expected);
    t.end();
});

test(`${MODULE} - heapify should do nothing on an empty array`, t => {
    t.deepEqual(Heap.heapify([]), []);
    t.end();
});

test(`${MODULE} - heapify should turn an array with elements into a Heap`, t => {
    let elements = [ 3, 22, -1, 42, -2, 33, 24 ],
        expected = [ -2, 3, -1, 42, 22, 33, 24 ];

    t.deepEqual(Heap.heapify(elements), expected);
    t.end();
});

test(`${MODULE} - peek should return the minimum value in the Heap`, t => {
    let elements = [ 2, 7, 4, 1, 6 ],
        expected = 1,
        heap = new Heap(elements);

    t.deepEqual(heap.peek(), expected);
    t.end();
});

test(`${MODULE} - peek should return undefined if the heap is empty`, t => {
    let heap = new Heap();

    t.equal(heap.peek(), undefined);
    t.end();
});

test(`${MODULE} - comparatorFn should work when specified (MaxHeap test)`, t => {
    const largestFirst = (val1, val2) => (val1 > val2) ? -1 : (val1 < val2) ? 1 : 0;

    let values = [ 1, 3, -1, 20, -6, 45 ],
        expected = [ 45, 20, 1, 3, -6, -1];

    let heap = new Heap(values, largestFirst);
    t.equal(heap.comparatorFn, largestFirst);
    t.deepEqual(heap.items, expected);
    t.end();
});
