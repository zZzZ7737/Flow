import React, { useState, useContext } from "react";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Context from "../../Context";
import NodeType from "../setNodeData/nodeType/nodeType";
import "./style.css";

const SingleNode = ({ data, prev, parentNode }) => {
  const { singleDrawerChange, onRemoveNode } = useContext(Context);
  const [mouseIsHover, setMouseIsHover] = useState(false);

  const mouseEnter = (value) => {
    setMouseIsHover(value);
  };

  const remove = (e, nodeType) => {
    e.stopPropagation();
    onRemoveNode(data, prev, nodeType);
  };

  let defaultText = "";
  let defaultTitleText = "审批人";
  let titleBg = "approverBg";
  let boxBorder = "approverBoxBorder";
  if (data.nodeSign === "approver") {
    defaultText = "请选择审批人";
    defaultTitleText = "审批人";
    titleBg = "approverBg";
    boxBorder = "approverBoxBorder";
  } else if (data.nodeSign === "transactor") {
    defaultText = "请选择办理人";
    defaultTitleText = "办理人";
    titleBg = "transactorBg";
    boxBorder = "transactorBoxBorder";
  } else if (data.nodeSign === "auditor") {
    defaultText = "请选择抄送人";
    defaultTitleText = "抄送人";
    titleBg = "auditorBg";
    boxBorder = "auditorBoxBorder";
  }

  const {
    nodeInfo: { approvalVal, name = defaultTitleText },
  } = data;

  return (
    <div className="nodeWrap">
      <div
        className={`singleBox f-pr ${boxBorder}`}
        onMouseEnter={() => {
          mouseEnter(true);
        }}
        onMouseLeave={() => {
          mouseEnter(false);
        }}
        onClick={() => {
          singleDrawerChange(true, data, prev);
        }}
      >
        <div className={`title f-pr f-clearfix ${titleBg}`}>
          <span></span>
          <em className="nodeName f-fl f-ellipsis">{name}</em>
          {mouseIsHover && (
            <i
              className=" delIcon iconfont f-fl "
              onClick={(e) => {
                remove(e, "single");
              }}
            >
              <CloseOutlined />
            </i>
          )}
        </div>
        {approvalVal ? (
          <div className="nodeContentPeople f-clearfix">
            <em
              className="nodeContentPeopleText f-fl f-ellipsis"
              style={{ color: "#333" }}
            >
              {approvalVal}
            </em>
            <i className="f-fl nodeContentIcon iconfont">
              <RightOutlined />
            </i>
          </div>
        ) : (
          <div className="nodeContentPeople oa-clearfix ">
            <em
              className="nodeContentPeopleText f-fl f-ellipsis"
              style={{ color: "#ccc" }}
            >
              {defaultText}
            </em>
            <i className="nodeContentIcon iconfont f-fl">
              <RightOutlined />
            </i>
          </div>
        )}
      </div>
      <div className="nodeAddWrap">
        <NodeType data={data} parentNode={parentNode} addBtnType="singleNode" />
      </div>
    </div>
  );
};

SingleNode.propTypes = {
  data: PropTypes.object,
  prev: PropTypes.object,
  parentNode: PropTypes.object,
};

SingleNode.defaultProps = {
  data: {},
  prev: {},
  parentNode: {},
};

export default SingleNode;
