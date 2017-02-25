class Tree {
  constructor(data) {
    this.move = data;
    this.root = node;
    this.currNode = node;
    this.children = [];
  }
  addChild(data) {
    const node = new Tree(data);
    this.children.push(node);
  }
}

// Decision trees when AI goes second
const AITree2 = new Tree('Center');

AITree2.addChild('Corner');
AITree2.addChild('Edge');


export default decisionTree;
