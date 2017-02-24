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

//Decision trees when AI goes second
let AITree2 = {};
let cornerTree = new Tree("Corner");
let centerTree = new Tree("Center");
let edgeTree = new Tree("Edge");

AITree2.addChild()


export default decisionTree;
