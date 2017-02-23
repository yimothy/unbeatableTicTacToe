class Tree {
  constructor(data) {
    const node = new Node(data);
    this._root = node;
    this._currNode = node;
    this._children = [];
  }
  addChild(data) {
    const node = new Tree(data);
    this._children.push(node);
  }
}

let AITree2 = new Tree();


export default decisionTree;
