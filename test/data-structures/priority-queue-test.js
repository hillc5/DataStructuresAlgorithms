import test from 'tape';
import PriorityQueue from '../../src/data-structures/priority-queue/priority-queue';

const MODULE = 'PRIORITY_QUEUE';

test(`${MODULE} - constructor should create an empty priority Queue when no value is given`, t => {
    let pQueue = new PriorityQueue();
    t.equal(pQueue.size, 0);
    t.equal(pQueue.peek(), null);
    t.end();
});

test(`${MODULE} - constructor should create a queue with one element if a single value is provided`, t => {
    let value = 'Single Value',
        pQueue = new PriorityQueue(value);
    t.equal(pQueue.size, 1);
    t.equal(pQueue.peek(), value);
    t.end();
});

test(`${MODULE} - constructor should create a queue out of an array`, t => {
    let pQueue = new PriorityQueue([ 5, 10, -5, -10, 0 ]);
    t.equal(pQueue.size, 5);
    t.equal(pQueue.peek(), -10);
    t.end();
});

test(`${MODULE} - add should add a value in the correct order to the queue`, t => {
    let pQueue = new PriorityQueue([ 1, 3, 5 ]);
    pQueue.add(-1);
    t.deepEqual(pQueue.toArray(), [ -1, 1, 3, 5 ]);
    pQueue.add(2);
    t.deepEqual(pQueue.toArray(), [ -1, 1, 2, 3, 5 ]);
    t.end();
});

test(`${MODULE} - add should add a value in the correct order when a comparator is used`, t => {
    let comparator = (val1, val2) => { return val1.length - val2.length },
        pQueue = new PriorityQueue([ 'berry', 'arch' ], comparator);

    t.deepEqual(pQueue.toArray(), [ 'arch', 'berry' ]);
    pQueue.add('zoo');
    t.deepEqual(pQueue.toArray(), [ 'zoo', 'arch', 'berry' ]);
    t.end();
});

test(`${MODULE} - remove should return true when successful`, t => {
    let pQueue = new PriorityQueue([ 1, -1, 2, -42, 23 ]);

    t.equal(pQueue.size, 5);
    t.equal(pQueue.remove(-1), true);
    t.equal(pQueue.size, 4);
    t.end();
});

test(`${MODULE} - remove should return false when unsuccessful`, t => {
    let pQueue = new PriorityQueue([ 1, -1, 2, -42, 23 ]);

    t.equal(pQueue.size, 5);
    t.equal(pQueue.remove(-12), false);
    t.equal(pQueue.size, 5);
    t.end();
});

test(`${MODULE} - size should be accurate`, t => {
    let pQueue = new PriorityQueue(1);
    t.equal(pQueue.size, 1);
    pQueue.add(3);
    t.equal(pQueue.size, 2);
    t.end();
});

test(`${MODULE} - toArray should return an array of the values in order`, t => {
    let pQueue = new PriorityQueue([ 2, 6, 4, -1, 22, -3, 45, 0 ]);
    const expected = [ -3, -1, 0, 2, 4, 6, 22, 45 ];
    
    t.deepEqual(pQueue.toArray(), expected);
    t.end();
});

test(`${MODULE} - toArray should return an empty array when the queue is empty`, t => {
    let pQueue = new PriorityQueue();
    t.deepEqual(pQueue.toArray(), []);
    t.end();
});

test(`${MODULE} - poll should remove and return the smallest value in the queue`, t => {
    let pQueue = new PriorityQueue([ 2, 3, 5, -1, -20, 33 ]),
        expected = -20,
        value;

    t.equal(pQueue.size, 6);
    value = pQueue.poll();
    t.equal(value, expected);
    t.equal(pQueue.size, 5);
    t.end();
});

test(`${MODULE} - comparatorFn should work when specified`, t => {
    let comparator = (val1, val2) => {
            if (val1 > val2) {
                return -1;
            } else if (val1 < val2) {
                return 1;
            }
            return 0;
        },
        pQueue = new PriorityQueue([ 1, 2, 3, 4, 5 ], comparator),
        expected = [ 5 ,4, 3, 2, 1 ];

    t.deepEqual(pQueue.toArray(), expected);
    t.end();
});

test(`${MODULE} - peek should return the next value without removing it`, t => {
    let pQueue = new PriorityQueue([ 22, 42, 23, 1, -5 ]);
    t.equal(pQueue.peek(), -5);
    t.equal(pQueue.size, 5);
    t.end();
});

test(`${MODULE} - clear should remove all elements from the queue`, t => {
    let pQueue = new PriorityQueue([ 22, 42, 23, 1, -5 ]);
    t.deepEqual(pQueue.toArray(), [ -5, 1, 22, 23, 42 ]);
    pQueue.clear();
    t.deepEqual(pQueue.toArray(), []);
    t.end();
});