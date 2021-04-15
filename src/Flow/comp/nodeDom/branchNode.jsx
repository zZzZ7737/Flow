import React, { useState, useContext } from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";
import Context from "../../Context";
import NodeType from "../setNodeData/nodeType/nodeType";
import "./style.css";

const BranchNode = ({ data, index, i, branchData, prev }) => {
  const { onRemoveNode, conditionDrawerChange } = useContext(Context);
  const [mouseIsHover, setMouseIsHover] = useState(false);

  const mouseEnter = (value) => {
    setMouseIsHover(value);
  };

  // 删除节点
  const remove = (e, nodeType) => {
    e.stopPropagation();
    onRemoveNode(data, prev, nodeType, branchData);
  };

  const {
    nodeInfo: {
      condition: {
        conditionName,
        explicitExpression,
        conditionType,
        priority = 0,
      },
    },
    next = undefined,
  } = data;

  let conditionShowText;
  if (explicitExpression.length) {
    const textString = explicitExpression.map((item) => item.name);
    conditionShowText = `表达式：${textString.join("")}`;
  } else if (!explicitExpression.length && conditionType === 1) {
    conditionShowText = "其他条件";
  } else {
    conditionShowText = "请设置条件";
  }

  return (
    <>
      <div className="conditionNode" key={data.markingId}>
        <div className="conditionNodeBox">
          <div
            className="conditionNodeJudge f-clearfix"
            onMouseEnter={() => {
              mouseEnter(true);
            }}
            onMouseLeave={() => {
              mouseEnter(false);
            }}
            onClick={() => conditionDrawerChange(true)}
          >
            <div
              className="conditionTitle f-clearfix"
              style={{ height: "14px" }}
            >
              <em className="f-fl f-ellipsis" style={{ width: "57%" }}>
                {conditionName || `条件${i + 1}`}
              </em>

              {mouseIsHover ? (
                <>
                  <i
                    className="delIcon iconfont f-fr"
                    onClick={(e) => {
                      remove(e, "branch");
                    }}
                    style={{ color: "#9b9b9b" }}
                  >
                    <CloseOutlined />
                  </i>
                </>
              ) : (
                <em className="priority f-fr">
                  {priority !== 0 && `优先级${priority}`}
                </em>
              )}
            </div>
            {explicitExpression.length > 0 ? (
              <Tooltip placement="rightTop" title={conditionShowText}>
                <div className="conditionContent f-clearfix f-two-ellipsis">
                  {conditionShowText}
                  {mouseIsHover &&
                    explicitExpression.length === 0 &&
                    conditionType === "0" && (
                      <i
                        className=" f-fr"
                        style={{ fontSize: "12px", color: "#9b9b9b" }}
                      >
                        <CloseOutlined />
                      </i>
                    )}
                </div>
              </Tooltip>
            ) : (
              <div className="conditionContent f-clearfix f-two-ellipsis">
                {conditionShowText}
                {mouseIsHover &&
                  explicitExpression.length === 0 &&
                  conditionType === "0" && (
                    <i
                      className="f-fr"
                      style={{ fontSize: "12px", color: "#9b9b9b" }}
                    >
                      <CloseOutlined />
                    </i>
                  )}
              </div>
            )}
          </div>
          <div className="nodeAddWrap">
            <NodeType
              data={data}
              parentNode={branchData}
              addBtnType="branchNode"
            />
          </div>
        </div>
      </div>
      {index === "0" && (
        <>
          <div className="topLeftVisibleLine" />
          <div className="bottomLeftVisibleLine" />
        </>
      )}
      {index === "1" && (
        <>
          <div className="topRightVisibleLine" />
          <div className="bottomRightVisibleLine" />
        </>
      )}
    </>
  );
};

BranchNode.propTypes = {
  index: PropTypes.string,
  data: PropTypes.object,
  onChangeFlowData: PropTypes.func,
  conditionNodeDrawer: PropTypes.func,
  prev: PropTypes.object,
  onRemoveNode: PropTypes.func,
  branchData: PropTypes.object,
  i: PropTypes.number,
};

BranchNode.defaultProps = {
  index: "", // 0  说明该条件框的位置为第一个位置； 1说明该条件框的位置为同级条件框中的最后一个位置; 为空说明处于中间位置
  data: {},
  onChangeFlowData: () => undefined,
  conditionNodeDrawer: () => undefined,
  prev: {},
  onRemoveNode: () => undefined,
  branchData: {},
  i: 1,
};

export default BranchNode;
