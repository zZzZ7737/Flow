function findSingleNode(flowData, curNode) {
  let node = flowData;
  while (node.next) {
    if (node.next.markingId === curNode.markingId) {
      return node;
    }
  }
}

function findBranchNode(flowData, curNode) {
  for (let i = 0; i <= flowData.length; i++) {
    findSingleNode(flowData[i], curNode);
  }
}
export default function findCurNodeSetNodeInfo(flowData, curNode) {
  let node = flowData;
  let i = 0;
  while (node.next && i < 50) {
    if (node.next.type === 'branch') {
      findBranchNode(node.next.branch, curNode);
    } else {
      findSingleNode(node, curNode);
    }
    i++;
  }

  return node;
}
