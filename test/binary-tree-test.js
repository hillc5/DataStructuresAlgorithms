import test from 'tape';
import BSTree from '../src/binary-search-tree/binary-tree';

const MODULE = 'BINARY_SEARCH_TREE';

test(`${MODULE} - constructor should create one tree node when initialized with one value`, t => {
    let a = new BSTree(2);
    t.equal(a.root.value, 2);
    t.equal(a.size, 1);
    t.end();
});

test(`${MODULE} - constructor should create an entire tree out of an array`, t => {
    let values = [ 1, 5, 20, 3, -1, 0, -2],
        tree;

    const expected = {
        size: 7,
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

test(`${MODULE} - constructor should throw an error declaring that the root value must be defined`, t => {
    t.throws(BSTree, /The root value must be defined/);
    t.end();
});

test(`${MODULE} - constructor should throw the error when no value is given`, t => {
    try {
        new BSTree();
    } catch(e) {
        t.ok(e);
        t.equal(e.message, 'The root value must be defined');
    }
    t.end();
});

test(`${MODULE} - addNode should update the size when called`, t => {
    let tree = new BSTree(2);
    t.equal(tree.size, 1);
    tree.addNode(3);
    t.equal(tree.size, 2);
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
        size: 2
    };
    let tree = new BSTree(2);
    tree.addNode(1);
    t.deepEqual(tree, expected);
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

    let tree = new BSTree([ 20, 5, 22, 21, 24, 23, 25 ]);
    t.deepEqual(tree, before);
    tree.removeNode(22);
    t.deepEqual(tree, after);
    t.end();
});

test(`${MODULE} - removeNode should return false and not update the size if value not found on remove`, t => {
    let tree = new BSTree([1, 3, 5]),
        valueRemoved;
    t.equal(tree.size, 3);
    valueRemoved = tree.removeNode(7);
    t.notOk(valueRemoved);
    t.equal(tree.size, 3);
    t.end();
});

test(`${MODULE} - contains should return true if the value is found`, t => {
    let tree = new BSTree([1, 3, 6, 7]),
        found = tree.contains(1);

    t.ok(found);
    t.end();
});

test(`${MODULE} - contains should return false if the value is not found`, t => {
    let tree = new BSTree([1, 3, 6, 7]),
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

