const ADD = 'add';
const REMOVE = 'remove';

// Returns the parent reference and the direction that
// needs to be changed to influence the given value, as
// well as a boolean flag whether the child is currently null.
//
// If the change type is 'add', then the reference will
// be to the parent of the null leaf where the value will be
// placed.
//
// If the change type is 'remove' then the reference
// will be to the parent of the value to be removed.
//
function getChangeRef(root, value, changeType) {
    let child = root,
        referenceNotFound = !isReference(child, changeType),
        childDirection,
        parent;

    while(referenceNotFound) {
        parent = child;
        childDirection = child.value > value ? child.LEFT : child.RIGHT;
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

    function isReference(child, changeType) {
        let addTest = !!(child === null),
            removeTest = !!(child === null || child.value === value);

        return changeType === ADD ? addTest : removeTest
    }
}


//  Returns a reference to the smallest node within the
//  startRef tree, while also deleting the node from the tree.
function getAndRemoveSmallestNode(startRef, parentRef) {
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

/**
 * Binary Search Tree constructor function.  Takes either a single value
 * to be stored at the root of the tree, or an array of values that will
 * be used to create an entire binary search tree.
 *
 * @param rootVal
 * @constructor
 */
function BSTree(rootVal) {
    if (!rootVal) {
        throw new Error('The root value must be defined');
    }

    this.size = 1;

    if(rootVal instanceof Array) {
        let values = [ ...rootVal ];
        this.root = new TreeNode(values.shift());
        values.forEach(val => {
            this.addNode(val);
        });
    } else {
        this.root = new TreeNode(rootVal);
    }
}

/**
 * Returns whether the given value is stored in the 
 * Binary Search Tree.
 * @param value
 * @returns {boolean}
 */
BSTree.prototype.contains = function(value) {
    let { isNull } = getChangeRef(this.root, value, REMOVE);
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

/**
 * Adds a node to the Binary Search Tree
 *
 * @param value
 */
BSTree.prototype.addNode = function(value) {
    let { parentRef, childDirection } = getChangeRef(this.root, value, ADD);
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
        } = getChangeRef(this.root, value, REMOVE);

    if (!parentRef) { // Removing root node.
        parentRef = this;
        childDirection = 'root';
    }

    if (isNull) {
        return false;
    } else {
        let child = parentRef[childDirection],
            isLeaf = child.isLeaf(),
            isFull = child.left !== null && child.right !== null;

        if (isLeaf) {
            // need to dereference to make the change
            parentRef[childDirection] = null;
        } else if (isFull) {
            let smNode = getAndRemoveSmallestNode(child.right, child);

            smNode.left = child.left;
            smNode.right = child.right;

            parentRef[childDirection] = smNode;
        } else {
            let nextChildDirection = child.left ? child.LEFT : child.RIGHT;
            parentRef[childDirection] = child[nextChildDirection];
        }
        this.size --;
        return true;
    }
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
