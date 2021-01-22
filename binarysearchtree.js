
class binaryNode {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// Left -> <
// right -> >=
class binarySearchTree {
  constructor (value) {
    this.root = new binaryNode(value);
  }
  addNode (value) {
    const newNode = new binaryNode(value);
    // Handle an empty BST
    if (this.root === null) this.root = newNode;
    else this.addPercolate(newNode, this.root);
    return true;
  }
  contains (value) {
    return this.searchPercolate(value, this.root) ? true : false;
  }
  removeNode (value) {
    // changed toDelete from const to let due to lint
    let toDelete = this.searchPercolate(value, this.root);
    const result = toDelete.value;
    if (toDelete) {
      // Worst case: We have a defined left and right node for toDelete
      if (toDelete.left && toDelete.right) {
        // We should find the smallest node of the right subtree and replace toDelete with it
        // We should find the smallest node of the right subtree by starting with the subtree's root, and then stepping left as many times as possible.
        let nextSmallest = toDelete.right;
        while (nextSmallest.left) {
          nextSmallest = nextSmallest.left;
        }
        // Delete nextSmallest from the tree, then set toDelete = nextSmallest
        // We invoke removeNode for the edgecase nextSmallest had a .right
        toDelete = nextSmallest;
        this.removeNode(nextSmallest);
      }
      // Better cases: We can delete the desired node by pointing it to something else
      if (toDelete.left) toDelete = toDelete.left;
      if (toDelete.right) toDelete = toDelete.right;
      else toDelete = null;
    }
    return result;
  }
  addPercolate (node, parent) {
    const isLeft = node.value < parent.value;
    // Base case
    if (isLeft) {
      if (parent.left === null) parent.left = node;
      else this.addPercolate(node, parent.left);
    } else {
      if (parent.right === null) parent.right = node;
      else this.addPercolate(node, parent.right);
    }
    // Recursive Case
  }
  searchPercolate (value, current) {
    if (current === null) return null;
    if (current.value === value) return current;
    if (value < current.value) {
      return this.searchPercolate (value, current.left);
    } else {
      return this.searchPercolate (value, current.right);
    }
  }
}

// module.exports = // put in what we need to export