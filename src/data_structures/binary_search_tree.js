class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    let currNode = this._root;

    if (!currNode) {
      this._root = new BSTNode({key, value});
      this._count++;
      return;
    }

    const newNode = new BSTNode({key, value, currNode});

    while (currNode) {
      const foundKey = key === currNode.key;
      if (foundKey) {
        currNode.value = value;
        break;
      }

      const goLeft = key < currNode.key;
      if (goLeft) {
        if (currNode.left) {
          currNode = currNode.left;
        } else {
          currNode.left = newNode;
          this._count++;
          break;
        }
      } else {
        if (currNode.right) {
          currNode = currNode.right;
        } else {
          currNode.right = newNode;
          this._count++;
          break;
        }
      }
    }
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
    let currNode = this._root;

    if (!currNode) {
      return;
    }

    while (currNode) {
      const foundKey = key === currNode.key;
      if (foundKey) {
        currNode.value = value;
        break;
      }

      const goLeft = key < currNode.key;
      if (goLeft) {
        if (currNode.left) {
          currNode = currNode.left;
        } else {
          currNode.left = newNode;
          this._count++;
          break;
        }
      } else {
        if (currNode.right) {
          currNode = currNode.right;
        } else {
          currNode.right = newNode;
          this._count++;
          break;
        }
      }
    }
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;
