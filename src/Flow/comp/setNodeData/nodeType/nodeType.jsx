import React, { useState, useContext } from "react";
import Context from "../../../Context";
import { Popover } from "antd";
import PropTypes from "prop-types";
import "./style.css";
import typeArr from "../public/directyMap";

const NodeType = ({ data, parentNode = {} }) => {
  console.log("..parentNode...", parentNode);
  const { iType, onChangeFlowData } = useContext(Context);

  const [visible, setVisible] = useState(false);

  const createNodeOrBranches = (nodeType) => {
    onChangeFlowData(data, nodeType, parentNode);
    setVisible(false);
  };

  const handleVisibleChange = (v) => {
    setVisible(v);
  };

  const cardNodeTypeJudge = () => {
    const itemTypeArr = iType.split(",");

    const [, , , branch] = typeArr;

    const arr = [];
    for (let i = 0; i < itemTypeArr.length; i++) {
      for (let j = 0; j < typeArr.length; j++) {
        const { id } = typeArr[j];
        if (id === itemTypeArr[i]) {
          arr.push(typeArr[j]);
        }
      }
    }

    return arr.concat([branch]);
  };

  return (
    <Popover
      placement="rightTop"
      content={
        <div className="createNodeWrap f-clearfix">
          {cardNodeTypeJudge().map((item) => (
            <div
              className="f-fl nodeTypeBox f-clearfix"
              onClick={() => {
                createNodeOrBranches(item.nodeTypeStr);
              }}
              key={item.text}
            >
              <div className="nodeTypeIcon f-fl">
                <img src={item.icon} alt="" />
              </div>
              <div className="f-fl nodeTypeName">{item.text}</div>
            </div>
          ))}
        </div>
      }
      trigger="click"
      overlayClassName="createNodeCard"
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <button type="button" className="nodeAddBox">
        <span className="nodeAddBtn">
          <i>+</i>
        </span>
      </button>
    </Popover>
  );
};

NodeType.propTypes = {
  data: PropTypes.object,
  parentNode: PropTypes.object,
  addBtnType: PropTypes.string,
};

NodeType.defaultProps = {
  data: {},
  parentNode: {},
  addBtnType: "",
};

export default React.memo(NodeType);
