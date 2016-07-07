function BSTree(rootVal) {
  if (!rootVal) {
    this.root = new TreeNode();
  } else if(rootVal instanceof Array) {
    rootVal.forEach(val => {
      this.addNode(val);
    });
  } else {
    this.root = new TreeNode(rootVal);
  }
}

BSTree.prototype.addNode = function(value) {
  this.root = addTreeNode(this.root, value);

  function addTreeNode(node, value) {
    if (!node) {
      node = new TreeNode(value);
    } else {
      if (value <= node.value) {
        node.left = addTreeNode(node.left, value);
      } else {
        node.right = addTreeNode(node.right, value);
      }
    }
    return node;
  }
}

BSTree.prototype.removeNode = function(value) {
  this.root = removeTreeNode(this.root, value);

  function removeTreeNode(node, value) {
    if (node) {
      if (node.value === value) {
        if (node.isLeaf()) {
          node = null;
        } else if(node.left !== null && node.right !== null) {
          let smallestNode = getSmallestNode(node.right);
          smallestNode.left = node.left;
          smallestNode.right = node.right;
          node = smallestNode;
          smallestNode = null;
        } else if (node.left !== null) {
          node = node.left;
        } else {
          node = node.right;
        }
      } else if (node.value < value) {
        node.right = removeTreeNode(node.right, value);
      } else {
        node.left = removeTreeNode(node.left, value);
      }
      return node;
    }
  }

  function getSmallestNode(node) {
    if (node.left === null) {
      var result = node;
      node = null;
      return result;
    } else {
      return getSmallestNode(node.left);
    }
  }
}


function TreeNode(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

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
