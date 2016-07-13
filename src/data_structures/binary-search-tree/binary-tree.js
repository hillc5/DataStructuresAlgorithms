const ADD = 'add';
const REMOVE = 'remove';
const ROOT = 'root';

/**
 * Returns the parent reference and the direction that
 * needs to be changed to influence the given value, as
 * well as a boolean flag whether the child is currently null.
 *
 * If the change type is 'add', then the reference will
 * be to the parent of the null leaf where the value will be
 * placed.
 *
 * If the change type is 'remove' then the reference
 * will be to the parent of the value to be removed.
 * @param context
 * @param value
 * @param changeType
 * @returns {{parentRef: *, childDirection: *, isNull: boolean}}
 */
function getChangeRef(context, value, changeType) {
    let child = context.root,
        referenceNotFound = !isReference(child, changeType),
        childDirection,
        parent;

    while(referenceNotFound) {
        parent = child;
        childDirection = isGreaterThan(child.value, value, context.comparatorFn) ? child.LEFT : child.RIGHT;
        child = parent[childDirection];
        referenceNotFound = !isReference(child, changeType);
    }

    // return the parent reference to the value,
    // that we are searching for so that the tree
    // can be updated properly
    return {
        parentRef: parent,
        childDirection: childDirection,
        isNull: !child
    };

    function isReference(node, changeType) {
        let addTest = node === null,
            removeTest = node === null || node.value === value;

        return changeType === ADD ? addTest : removeTest
    }
}

function isGreaterThan(val1, val2, comparator) {
    return comparator ? comparator(val1, val2) > 0 : val1 > val2;
}

/**
 * Binary Search Tree constructor function.  Takes either a single value
 * to be stored at the root of the tree, or an array of values that will
 * be used to create an entire binary search tree.
 *
 * Also takes a comparatorFn that compares two values and returns -1 if
 * the first value is less than the second value, 1 if the first value
 * is greater than the second value, 0 if they are considered equal.
 *
 * @param initial
 * @param comparatorFn
 * @constructor
 */
function BSTree(initial, comparatorFn) {
    this.root = null;
    this.comparatorFn = comparatorFn;
    this.size = 0;

    if (initial) {
        let values = [].concat(initial);

        values.forEach(val => {
            this.addNode(val);
        });
    }
}

/**
 * Returns whether the given value is stored in the 
 * Binary Search Tree.
 * @param value
 * @returns {boolean}
 */
BSTree.prototype.contains = function(value) {
    let { isNull } = getChangeRef(this, value, REMOVE);
    return !isNull;
};

/**
 * Returns an array of all of the values stored in the Binary
 * Search Tree in order
 *
 * @returns {Array}
 */
BSTree.prototype.valuesInOrder = function() {
    return getValuesInOrder(this.root);
    
    function getValuesInOrder(node) {
        let result = [];
        if (node) {
            result = result.concat(getValuesInOrder(node.left));
            result.push(node.value);
            result = result.concat(getValuesInOrder(node.right));
        }
        return result;
    }
};

BSTree.prototype.valuesInReverseOrder = function() {
    return getReverseOrder(this.root);

    function getReverseOrder(node) {
        let result = [];
        if (node) {
            result = result.concat(getReverseOrder(node.right));
            result.push(node.value);
            result = result.concat(getReverseOrder(node.left));
        }
        return result;
    }
};

/**
 * Adds a node to the Binary Search Tree
 *
 * @param value
 */
BSTree.prototype.addNode = function(value) {
    let { parentRef, childDirection } = getChangeRef(this, value, ADD);

    if (!parentRef) {
        parentRef = this;
        childDirection = ROOT;
    }
    parentRef[childDirection] = new TreeNode(value);
    this.size++;
};

/**
 * Removes a node from the Binary Search Tree, maintaining
 * the ordering of the values stored.
 *
 * @param value
 * @returns {boolean}
 */
BSTree.prototype.removeNode = function(value) {
    let {
            parentRef,
            childDirection,
            isNull
        } = getChangeRef(this, value, REMOVE);

    if (!parentRef) { // Removing root node.
        parentRef = this;
        childDirection = ROOT;
    }

    if (isNull) {
        return false;
    } else {
        let child = parentRef[childDirection],
            isLeaf = child.isLeaf(),
            isFull = child.left !== null && child.right !== null;

        if (isLeaf) {
            parentRef[childDirection] = null;
        } else if (isFull) {
            let smNode = getAndRemoveSmallestFromSubtree(child.right, child);

            smNode.left = child.left;
            smNode.right = child.right;

            parentRef[childDirection] = smNode;
        } else {
            let nextChildDirection = child.left ? child.LEFT : child.RIGHT;
            parentRef[childDirection] = child[nextChildDirection];
        }
        this.size--;
        return child;
    }

    function getAndRemoveSmallestFromSubtree(startRef, parentRef) {
        let startValue = startRef.value,
            smDirection,
            result;

        while (startRef.left) {
            parentRef = startRef;
            startRef = startRef.left;
        }

        result = startRef;
        // in case startRef is smallest value, meaning it will be on it's parent's right
        smDirection = (startValue === startRef.value) ? startRef.RIGHT : startRef.LEFT;

        parentRef[smDirection] = null;

        return result;
    }
};

/**
 * Removes and returns the smallest node in the Tree,
 * null if the tree is empty
 *
 * @returns {TreeNode}
 */
BSTree.prototype.removeSmallestNode = function() {
    let value = this.getSmallestValue(),
        result = null;
    if (value) {
        result = this.removeNode(value);
        result.left = null;
        result.right = null;
    }
    return result;
};

/**
 * Returns the smallest value in the given tree, null if the
 * tree is empty
 *
 * @param treeNode
 * @returns {*}
 */
BSTree.prototype.getSmallestValue = function(treeNode = this.root) {
    if (treeNode) {
        if (treeNode.left === null) {
            return treeNode.value;
        }
        return this.getSmallestValue(treeNode.left);
    }
    return null;
};

BSTree.prototype.removeAll = function() {
    this.root = null;
    this.size = 0;
    this.comparatorFn = undefined;
};


/**
 * Constructor function for a simple TreeNode that stores
 * a value and references to left and right sub-trees.
 * @param val
 * @constructor
 */
function TreeNode(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

/**
 * Static value storing 'left' for Tree traversal purposes
 * @type {string}
 */
TreeNode.prototype.LEFT = 'left';

/**
 * Static value storing 'right' for Tree traversal purposes
 * @type {string}
 */
TreeNode.prototype.RIGHT = 'right';

/**
 * Returns whether the current node has any child nodes.
 * @returns {boolean}
 */
TreeNode.prototype.isLeaf = function() {
    return this.left === null && this.right === null;
};

export default BSTree;
