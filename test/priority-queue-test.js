import test from 'tape';
import PriorityQueue from '../src/priority-queue/priority-queue';

const MODULE = 'PRIORITY_QUEUE';

test(`${MODULE} - size should be accurate`, t => {
    let pQueue = new PriorityQueue(1);
    t.equal(pQueue.size, 1);
    pQueue.push(3);
    t.equal(pQueue.size, 2);
    t.end();
});

test(`${MODULE} - toArray should return an array of the values in order`, t => {
    let pQueue = new PriorityQueue([ 2, 6, 4, -1, 22, -3, 45, 0 ]);
    const expected = [ -3, -1, 0, 2, 4, 6, 22, 45 ];
    
    t.deepEqual(pQueue.toArray(), expected);
    t.end();
});

test(`${MODULE} - pop should remove and return the smallest value in the queue`, t => {
    let pQueue = new PriorityQueue([ 2, 3, 5, -1, -20, 33 ]),
        expected = -20,
        value;

    t.equal(pQueue.size, 6);
    value = pQueue.pop();
    t.equal(value, expected);
    t.equal(pQueue.size, 5);
    t.end();
})