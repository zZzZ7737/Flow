import { useReducer } from "react";
import { useContext } from "react";
import Context from "../../Context";
import StartNode from "./startNode";
import SingleNode from "./singleNode";
import BranchNode from "./branchNode";
import EndNode from "./endNode";
import NodeType from "../setNodeData/nodeType/nodeType";
import randomNumber from "../../randomNumber/randomNumber";

const RenderNode = () => {
  const { sourceData, onChangeFlowData } = useContext(Context);
  const [, forceUpdate] = useReducer((v) => !v, true);

  const addCondition = (node) => {
    node.branches.push({
      type: "condition",
      markingId: randomNumber(1)[0],
      nodeInfo: {
        name: "",
        type: "2",
        condition: {
          conditionName: "",
          conditionType: 0,
          explicitExpression: [],
          priority: node.branches.length + 1,
        },
      },
      next: undefined,
    });
    forceUpdate();
  };

  /* eslint-disable default-case */
  const renderNode = (node, prevNode, parentNode = {}, result = [], i = 0) => {
    switch (node.type) {
      case "start": {
        result.push(<StartNode data={node} key={node.markingId} />);
        break;
      }
      case "end": {
        result.push(<EndNode key={node.markingId} />);
        break;
      }
      case "single": {
        result.push(
          <SingleNode
            data={node}
            prev={prevNode}
            key={node.markingId}
            parentNode={parentNode}
          />
        );
        break;
      }
      case "branch": {
        const jsx = (
          <div className="branchWrap" key={node.markingId}>
            <div className="branchBoxWrap">
              <div
                className="branchBox"
                style={{
                  marginTop: "15px",
                }}
              >
                <button
                  type="button"
                  className="addCondition"
                  onClick={() => {
                    addCondition(node);
                  }}
                >
                  添加条件
                </button>
                {node.branches.map((child, key) => {
                  let branchIndex;
                  if (key === 0) {
                    branchIndex = "0";
                  } else if (key === node.branches.length - 1) {
                    branchIndex = "1";
                  }
                  return (
                    <div className="branch f-pr" key={child.markingId}>
                      <BranchNode
                        index={branchIndex}
                        data={child}
                        branchData={node}
                        prev={prevNode}
                        key={child.markingId}
                        i={i++}
                      />
                      {child.next && renderNode(child.next, child, node)}
                    </div>
                  );
                })}
              </div>
              <div className="nodeAddWrap">
                <NodeType
                  data={node}
                  nodeTypeCallback={(v) => {
                    onChangeFlowData(node, v, parentNode);
                  }}
                  addBtnType="branchNode"
                />
              </div>
            </div>
          </div>
        );
        result.push(jsx);
        break;
      }
    }
    if (node.next) {
      return renderNode(node.next, node, parentNode, result);
    }
    return result;
  };

  return <>{renderNode({ ...sourceData })}</>;
};
export default RenderNode;
