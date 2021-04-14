import { Button } from "antd";
import { useState, useMemo, useCallback, useReducer } from "react";
import RenderNode from "./comp/nodeDom/renderNode";
import randomNumber from "./randomNumber/randomNumber";
import createNodeMap from "./comp/createNode/createNodeMap";
import findLastNode from "./linkedListUtils/findLastNode";
import SetSingleNode from "./comp/setNodeData/setSingleNode/setSingleNode";
import Condition from "./comp/setNodeData/setConditionNode/setConditionNode";

import Context from "./Context";
import "./style.css";

const Flow = () => {
  const [sourceData, setSourceData] = useState({
    type: "start",
    markingId: randomNumber(1)[0],
    nodeInfo: {
      name: "开始节点",
      type: "0",
    },
    next: {
      type: "single",
      nodeSign: "approver",
      markingId: randomNumber(1)[0],
      nodeInfo: {
        type: "1",
      },
      next: {
        type: "end",
        markingId: randomNumber(1)[0],
        nodeInfo: {
          name: "结束节点",
          type: "3",
          required: "0",
        },
      },
    },
  });

  const [iType] = useState("0,1,2");
  const [, forceUpdate] = useReducer((v) => !v, true);
  const [singleDrawerVisible, setVisible] = useState(false);
  const [conditionDrawerVisible, setCVisible] = useState(false);

  // 新增节点
  const onChangeFlowData = useCallback((node, nodeType, parentNode) => {
    const newNode = createNodeMap(nodeType);
    let tempNext = node.next;
    node.next = newNode;
    if (nodeType === "branch") {
      if (parentNode && parentNode.type) {
        newNode.branches[0].next = tempNext;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (tempNext && tempNext.type === "end") {
          newNode.next = tempNext;
        } else if (!tempNext && nodeType === "branch") {
          node.next = newNode;
        } else {
          newNode.branches[0].next = tempNext;
          while (tempNext) {
            if (tempNext.next && tempNext.next.type === "end") {
              tempNext.next = undefined;
              break;
            }
            tempNext = tempNext.next;
          }

          newNode.next = {
            type: "end",
            markingId: randomNumber(1)[0],
            nodeInfo: {
              name: "结束节点",
              type: "3",
              required: "0",
            },
          };
        }
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      newNode.next = tempNext;
    }

    if (node.type === "start") {
      setSourceData(node);
    } else {
      forceUpdate();
    }
  }, []);

  // 删除节点
  const onRemoveNode = useCallback((node, prev, nodeType, branchData) => {
    // 删除的是单节点
    if (nodeType === "single") {
      prev.next = node.next;
    } else {
      // 删除的是条件节点
      // eslint-disable-next-line no-lonely-if
      if (branchData.branches.length > 2) {
        branchData.branches = branchData.branches.filter(
          (item) => item.markingId !== node.markingId
        );
        branchData.branches.forEach((item, key) => {
          const { nodeInfo } = item;
          nodeInfo.condition.priority = key + 1;
        });
      } else if (branchData.branches.length <= 2) {
        // 判断所有条件节点下是否有next
        const judgeBranchHasNode = branchData.branches.some((item) => {
          return item.next;
        });

        if (!judgeBranchHasNode) {
          // 说明改分支只有两个条件节点 且两个条件节点下都没有节点
          prev.next = branchData.next;
        } else {
          // 删除选中的条件节点
          const branch = branchData.branches.filter(
            (item) => item.markingId !== node.markingId
          );
          const lastNode = branchData.next;
          const branchLastNode = findLastNode(branch[0]);
          branchLastNode.next = lastNode;
          const branchNextNode = branch[0].next;
          prev.next = branchNextNode;
        }
      }
    }
    if (prev.type === "start") {
      setSourceData(prev);
    } else {
      forceUpdate();
    }
  }, []);

  const singleDrawerChange = useCallback((v) => {
    setVisible(v);
  }, []);

  const conditionDrawerChange = useCallback((v) => {
    console.log(v);
    setCVisible(v);
  }, []);

  const contextValues = useMemo(
    () => ({
      iType,
      sourceData,
      onChangeFlowData,
      onRemoveNode,
      singleDrawerVisible,
      singleDrawerChange,
      conditionDrawerVisible,
      conditionDrawerChange,
    }),
    [
      iType,
      sourceData,
      onChangeFlowData,
      onRemoveNode,
      singleDrawerVisible,
      singleDrawerChange,
      conditionDrawerVisible,
      conditionDrawerChange,
    ]
  );

  return (
    <Context.Provider value={contextValues}>
      <div className="box">
        <div className="flowHeader f-clearfix">
          流程设置
          <Button type="primary" className="f-fr createFlow">
            生成
          </Button>
        </div>
        <div className="boxWrap">
          <div className="mainBox">
            <RenderNode
            // singleNodeDrawer={singleNodeDrawer}
            // conditionNodeDrawer={conditionNodeDrawer}
            // onRemoveNode={deleteNodeAfterFlowData}
            />
          </div>
        </div>
      </div>
      <SetSingleNode
      // visible={singleNodeDrawer}
      // onClose={this.singleNodeDrawer}
      // node={curOperateSingleInfo}
      // compRoleData={compRoleData}
      // compApprovalData={compApprovalData}
      // dutyList={dutyList}
      // getChooseApprvalData={this.getChooseApprvalData}
      // getChooseRoleData={this.getChooseRoleData}
      // onChangeNodeInfo={this.onChangeNodeInfo}
      />
      <Condition
      // visible={conditionNodeDrawer}
      // onClose={this.conditionNodeDrawer}
      // node={curOperateConditionInfo}
      // conditionApprover={conditionApprover}
      // dutyList={dutyList}
      // conditionField={conditionField}
      // conditionApproverData={this.conditionApproverData}
      // onChangeNodeInfo={this.onChangeNodeInfo}
      // expressionBoxIsShow={expressionBoxIsShowFlag}
      // expressionBoxIsShowOnChange={this.expressionBoxIsShowOnChange}
      // branchData={branchData}
      // onCurOperateConditionInfoChange={this.onCurOperateConditionInfoChange}
      // elecTypeList={elecTypeList}
      />
    </Context.Provider>
  );
};
export default Flow;
