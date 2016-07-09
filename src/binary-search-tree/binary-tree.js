const ADD = 'add';
const REMOVE = 'remove';

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
            removeTest = !!(child !== null && child.value === value);

        return changeType === ADD ? addTest : removeTest
    }
};

export default function BSTree(rootVal) {
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

BSTree.prototype.addNode = function(value) {
    let { parentRef, childDirection } = getChangeRef(this.root, value, ADD);
    parentRef[childDirection] = new TreeNode(value);
    this.size++;
};

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
};


function TreeNode(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

TreeNode.prototype.LEFT = 'left';
TreeNode.prototype.RIGHT = 'right';
TreeNode.prototype.isLeaf = function() {
    return this.left === null && this.right === null;
};
