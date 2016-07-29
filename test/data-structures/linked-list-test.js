import test from 'tape';
import { LinkedList } from '../../src/data-structures/data-structures';

const MODULE = 'LINKED_LIST';

test(`${MODULE} - constructor should create an empty list when no elements are passed in`, t => {
    let list = new LinkedList();
    t.equal(list.size, 0);
    t.equal(list.head, null);
    t.end();
});

test(`${MODULE} - constructor should create a list with all elements passed in the initial array`, t => {
    let elements = [ 1, 3, 5 ],
        list = new LinkedList(elements);
    t.equal(list.size, elements.length);
    t.equal(list.head.value, elements[0]);
    t.equal(list.head.next.value, elements[1]);
    t.equal(list.head.next.next.value, elements[2]);
    t.equal(list.head.next.next.next, undefined);
    t.end();
});

test(`${MODULE} - append should add a new node at the head of the list when it is empty`, t => {
    let list = new LinkedList();

    t.equal(list.size, 0);
    list.append(42);
    t.equal(list.size, 1);
    t.equal(list.head.value, 42);
    t.end();
});

test(`${MODULE} - append should not update the list of no element is passed in`, t => {
    let list = new LinkedList();

    t.equal(list.size, 0);
    list.append();
    t.equal(list.size, 0);
    t.equal(list.head, null);

    let list2 = new LinkedList([ 1, 2 ]);
    t.equal(list2.size, 2);
    list2.append();
    t.equal(list2.size, 2);
    t.equal(list2.head.next.next, undefined);
    t.end();
});

test(`${MODULE} - insert should not update the list if the index > size of the list`, t => {
    let list = new LinkedList([ 1, 2 ]);

    t.equal(list.size, 2);
    list.insert(3);
    t.equal(list.size, 2);
    t.end();
});

test(`${MODULE} - insert should not update the list if the index is negative`, t => {
    let list = new LinkedList([ 1, 2 ]);

    t.equal(list.size, 2);
    list.insert(-3);
    t.equal(list.size, 2);
    t.end();
});

test(`${MODULE} - insert should insert a new node at the head of an empty list for index 0`, t => {
    let list = new LinkedList();

    t.equal(list.size, 0);
    list.insert(0, 42);
    t.equal(list.size, 1);
    t.equal(list.head.value, 42);
    t.end();
});

test(`${MODULE} - insert should insert at the head of a full list for index 0`, t => {
    let list = new LinkedList([ 1, 2 ]);

    t.equal(list.size, 2);
    list.insert(0, 42);
    t.equal(list.size, 3);
    t.equal(list.head.value, 42);
    t.equal(list.head.next.value, 1);
    t.end();
});

test(`${MODULE} - insert should add in the middle of the list correctly`, t => {
    let list = new LinkedList([ 1, 2 ]);

    t.equal(list.size, 2);
    list.insert(1, 42);
    t.equal(list.size, 3);
    t.equal(list.head.value, 1);
    t.equal(list.head.next.value, 42);
    t.equal(list.head.next.next.value, 2);
    t.end();
});

test(`${MODULE} - insert should add to the end of the list correctly`, t => {
    let list = new LinkedList([ 1, 2 ]);

    t.equal(list.size, 2);
    list.insert(2, 42);
    t.equal(list.size, 3);
    t.equal(list.head.value, 1);
    t.equal(list.head.next.value, 2);
    t.equal(list.head.next.next.value, 42);
    t.end();
});

test(`${MODULE} - forEach should return each value in the list to the provided function`, t => {
    let elements = [ 1, 2 ],
        list = new LinkedList(elements);

    list.forEach((value, index) => {
        t.equal(value, elements[index]);
    });

    t.end();
});

test(`${MODULE} - forEach should return the correct index for each value to the provided function`, t => {
    let elements = [ 1, 2 ],
        list = new LinkedList(elements),
        expectedIndex = 0;

    list.forEach((value, index) => {
        t.equal(index, expectedIndex);
        expectedIndex++;
    });

    t.end();
});

test(`${MODULE} - removeAt should not change the list and return null if the index is outside of the list`, t => {
    let list = new LinkedList([ 1, 2 ]),
        value;

    t.equal(list.size, 2);
    value = list.removeAt(-1);
    t.equal(list.size, 2);
    t.equal(value, null);
    t.equal(list.head.value, 1);
    t.equal(list.head.next.value, 2);
    t.end();
});

test(`${MODULE} - removeAt should remove and return the first element of a list if index = 0`, t => {
    let list = new LinkedList([ 1, 2 ]),
        value;

    t.equal(list.size, 2);
    value = list.removeAt(0);
    t.equal(list.size, 1);
    t.equal(value, 1);
    t.equal(list.head.value, 2);
    t.end();
});

test(`${MODULE} - removeAt should remove and return the only element of a size 1 list if index = 0`, t => {
    let list = new LinkedList([ 1 ]),
        value;

    t.equal(list.size, 1);
    value = list.removeAt(0);
    t.equal(list.size, 0);
    t.equal(value, 1);
    t.equal(list.head, undefined);
    t.end();
});

test(`${MODULE} - removeAt should remove and return the value in the middle of the list`, t => {
    let list = new LinkedList([ 1, 42, 2 ]),
        value;

    t.equal(list.size, 3);
    value = list.removeAt(1);
    t.equal(list.size, 2);
    t.equal(value, 42);
    t.equal(list.head.value, 1);
    t.equal(list.head.next.value, 2);
    t.end();
});

test(`${MODULE} - removeAt should remove and return the element at the end of the list`, t => {
    let list = new LinkedList([ 1, 42, 2 ]),
        value;

    t.equal(list.size, 3);
    value = list.removeAt(list.size - 1);
    t.equal(list.size, 2);
    t.equal(value, 2);
    t.equal(list.head.value, 1);
    t.equal(list.head.next.value, 42);
    t.equal(list.head.next.next, undefined);
    t.end();
});

test(`${MODULE} - indexOf should return -1 for an empty list`, t => {
    let list = new LinkedList(),
        idx = list.indexOf(42);

    t.equal(idx, -1);
    t.end();
});

test(`${MODULE} - indexOf should return index of 0 for first item in list`, t => {
    let list = new LinkedList([ 42 ]),
        idx = list.indexOf(42);

    t.equal(idx, 0);
    t.end();
});

test(`${MODULE} - indexOf should return index for element in the middle of the list`, t => {
    let list = new LinkedList([ 1, 42, 12, -1, 200 ]),
        idx = list.indexOf(12);

    t.equal(idx, 2);
    t.end();
});


test(`${MODULE} - indexOf should return index for element in the end of the list`, t => {
    let list = new LinkedList([ 1, 42, 12, -1, 200 ]),
        idx = list.indexOf(200);

    t.equal(idx, list.size - 1);
    t.end();
});

test(`${MODULE} - indexOf should return -1 for a non-empty list when the element is not found`, t => {
    let list = new LinkedList([ 1, 42, 12, -1, 200 ]),
        idx = list.indexOf(420);

    t.equal(idx, -1);
    t.end();
});

test(`${MODULE} - isEmpty should return true for an empty list`, t => {
    let list = new LinkedList();

    t.true(list.isEmpty());
    t.end();
});

test(`${MODULE} - isEmpty should return false for a non-empty list`, t => {
    let list = new LinkedList([ 42 ]);

    t.false(list.isEmpty());
    t.end();
});
