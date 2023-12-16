const {NotImplementedError} = require('../extensions/index.js');
const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode
  }

  add(data) {
    const newNode = new Node(data)
    this.rootNode
      ? this.insertNode(this.rootNode, newNode)
      : this.rootNode = newNode
  }

  insertNode(node, newNode) {
    const directionToInsert = this.getDirection(newNode.data, node.data)
    node[directionToInsert] === null
      ? node[directionToInsert] = newNode
      : this.insertNode(node[directionToInsert], newNode)
  }

  has(data) {
    return !!this.findNode(this.rootNode, data)
  }

  find(data) {
    return this.findNode(this.rootNode, data)
  }

  findNode(node, data) {
    if (node === null || data === node.data) return node

    const directionToFind = this.getDirection(data, node.data)
    return this.findNode(node[directionToFind], data)
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data)
  }

  removeNode(node, data) {
    if (node === null) return null

    if (data !== node.data) {
      const direction = this.getDirection(data, node.data)
      node[direction] = this.removeNode(node[direction], data)
      return node
    }

    if (node.left === null) return node.right
    if (node.right === null) return node.left

    const minRightNode = this.findMinNode(node.right)
    node.data = minRightNode.data
    node.right = this.removeNode(node.right, minRightNode.data)

    return node
  }

  findMinNode(node) {
    return node.left === null
      ? node
      : this.findMinNode(node.left)
  }

  min() {
    return this.findMinNode(this.rootNode).data
  }

  max(node = this.rootNode) {
    return node.right === null
      ? node.data
      : this.max(node.right)
  }

  getDirection(newNodeData, existingNodeData) {
    return newNodeData > existingNodeData
      ? 'right'
      : 'left'
  }
}

module.exports = {
  BinarySearchTree
};
