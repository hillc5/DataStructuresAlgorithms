import test from 'tape';
import { bubbleSort } from '../../src/algorithms/algorithms'

const MODULE = 'BUBBLE_SORT';

test(`${MODULE} - should leave a sorted array sorted`, t => {
    let elements = [ 1, 2, 3, 4 ],
        sorted = bubbleSort(elements);

    t.deepEqual(sorted, elements);
    t.end();
});


test(`${MODULE} - should sort an unsorted array`, t => {
    let elements = [ 42, 22, 1, -1, 300, 22 ],
        expected = [ -1, 1, 22, 22, 42, 300 ],
        sorted = bubbleSort(elements);

    t.deepEqual(sorted, expected);
    t.notEqual(elements, sorted);
    t.end();
});

test(`${MODULE} - should leave an empty array empty`, t => {
    let elements = [],
        sorted = bubbleSort(elements);

    t.deepEqual(sorted, elements);
    t.end();
});

test(`${MODULE} - should utilized a comparator if supplied`, t => {
    let elements = [ 1, 2, 3, 4, 5, 6 ],
        comparator = (val1, val2) => val1 - val2 > 0 ? -1 : val1 - val2 < 0 ? 1 : 0,
        expected = [ 6, 5, 4, 3, 2, 1 ],
        sorted = bubbleSort(elements, comparator);

    t.deepEqual(sorted, expected);
    t.end();
});