import test from 'tape';
import { bubbleSort } from '../../src/algorithms/algorithms'

const MODULE = 'BUBBLE_SORT';

test(`${MODULE} - should leave a sorted array sorted`, t => {
    let elements = [ 1, 2, 3, 4 ],
        bSort = bubbleSort(elements);

    t.deepEqual(bSort.run(), elements);
    t.end();
});


test(`${MODULE} - should sort an unsorted array`, t => {
    let elements = [ 42, 22, 1, -1, 300, 22 ],
        expected = [ -1, 1, 22, 22, 42, 300 ],
        bSort = bubbleSort(elements),
        sorted = bSort.run();

    t.deepEqual(sorted, expected);
    t.notEqual(elements, sorted);
    t.end();
});

test(`${MODULE} - should sort a reversed list`, t => {
    let elements = [ 200, 150, 100, 50, 0, -50, -100, -150, -200 ],
        expected = [ -200, -150, -100, -50, 0, 50, 100, 150, 200 ],
        bSort = bubbleSort(elements),
        sorted = bSort.run();

    t.deepEqual(sorted, expected);
    t.notEqual(elements, sorted);
    t.end();
});

test(`${MODULE} - should leave an empty array empty`, t => {
    let elements = [],
        bSort = bubbleSort(elements),
        sorted = bSort.run();

    t.deepEqual(sorted, elements);
    t.end();
});

test(`${MODULE} - should sort an array of length 1`, t => {
    let elements = [ 1 ],
        bSort = bubbleSort(elements),
        sorted = bSort.run();

    t.deepEqual(sorted, elements);
    t.end();
});

test(`${MODULE} - should utilized a comparator if supplied`, t => {
    let elements = [ 1, 2, 3, 4, 5, 6 ],
        comparator = (val1, val2) => val1 - val2 > 0 ? -1 : val1 - val2 < 0 ? 1 : 0,
        expected = [ 6, 5, 4, 3, 2, 1 ],
        bSort = bubbleSort(elements, comparator),
        sorted = bSort.run();

    t.deepEqual(sorted, expected);
    t.end();
});

test(`${MODULE} - should leave the initial array unchanged`, t => {
    let elements = [ 5, 4, 3, 2, 1],
        bSort = bubbleSort(elements),
        sorted = bSort.run();

    t.notDeepEqual(sorted, elements);
    t.deepEqual(sorted, [ 1, 2, 3, 4, 5 ]);
    t.deepEqual(elements, [ 5, 4, 3, 2, 1 ]);
    t.end();
});