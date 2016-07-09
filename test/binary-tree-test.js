import test from 'tape';
import BSTree from '../src/binary-search-tree/binary-tree';

const MODULE = 'BINARY SEARCH TREE';

test(`${MODULE} should initialize with the initial value at root`, t => {
    let a = new BSTree(2);
    t.equal(a.root.value, 2);
    t.equal(a.size, 1);
    t.end();
});

test(`${MODULE} should support the add operation`, t => {
    let a = new BSTree(2);
    t.equal(a.size, 1);
    a.addNode(3);
    t.equal(a.size, 2);
    t.end();
});

test(`${MODULE} should add nodes to the right branch when greater than any node during add`, t => {
    const expected = {
        root: {
            value: 2,
            right: {
                value: 5,
                right: null,
                left: null
            },
            left: null
        },
        size: 2
    };
    let a = new BSTree(2);
    a.addNode(5);
    t.deepEqual(a, expected);
    t.end();
});

test(`${MODULE} should add nodes to the left branch when less than any node during add`, t => {
    const expected = {
        root: {
            value: 2,
            right: null,
            left: {
                right: null,
                left: null,
                value: 1
            }
        },
        size: 2
    };
    let a = new BSTree(2);
    a.addNode(1);
    t.deepEqual(a, expected);
    t.end();
});

test(`${MODULE} should support the remove operation`, t => {
    let a = new BSTree(2);
    a.addNode(3);
    t.equal(a.size, 2);
    a.removeNode(3);
    t.equal(a.size, 1);
    t.end();
});

test(`${MODULE} should handle remove of leaf node`, t => {
    const expected = {
        root: {
            value: 2,
            left: null,
            right: {
                left: null,
                right: null,
                value: 5
            }
        },
        size: 2
    };
    let a = new BSTree(2);
    a.addNode(5);
    a.addNode(7);
    t.equal(a.size, 3);
    a.removeNode(7);
    t.equal(a.size, 2);
    t.deepEqual(a, expected);
    t.end();
});

test(`${MODULE} should handle the remove of a node with one child`, t => {
    const beforeRemove = {
              root: {
                  value: 2,
                  left: null,
                  right: {
                      value: 5,
                      left: null,
                      right: {
                          value: 7,
                          left: null,
                          right: null
                      }
                  }
              },
              size: 3
          },
          expected = {
              root: {
                  value: 2,
                  left: null,
                  right: {
                      left: null,
                      right: null,
                      value: 7
                  }
              },
              size: 2
          };
    let a = new BSTree(2);
    a.addNode(5);
    a.addNode(7);
    t.equal(a.size, 3);
    t.deepEqual(a, beforeRemove);
    a.removeNode(5);
    t.deepEqual(a, expected);
    t.end();
});

test(`${MODULE} should handle the removal of a node with two non-leaf children`, t => {
    const before = {
            size: 7,
            root: {
                value: 20,
                left: {
                    value: 5,
                    left: null,
                    right: null
                },
                right: {
                    value: 22,
                    left: {
                        value: 21,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 24,
                        left: {
                            value: 23,
                            left: null,
                            right: null
                        },
                        right: {
                            value: 25,
                            left: null,
                            right: null
                        }
                    }
                }
            }
        },
        after = {
            size: 6,
            root: {
                value: 20,
                left: {
                    value: 5,
                    left: null,
                    right: null
                },
                right: {
                    value: 23,
                    left: {
                        value: 21,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 24,
                        left: null,
                        right: {
                            value: 25,
                            left: null,
                            right: null
                        }
                    }
                }
            }
        };

    let a = new BSTree([ 20, 5, 22, 21, 24, 23, 25 ]);
    t.deepEqual(a, before);
    a.removeNode(22);
    t.deepEqual(a, after);
    t.end();
});

