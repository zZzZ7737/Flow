import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
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
      condition: { conditionName, conditionVal, priority = 0 },
    },
  } = data;

  let conditionShowText;
  if (conditionVal) {
    conditionShowText = `表达式：${conditionVal}`;
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
            onClick={() => conditionDrawerChange(true, data, prev, branchData)}
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
            <div className="conditionContent f-clearfix f-two-ellipsis">
              {conditionShowText}
              {mouseIsHover && (
                <i
                  className="f-fr"
                  style={{ fontSize: "12px", color: "#9b9b9b" }}
                >
                  <RightOutlined />
                </i>
              )}
            </div>
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
  data: PropTypes.object,
  index: PropTypes.string,
  i: PropTypes.number,
  branchData: PropTypes.object,
  prev: PropTypes.object,
};

BranchNode.defaultProps = {
  data: {},
  index: "", // 0  说明该条件框的位置为第一个位置； 1说明该条件框的位置为同级条件框中的最后一个位置; 为空说明处于中间位置
  i: 1,
  branchData: {},
  prev: {},
};

export default BranchNode;
