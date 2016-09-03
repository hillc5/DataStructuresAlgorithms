import test from 'tape';
import { verifySorted } from '../../src/utils/array-utils';

const MODULE = 'ARRAY_UTILS';

test(`${MODULE} - verifySorted should return true for an empty array`, t => {
    let elements = [];

    t.equal(verifySorted(elements), true);
    t.end();
});

test(`${MODULE} - verifySorted should return true for undefined`, t => {
    t.equal(verifySorted(undefined), true);
    t.end();
});

test(`${MODULE} - verifySorted should return true for an array filled with same value`, t => {
    let elements = [ 42, 42, 42, 42, 42, 42, 42, 42, 42 ];
    t.equal(verifySorted(elements), true);
    t.end();
});

test(`${MODULE} - verifySorted should return true for a sorted array`, t => {
    let elements = [ 1, 3, 3, 42, 42, 45, 1e3, 1e4, Infinity ];

    t.equal(verifySorted(elements), true);
    t.end();
});

test(`${MODULE} - verifySorted should return false for an unsorted array`, t => {
    let elements = [ 1, 3, -1, -4, -4, 0 ];

    t.equal(verifySorted(elements), false);
    t.end();
});

test(`${MODULE} - verifySorted should return false for a mostly sorted array`, t => {
    let elements = [ 1, 3, 4, 42, 45, 1e3, 1e2 ];
    t.equal(verifySorted(elements), false);
    t.end();
});

test(`${MODULE} - verifySorted should return false for a reversed array`, t => {
    let elements = [ 1e3, 1e2, 42, 40, 3, 2, 1 ];
    t.equal(verifySorted(elements), false);
    t.end();
});

