import test from 'tape';
import BSTree from '../src/binary-search-tree/binary-tree';

const MODULE = 'BINARY_SEARCH_TREE';

test(`${MODULE} - constructor should take an optional comparatorFn`, t => {
    let tree = new BSTree(2, (val1, val2) => { return val1 - val2; });
    t.ok(tree.comparatorFn);
    t.end();
});

test(`${MODULE} - constructor should create one tree node when initialized with one value`, t => {
    let tree = new BSTree(2);
    t.equal(tree.root.value, 2);
    t.equal(tree.size, 1);
    t.end();
});

test(`${MODULE} - constructor should create an entire tree out of an array`, t => {
    let values = [ 1, 5, 20, 3, -1, 0, -2 ],
        tree;

    const expected = {
        size: 7,
        comparatorFn: undefined,
        root: {
            value: 1,
            left: {
                value: -1,
                left: {
                    value: -2,
                    left: null,
                    right: null
                },
                right: {
                    value: 0,
                    left: null,
                    right: null
                }
            },
            right: {
                value: 5,
                left: {
                    value: 3,
                    left: null,
                    right: null
                },
                right: {
                    value: 20,
                    left: null,
                    right: null
                }
            }
        }
    };

    tree = new BSTree(values);
    t.deepEqual(tree, expected);
    t.end();
});

test(`${MODULE} - constructor should create an empty tree when no root value supplied`, t => {
    let tree = new BSTree();
    t.equal(tree.size, 0);
    t.equal(tree.root, null);
    t.end();
});

test(`${MODULE} - addNode should update the size when called`, t => {
    let tree = new BSTree(2);
    t.equal(tree.size, 1);
    tree.addNode(3);
    t.equal(tree.size, 2);
    t.end();
});

test(`${MODULE} - addNode should add a node to the root, if the tree is empty`, t => {
    let tree = new BSTree();
    t.equal(tree.size, 0);
    t.notOk(tree.root);
    tree.addNode(4);
    t.equal(tree.size, 1);
    t.ok(tree.root);
    t.equal(tree.root.value, 4);
    t.end();
});

test(`${MODULE} - addNode should add nodes to the right branch when greater than any node during add`, t => {
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
        comparatorFn: undefined,
        size: 2
    };
    let tree = new BSTree(2);
    tree.addNode(5);
    t.deepEqual(tree, expected);
    t.end();
});

test(`${MODULE} - addNode should add nodes to the left branch when less than any node during add`, t => {
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
        comparatorFn: undefined,
        size: 2
    };
    let tree = new BSTree(2);
    tree.addNode(1);
    t.deepEqual(tree, expected);
    t.end();
});

test(`${MODULE} - removeNode should return the removed node when successful`, t => {
    let tree = new BSTree([ 2, 3 ] ),
        expectedRemoved = { value: 3, left: null, right: null },
        removedNode;
    removedNode = tree.removeNode(3);
    t.deepEqual(removedNode, expectedRemoved);
    t.end();
});

test(`${MODULE} - removeNode should return false and not update the size if value not found on remove`, t => {
    let tree = new BSTree([ 1, 3, 5 ]),
        valueRemoved;
    t.equal(tree.size, 3);
    valueRemoved = tree.removeNode(7);
    t.notOk(valueRemoved);
    t.equal(tree.size, 3);
    t.end();
});

test(`${MODULE} - removeNode should decrease the size when successful`, t => {
    let tree = new BSTree(2);
    tree.addNode(3);
    t.equal(tree.size, 2);
    tree.removeNode(3);
    t.equal(tree.size, 1);
    t.end();
});

test(`${MODULE} - removeNode should handle removal of leaf node`, t => {
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
        comparatorFn: undefined,
        size: 2
    };
    let tree = new BSTree(2);
    tree.addNode(5);
    tree.addNode(7);
    t.equal(tree.size, 3);
    tree.removeNode(7);
    t.equal(tree.size, 2);
    t.deepEqual(tree, expected);
    t.end();
});

test(`${MODULE} - removeNode should handle the removal of a node with one child`, t => {
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
              comparatorFn: undefined,
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
              comparatorFn: undefined,
              size: 2
          };
    let tree = new BSTree(2);
    tree.addNode(5);
    tree.addNode(7);
    t.equal(tree.size, 3);
    t.deepEqual(tree, beforeRemove);
    tree.removeNode(5);
    t.deepEqual(tree, expected);
    t.end();
});

test(`${MODULE} - removeNode should handle the removal of a node with two non-leaf children`, t => {
    const before = {
            size: 7,
            comparatorFn: undefined,
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
            comparatorFn: undefined,
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

    let tree = new BSTree([ 20, 5, 22, 21, 24, 23, 25 ]);
    t.deepEqual(tree, before);
    tree.removeNode(22);
    t.deepEqual(tree, after);
    t.end();
});

test(`${MODULE} - removeNode should be able to remove the entire tree`, t => {
    let tree = new BSTree([ 1, 3, 5 ]);
    t.equal(tree.size, 3);
    tree.removeNode(1);
    tree.removeNode(3);
    tree.removeNode(5);
    t.equal(tree.size, 0);
    t.end();
});

test(`${MODULE} - removeSmallestNode should remove the smallest node in the tree`, t => {
    let tree = new BSTree([ 1, 3, 5 ]);
    tree.removeSmallestNode();
    t.equal(tree.size, 2);
    t.deepEqual(tree.valuesInOrder(), [ 3, 5 ]);
    t.end();
});

test(`${MODULE} - removeSmallestNode should return the smallest node in the tree`, t => {
    let tree = new BSTree([ 1, 3, 5 ]),
        expected = {
            value: 1,
            left: null,
            right: null
        };

    t.deepEqual(tree.removeSmallestNode(), expected);
    t.end();
});

test(`${MODULE} - removeSmallestNode should return the smallest node based on a comparator`, t => {
    let comparator = (val1, val2) => (val1 < val2) ? 1 : (val1 > val2) ? -1 : 0,
        tree = new BSTree([ 1, 3, 5, 7 ], comparator),
        expected = {
            value: 7,
            left: null,
            right: null
        };

    t.deepEqual(tree.removeSmallestNode(), expected);
    t.equal(tree.size, 3);
    t.end();
});

test(`${MODULE} - removeAll should reduce the tree to an empty tree`, t => {
    let tree = new BSTree([ 1, 3, 5, 7 ]);
    t.equal(tree.size, 4);
    tree.removeAll();
    t.equal(tree.size, 0);
    t.equal(tree.root, null);
    t.end();
});

test(`${MODULE} - contains should return true if the value is found`, t => {
    let tree = new BSTree([ 1, 3, 6, 7 ]),
        found = tree.contains(1);

    t.ok(found);
    t.end();
});

test(`${MODULE} - contains should return false if the value is not found`, t => {
    let tree = new BSTree([ 1, 3, 6, 7 ]),
        found = tree.contains(-1);

    t.notOk(found);
    t.end();
});

test(`${MODULE} - valuesInOrder should return values with an in order traversal`, t => {
    let tree = new BSTree([ 20, 5, 22, 21, 24, 23, 25 ]),
        values = tree.valuesInOrder();

    const expected = [ 5, 20, 21, 22, 23, 24, 25 ];
    t.deepEqual(values, expected);
    t.end();
});

test(`${MODULE} - getSmallestValue should return the smallest value without affecting the tree`, t => {
    let tree = new BSTree([ 1, 3, 5, 7, -1 ]);
    t.equal(tree.getSmallestValue(), -1);
    t.equal(tree.size, 5);
    t.end();
});

test(`${MODULE} - getSmallestValue should return null if the tree is empty`, t => {
    let tree = new BSTree();
    t.equal(tree.getSmallestValue(), null);
    t.end();
});

test(`${MODULE} - comparatorFn should work when specified`, t => {
    const largestFirst = (val1, val2) => (val1 > val2) ? -1 : (val1 < val2) ? 1 : 0;

    let tree = new BSTree([ 1, 3, -1, 20, -6, 45 ], largestFirst);
    t.equal(tree.comparatorFn, largestFirst);
    let values = tree.valuesInOrder();
    t.deepEqual(values, [ 45, 20, 3, 1, -1, -6]);
    t.end();
});

