import test from 'tape';
import { selectionSort } from '../../src/algorithms/algorithms';

const MODULE = 'SELECTION_SORT';

test(`${MODULE} - should leave a sorted array sorted`, t => {
    let elements = [ 1, 2, 3, 4 ],
        sorted = selectionSort(elements);

    t.deepEqual(sorted, elements);
    t.end();
});


test(`${MODULE} - should sort an unsorted array`, t => {
    let elements = [ 42, 22, 1, -1, 300, 22 ],
        expected = [ -1, 1, 22, 22, 42, 300 ],
        sorted = selectionSort(elements);

    t.deepEqual(sorted, expected);
    t.notEqual(elements, sorted);
    t.end();
});

test(`${MODULE} - should leave an empty array empty`, t => {
    let elements = [],
        sorted = selectionSort(elements);

    t.deepEqual(sorted, elements);
    t.end();
});

test(`${MODULE} - should sort an array of length 1`, t => {
    let elements = [ 1 ],
        sorted = selectionSort(elements);

    t.deepEqual(sorted, elements);
    t.end();
});

test(`${MODULE} - should utilized a comparator if supplied`, t => {
    let elements = [ 1, 2, 3, 4, 5, 6 ],
        comparator = (val1, val2) => val1 - val2 > 0 ? -1 : val1 - val2 < 0 ? 1 : 0,
        expected = [ 6, 5, 4, 3, 2, 1 ],
        sorted = selectionSort(elements, comparator);

    t.deepEqual(sorted, expected);
    t.end();
});

test(`${MODULE} - should leave the initial array unchanged`, t => {
    let elements = [ 5, 4, 3, 2, 1],
        sorted = selectionSort(elements);

    t.notDeepEqual(sorted, elements);
    t.deepEqual(sorted, [ 1, 2, 3, 4, 5 ]);
    t.deepEqual(elements, [ 5, 4, 3, 2, 1 ]);
    t.end();
});