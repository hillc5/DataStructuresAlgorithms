function BSTree(rootVal) {
    if(rootVal instanceof Array) {
        let values = [ ...rootVal ];
        this.root = new TreeNode(rootVal.shift());
        rootVal.forEach(val => {
            this.addNode(val);
        });
    } else {
        this.root = new TreeNode(rootVal);
    }
}

BSTree.prototype.getChangeRef = function(value) {
    let child = this.root,
        childDirection,
        parent;

    while(child && child.value !== value) {
        parent = child;
        childDirection = child.value > value ? child.LEFT : child.RIGHT;
        child = parent[childDirection];
    }

    return {
        parentRef: parent,
        childDirection: childDirection,
        isNull: !child
    }
}

BSTree.prototype.addNode = function(value) {
    let { parentRef, childDirection } = this.getChangeRef(value);
    parentRef[childDirection] = new TreeNode(value);
}

BSTree.prototype.removeNode = function(value) {
    let {
            parentRef,
            childDirection,
            isNull
        } = this.getChangeRef(value);

    if (isNull) {
        return false;
    } else {
        let isRoot = !parentRef,
            child = parentRef ? parentRef[childDirection] : this.root,
            isLeaf = child.isLeaf(),
            isFull = child.left !== null && child.right !== null;

        if (isLeaf) {
            // need to deparentRef to make the change
            if (isRoot) {
                this.root = null;
            } else {
                parentRef[childDirection] = null;
            }
        } else if (isFull) {
            let smNode = getAndRemoveSmallestNode(child.right, child);

            smNode.left = child.left;
            smNode.right = child.right;

            if (isRoot) {
                this.root = smNode;
            } else {
                parentRef[childDirection] = smNode;
            }
        } else {
            let nextChildDirection = child.left ? child.LEFT : child.RIGHT;
            if (isRoot) {
                this.root = child[nextChildDirection];
            } else {
                parentRef[childDirection] = child[nextChildDirection];
            }
        }
        return true;
    }

    // Returns a reference to the smallest node beginning with startRef,
    // while deleting the node from the tree.
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
}


function TreeNode(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

TreeNode.prototype.LEFT = 'left';
TreeNode.prototype.RIGHT = 'right';

TreeNode.prototype.setLeft = function(node) {
    this.left = node;
}

TreeNode.prototype.setRight = function(node) {
    this.right = node;
}

TreeNode.prototype.isLeaf = function() {
    return this.left === null && this.right === null;
}

let a = new BSTree([1, 20, 5, 4, 13, 22, 10, 21]);
a.removeNode(20);
a.removeNode(5);
a.removeNode(4);
a.removeNode(1);
