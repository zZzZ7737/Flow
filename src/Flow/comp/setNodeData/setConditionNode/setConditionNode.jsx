import { useContext } from "react";
import {
  Drawer,
  Input,
  Form,
  Radio,
  Button,
  message,
  Select,
  Tooltip,
} from "antd";
import PropTypes from "prop-types";
import Context from "../../../Context";
import { InfoCircleFilled } from "@ant-design/icons";
// import Expression from "./expression";
import "../style.css";

const { Option } = Select;

const ConditionForm = () => {
  const { conditionDrawerVisible, conditionDrawerChange } = useContext(Context);

  console.log(conditionDrawerVisible);

  return (
    <Drawer
      width={500}
      closable={false}
      onClose={() => {
        conditionDrawerChange(false);
      }}
      visible={conditionDrawerVisible}
      destroyOnClose
    ></Drawer>
  );
};

export default ConditionForm;

// class SetConditionNode extends Component {
//   static propTypes = {
//     visible: PropTypes.bool,
//     onClose: PropTypes.func,
//     node: PropTypes.object,
//     form: PropTypes.object,
//     onChange: PropTypes.func,
//     conditionApprover: PropTypes.array,
//     conditionApproverData: PropTypes.func,
//     dutyList: PropTypes.object,
//     itemApprovalList: PropTypes.array,
//     conditionField: PropTypes.array,
//     expressionBoxIsShowOnChange: PropTypes.func,
//     onChangeNodeInfo: PropTypes.func,
//     expressionBoxIsShow: PropTypes.bool,
//     branchData: PropTypes.object,
//     onCurOperateConditionInfoChange: PropTypes.func,
//     companyId: PropTypes.string,
//     elecTypeList: PropTypes.array,
//   };

//   static defaultProps = {
//     visible: false,
//     onClose: () => undefined,
//     node: {},
//     form: {},
//     onChange: () => undefined,
//     conditionApprover: [],
//     conditionApproverData: () => undefined,
//     dutyList: {},
//     itemApprovalList: [],
//     conditionField: [],
//     expressionBoxIsShowOnChange: () => undefined,
//     onChangeNodeInfo: () => undefined,
//     expressionBoxIsShow: true,
//     branchData: {},
//     onCurOperateConditionInfoChange: () => undefined,
//     companyId: '',
//     elecTypeList: [],
//   };

//   onClose = () => {
//     const { onClose } = this.props;
//     onClose(false);
//   };

//   getExpressionList = (value) => {
//     const { node, onCurOperateConditionInfoChange } = this.props;
//     const a = node.nodeInfo && node.nodeInfo.condition;
//     const obj = {
//       ...a,
//       explicitExpression: value,
//     };
//     const obj2 = {
//       ...node.nodeInfo,
//       condition: obj,
//     };
//     onCurOperateConditionInfoChange({
//       ...node,
//       nodeInfo: obj2,
//     });
//   };

//   getChooseApprvalData = (value) => {
//     const { conditionApproverData } = this.props;
//     conditionApproverData(value);
//   };

//   onChange = (e) => {
//     const { node, onCurOperateConditionInfoChange } = this.props;

//     const a = node.nodeInfo.condition;
//     const obj = {
//       ...a,
//       conditionType: e.target.value,
//     };
//     const obj2 = {
//       ...node.nodeInfo,
//       condition: obj,
//     };
//     onCurOperateConditionInfoChange({
//       ...node,
//       nodeInfo: obj2,
//     });
//   };

//   validateExpression = () => {
//     const {
//       node: {
//         nodeInfo: {
//           condition: { explicitExpression = [] },
//         },
//       },
//     } = this.props;
//     let result = true;
//     // ????????????????????????????????????????????????????????????
//     const expressionLists = explicitExpression.map((item, key) => {
//       const obj = {
//         prev: explicitExpression[key - 1],
//         next: explicitExpression[key + 1],
//         ...item,
//       };
//       return obj;
//     });
//     const tempSymbolArr = [];
//     for (let i = 0; i < expressionLists.length; i++) {
//       // ????????????????????????
//       if (i === 0) {
//         if (
//           expressionLists[i].type === 'symbol' &&
//           (expressionLists[i].name === '???' ||
//             expressionLists[i].name === '???' ||
//             expressionLists[i].name === ')')
//         ) {
//           // ??????????????????????????????????????????&&?????????&&????????????||???
//           result = false;
//           return false;
//         }
//       }
//       // ???????????????????????????
//       if (i === expressionLists.length - 1) {
//         if (
//           expressionLists[i].type === 'symbol' &&
//           (expressionLists[i].name === '???' ||
//             expressionLists[i].name === '???' ||
//             expressionLists[i].name === '(')
//         ) {
//           // ??????????????????????????????????????????&&?????????&&????????????||???
//           result = false;
//           return false;
//         }
//       }
//       // ?????????????????????
//       if (expressionLists[i].type === 'symbol') {
//         if (
//           (expressionLists[i].name === '(' &&
//             expressionLists[i].next &&
//             expressionLists[i].next.type === 'symbol' &&
//             (expressionLists[i].next.name === '???' || expressionLists[i].next.name === '???')) ||
//           (expressionLists[i].name === ')' &&
//             expressionLists[i].prev &&
//             expressionLists[i].prev.type === 'symbol' &&
//             (expressionLists[i].prev.name === '???' || expressionLists[i].prev.name === '???')) ||
//           (expressionLists[i].name === '(' &&
//             expressionLists[i].next &&
//             expressionLists[i].next.type === 'symbol' &&
//             expressionLists[i].next.name === ')') ||
//           (expressionLists[i].name === ')' &&
//             expressionLists[i].prev &&
//             expressionLists[i].prev.type === 'symbol' &&
//             expressionLists[i].prev.name === '(') ||
//           (expressionLists[i].name === ')' &&
//             expressionLists[i].next &&
//             expressionLists[i].next.type === 'symbol' &&
//             expressionLists[i].next.name === '(') ||
//           ((expressionLists[i].name === '???' || expressionLists[i].name === '???') &&
//             expressionLists[i].next &&
//             expressionLists[i].next.type === 'symbol' &&
//             (expressionLists[i].next.name === '???' || expressionLists[i].next.name === '???'))
//         ) {
//           // ?????????????????????(?????????????????????????????????????????????????????????||???
//           // ?????????????????????)?????????????????????????????????????????????????????????||???
//           // ?????????????????????(??????????????????????????????????????????????????????)
//           // ?????????????????????)??????????????????????????????????????????????????????(
//           // ?????????????????????)??????????????????????????????????????????????????????(
//           result = false;
//           return false;
//         }
//       }
//       // ???????????????????????????????????????????????????????????????????????????and||or
//       if (
//         expressionLists[i].type === 'expression' &&
//         expressionLists[i].next &&
//         expressionLists[i].next.type === 'expression'
//       ) {
//         result = false;
//         return false;
//       }
//       // ????????????????????????
//       if (expressionLists[i].type === 'symbol' && expressionLists[i].name === '(') {
//         tempSymbolArr.push(expressionLists[i].name);
//       }
//       if (expressionLists[i].type === 'symbol' && expressionLists[i].name === ')') {
//         if (!tempSymbolArr.length) {
//           // tempSymbolArr??????  ??????????????????)  ????????????????????????
//           result = false;
//           return false;
//         }
//         if (tempSymbolArr[tempSymbolArr.length - 1] === '(') {
//           // tempSymbolArr????????????????????????( ??????
//           tempSymbolArr.pop();
//         }
//       }
//     }
//     if (tempSymbolArr.length) {
//       result = false;
//       return false;
//     }
//     return result;
//   };

//   handleSubmit = () => {
//     const {
//       node,
//       onChangeNodeInfo,
//       form: { validateFieldsAndScroll },
//     } = this.props;
//     const expressionList = node.nodeInfo.condition.explicitExpression;
//     validateFieldsAndScroll((err, values) => {
//       if (values.conditionName === undefined || values.conditionName === '') {
//         message.warning('?????????????????????');
//         return;
//       }

//       if (!expressionList.length && values.conditionType === 0) {
//         message.warning('?????????????????????');
//         return;
//       }

//       if (!this.validateExpression() && values.conditionType === 0) {
//         message.warning('??????????????????');
//         return;
//       }

//       if (expressionList.length > 200 && values.conditionType === 0) {
//         message.warning('?????????????????????200??????');
//         return;
//       }

//       let string = '';
//       expressionList.forEach((item) => {
//         string += item.dealField;
//       });

//       onChangeNodeInfo(
//         {
//           ...node,
//           nodeInfo: {
//             name: values.conditionName,
//             type: '2',
//             condition: {
//               conditionName: values.conditionName,
//               conditionType: values.conditionType,
//               explicitExpression: values.conditionType === 0 ? expressionList : [],
//               priority: node.nodeInfo.condition.priority,
//             },
//           },
//         },
//         'branch',
//         string,
//       );
//     });
//   };

//   priorityOnchange = (value) => {
//     const { node, onCurOperateConditionInfoChange } = this.props;
//     const a = node.nodeInfo.condition;
//     const obj = {
//       ...a,
//       priority: value,
//     };
//     const obj2 = {
//       ...node.nodeInfo,
//       condition: obj,
//     };
//     onCurOperateConditionInfoChange({
//       ...node,
//       nodeInfo: obj2,
//     });
//   };

//   render() {
//     const {
//       visible,
//       form: { getFieldDecorator },
//       node,
//       conditionApprover,
//       dutyList,
//       conditionField,
//       elecTypeList,
//       branchData: { branches = [] },
//     } = this.props;

//     const { nodeInfo = {} } = node;
//     const { condition = {} } = nodeInfo;
//     const {
//       conditionName = undefined,
//       conditionType = 0,
//       explicitExpression = [],
//       priority,
//     } = condition;
//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 4 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 19 },
//       },
//     };

//     // ???????????????????????????????????????????????????????????????????????????????????????????????????
//     const hasOtherConditions = branches.filter((item) => item.markingId !== node.markingId);
//     // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
//     const hasOtherCondition = hasOtherConditions.filter(
//       (item) => item.nodeInfo.condition.conditionType === 1,
//     );

//     const priorityOption = branches.map((item, key) => (
//       <Option value={key + 1} key={item.markingId}>
//         ?????????{key + 1}
//       </Option>
//     ));

//     return (
//       <Drawer
//         placement="right"
//         closable={false}
//         onClose={this.onClose}
//         visible={visible}
//         forceRender
//         width="500"
//         destroyOnClose
//         className={classnames(style.conditionForm)}
//       >
//         <Form>
//           <div className={classnames('oa-clearfix')}>
//             <Form.Item label="????????????" className={classnames(style.conditionName, 'oa-fl')}>
//               {getFieldDecorator('conditionName', {
//                 initialValue: conditionName,
//               })(<Input maxLength={20} autoComplete="off" />)}
//             </Form.Item>
//             <Form.Item className={classnames(style.conditionYxj, 'oa-fl')}>
//               <Select value={priority} onChange={this.priorityOnchange}>
//                 {priorityOption}
//               </Select>
//             </Form.Item>
//             <Tooltip
//               placement="bottom"
//               overlayClassName={classnames('backgrounIsWhite')}
//               title={
//                 <div className={classnames(style.tipBox)}>
//                   ??????????????????????????????????????????1???????????????
//                   <br />
//                   ???????????????????????????????????????????????????????????????
//                   <br />
//                   ??????????????????????????????????????????????????????????????????
//                 </div>
//               }
//             >
//               <InfoCircleFilled className={classnames(style.yxjTip)} />
//             </Tooltip>
//           </div>
//           <Form.Item
//             label="????????????"
//             className={classnames(style.conditionType)}
//             {...formItemLayout}
//           >
//             {getFieldDecorator('conditionType', {
//               initialValue: conditionType,
//             })(
//               <Radio.Group onChange={this.onChange}>
//                 <Radio value={0}>???????????????</Radio>
//                 <Radio value={1} disabled={hasOtherCondition.length}>
//                   ????????????
//                 </Radio>
//               </Radio.Group>,
//             )}
//           </Form.Item>
//           {conditionType === 0 && (
//             <Form.Item label="?????????" style={{ paddingBottom: '20px' }} {...formItemLayout}>
//               <Expression
//                 elecTypeList={elecTypeList}
//                 expressionList={explicitExpression}
//                 onChange={this.getExpressionList}
//                 conditionApprover={conditionApprover}
//                 dutyList={dutyList}
//                 getChooseApprvalData={this.getChooseApprvalData}
//                 conditionField={conditionField}
//                 node={node}
//               />
//             </Form.Item>
//           )}
//         </Form>
//         <div className={classnames(style.setSingleNodeBtnBox)}>
//           <Button className={classnames('oa-mr8')} onClick={this.handleSubmit} type="primary">
//             ??????
//           </Button>
//           <Button onClick={this.onClose}>??????</Button>
//         </div>
//       </Drawer>
//     );
//   }
// }
