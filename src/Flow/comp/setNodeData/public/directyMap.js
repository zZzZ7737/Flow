import spr from "../nodeType/image/spr.png";
import blr from "../nodeType/image/blr.png";
import shr from "../nodeType/image/shr.png";
import branch from "../nodeType/image/branch.png";

// 可选择节点的图片
const typeIcon = { 1: [spr], 2: [blr], 3: [shr], 4: [branch] };

const nodeTypeIcon = (key) => {
  return typeIcon[key] || [""];
};

//
const typeArr = [
  {
    id: "0",
    text: "审批人",
    nodeTypeStr: "approver",
    icon: nodeTypeIcon(1),
  },
  {
    id: "1",
    text: "办理人",
    nodeTypeStr: "transactor",
    icon: nodeTypeIcon(2),
  },
  {
    id: "2",
    text: "抄送人",
    nodeTypeStr: "auditor",
    icon: nodeTypeIcon(3),
  },
  {
    id: "3",
    text: "条件分支",
    nodeTypeStr: "branch",
    icon: nodeTypeIcon(4),
  },
];

export default typeArr;
