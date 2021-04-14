/* eslint-disable prefer-destructuring */
export default function insertNode(curNode, flowData, createNodeType) {
  const source = Object.assign({}, {}, curNode);
  let obj;
  if (createNodeType === 'single') {
    obj = singleNode();
  } else if (createNodeType === 'branch') {
    obj = branchNode();
  }

  const temp = source.next;
  source.next = obj;
  obj.next = temp;
  const start = JSON.parse(JSON.stringify(flowData));
  let sTemp = start;
  while (sTemp.next) {
    if (source.name === '开始') {
      sTemp.next = source;
      break;
    }
    if (sTemp.next.nodeInfo.itemId === source.nodeInfo.itemId) {
      sTemp.next = source;
      break;
    }
    sTemp = sTemp.next;
  }
  return start;
}
