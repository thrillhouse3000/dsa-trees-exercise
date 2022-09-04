/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const q = [this.root];
    let depth = 0
    if(q[0] !== null) {
      while(q.length) {
        let curr = q.shift()
        depth += 1
        if (curr.left !== null) {
          q.push(curr.left)
        }  else {
          return depth
        }
        if (curr.right !== null) {
          q.push(curr.right)
        }  else {
          return depth
        }
      }
    }
    return depth
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const stack = [this.root];
    let depth = 0 
    let max = 0
    if(stack[0] !== null) {
      while(stack.length) {
        let curr = stack.pop()
        depth += 1
        if (curr.left !== null) stack.push(curr.left)
        if (curr.right !== null) stack.push(curr.right)
        if (curr.right === null && curr.left === null && depth > max) {
          max = depth
          depth = 0
        }
      }
    }
    return max
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    const maxSumHelper = (node) => {
      if (node === null) return 0
      let leftSum = maxSumHelper(node.left);
      let rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum)
      return Math.max(0, leftSum + node.val, rightSum + node.val)
    }

    maxSumHelper(this.root)
    return result
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    const q = [this.root];
    let min = null
    let closest = 0
    if(q[0] !== null) {
      while(q.length) {
        let curr = q.shift()
        if (curr.left) q.push(curr.left)
        if (curr.right) q.push(curr.right)
        if (curr.val > lowerBound) {
          closest = curr.val
          min = curr.val
        }
        if (curr.val > lowerBound && curr.val < closest) {
          min = curr.val
        }
      }
    }
    return min
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const q = [this.root];
    let node1Data = {parent: null, level: 0}
    let node2Data = {parent: null, level: 0}
    let depth = 0
    if(q[0] !== null) {
      while(q.length) {
        let curr = q.shift()
        depth += 1
        if (curr.left) q.push(curr.left)
        if (curr.right) q.push(curr.right)
        if (curr.left && curr.left === node1) {
          node1Data.parent = curr
          node1Data.level = depth + 1
        } 
        if (curr.right && curr.right === node1) {
          node1Data.parent = curr
          node1Data.level = depth + 1
        } 
        if (curr.left && curr.left === node2) {
          node2Data.parent = curr
          node2Data.level = depth
        } 
        if (curr.right && curr.right === node2) {
          node2Data.parent = curr
          node2Data.level = depth
        } 

      }
    }
    let result
    node1Data.parent !== node2Data.parent && node1Data.level === node2Data.level ? result = true : result = false
    return result
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const q = [tree.root];
    let serialized = []
    if(q[0] !== null) {
      while(q.length) {
        let curr = q.shift()
        serialized.push(curr.val)
        curr.left ? q.push(curr.left) : serialized.push('#')
        curr.right ? q.push(curr.right) : serialized.push('#')
      }
    }
    return serialized.join(' ')
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(serialized) {
    let treeArr = serialized.split(' ')
    
    let makeTree = () => {
      if (treeArr.length) {
        let curr = treeArr.shift();

        if (curr === '#') return null
        let currNode = new BinaryTreeNode(+curr)
        currNode.left = makeTree()
        currNode.right = makeTree()

        return currNode
      }
    }
    let root = makeTree();
    return new BinaryTree(root)
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
