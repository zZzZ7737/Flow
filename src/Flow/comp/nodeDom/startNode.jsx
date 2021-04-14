import React from "react";
import PropTypes from "prop-types";
import NodeType from "../setNodeData/nodeType/nodeType";
import "./style.css";

const StartNode = ({ data }) => {
  return (
    <div className="startNodeBox f-pr">
      <div className="startNode">发起人</div>
      <div className="nodeAddWrap">
        <NodeType data={data} addBtnType="startNode" />
      </div>
    </div>
  );
};

StartNode.propTypes = {
  onChangeFlowData: PropTypes.func,
  data: PropTypes.object,
};

StartNode.defaultProps = {
  onChangeFlowData: () => undefined,
  data: {},
};

export default React.memo(StartNode);
