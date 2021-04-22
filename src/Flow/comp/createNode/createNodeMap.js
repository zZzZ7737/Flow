import randomNumber from "../../randomNumber/randomNumber";

function createNodeMap(nodeType) {
  if (nodeType === "approver") {
    return {
      type: "single",
      nodeSign: "approver",
      nodeInfo: {
        type: "2",
      },
      markingId: randomNumber(1)[0],
    };
  }
  if (nodeType === "transactor") {
    return {
      type: "single",
      nodeSign: "transactor",
      nodeInfo: {
        type: "2",
      },
      markingId: randomNumber(1)[0],
    };
  }
  if (nodeType === "auditor") {
    return {
      type: "single",
      nodeSign: "auditor",
      nodeInfo: {
        type: "2",
      },
      markingId: randomNumber(1)[0],
    };
  }
  return {
    type: "branch",
    markingId: randomNumber(1)[0],
    branches: [
      {
        type: "condition",
        markingId: randomNumber(1)[0],
        nodeInfo: {
          name: "",
          type: "2",
          condition: {
            conditionName: "",
            conditionVal: "",
            priority: 1,
          },
        },
        next: undefined,
      },
      {
        type: "condition",
        markingId: randomNumber(1)[0],
        nodeInfo: {
          name: "",
          type: "2",
          condition: {
            conditionName: "",
            conditionVal: "",
            priority: 2,
          },
        },
        next: undefined,
      },
    ],
  };
}

export default createNodeMap;
