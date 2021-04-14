import { useContext } from "react";
import { Drawer, Form, Button, Input, message } from "antd";
import Context from "../../../Context";
// import classnames from "classnames";
// import { trim } from "@/publicMethod/tool";
// import ChooseBox from "@/components/choosePeople";
// import getPinyin from "@/components/relationShips/pinyin";
import "../style.css";

const SetSingleNode = () => {
  const { singleDrawerVisible, singleDrawerChange } = useContext(Context);

  return (
    <Drawer
      width={500}
      closable={false}
      onClose={() => {
        singleDrawerChange(false);
      }}
      visible={singleDrawerVisible}
      destroyOnClose
    ></Drawer>
  );
};

export default SetSingleNode;

// class SetSingleNode extends Component {
//   static propTypes = {
//     visible: PropTypes.bool,
//     onClose: PropTypes.func,
//     node: PropTypes.object,
//     form: PropTypes.object,
//     compRoleData: PropTypes.array,
//     compApprovalData: PropTypes.array,
//     dutyList: PropTypes.object,
//     getChooseApprvalData: PropTypes.func,
//     getChooseRoleData: PropTypes.func,
//     onChangeNodeInfo: PropTypes.func,
//     nodeSign: PropTypes.string,
//   };

//   static defaultProps = {
//     visible: false,
//     onClose: () => undefined,
//     node: {},
//     form: {},
//     compRoleData: [],
//     compApprovalData: [],
//     dutyList: {},
//     getChooseApprvalData: () => undefined,
//     getChooseRoleData: () => undefined,
//     onChangeNodeInfo: () => undefined,
//     nodeSign: "",
//   };

//   state = {
//     spdata: [
//       {
//         hasLetter: true,
//         type: "同事",
//         list: [],
//       },
//     ],
//     jsdata: [
//       {
//         hasLetter: false,
//         type: "职务",
//         list: [],
//       },
//       {
//         hasLetter: false,
//         type: "部门领导",
//         list: [
//           {
//             str: "★",
//             list: [
//               {
//                 id: "1",
//                 name: "发起人的部门领导",
//                 type: 3,
//                 searchName: "faqirendebumenlingdao发起人的部门领导",
//               },
//               {
//                 id: "2",
//                 name: "上个审批人的部门领导",
//                 type: 6,
//                 searchName:
//                   "shanggeshenpirendebumenlingdao上个审批人的部门领导",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         hasLetter: false,
//         type: "分管领导",
//         list: [
//           {
//             str: "★",
//             list: [
//               {
//                 id: "2",
//                 name: "发起人的分管领导",
//                 searchName: "faqirendefenguanlingdao发起人的分管领导",
//                 type: 4,
//               },
//               {
//                 id: "4",
//                 name: "上个审批人的分管领导",
//                 searchName:
//                   "shanggeshenpirendefenguanlingdao上个审批人的分管领导",
//                 type: 7,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };

//   componentDidUpdate(prevProps) {
//     const { dutyList } = this.props;
//     const { spdata, jsdata } = this.state;
//     if (prevProps.dutyList !== dutyList) {
//       // 对员工数据处理
//       const empList =
//         dutyList.emp &&
//         dutyList.emp.map((item) => {
//           const list = item.list.map((i) => {
//             return {
//               type: 1,
//               id: i.employeeId,
//               name: i.employeeNm,
//               searchName: getPinyin(i.employeeNm) + i.employeeNm,
//               ...i,
//             };
//           });
//           return {
//             ...item,
//             list,
//           };
//         });
//       spdata[0].list = empList;
//       // 对部门领导数据处理
//       const deptList = dutyList.deptleader.map((item) => {
//         const list = item.list.map((i) => {
//           return {
//             type: 2,
//             id: i.deptId,
//             name: i.deptNm,
//             searchName: getPinyin(i.deptNm) + i.deptNm,
//           };
//         });
//         return {
//           ...item,
//           list,
//         };
//       });
//       const deptleader = jsdata[1].list.concat(deptList);
//       jsdata[1].list = deptleader;
//       // 对职务数据处理
//       const postList = dutyList.post.map((item) => {
//         const list = item.list.map((i) => {
//           return {
//             type: 5,
//             name: i.postName,
//             searchName: getPinyin(i.postName) + i.postName,
//             ...i,
//           };
//         });
//         return {
//           ...item,
//           list,
//         };
//       });
//       jsdata[0].list = postList;
//     }
//   }

//   onClose = () => {
//     const { onClose } = this.props;
//     onClose(false);
//   };

//   getSPData = (res) => {
//     const { getChooseApprvalData } = this.props;
//     const roledata = res.map((item) => {
//       let obj = {};
//       obj.approvalBy = item.id;
//       obj = { ...item, ...obj };
//       return obj;
//     });
//     getChooseApprvalData(roledata);
//   };

//   getJSData = (res) => {
//     const { getChooseRoleData } = this.props;
//     const roledata = res.map((item) => {
//       let obj = {};
//       obj.approvalBy = item.id;
//       obj = { ...item, ...obj };
//       return obj;
//     });
//     getChooseRoleData(roledata);
//   };

//   handleSubmit = () => {
//     const {
//       form: { validateFieldsAndScroll },
//       onChangeNodeInfo,
//       node,
//       compRoleData,
//       compApprovalData,
//     } = this.props;
//     const selectNodeApproveData = compApprovalData.concat(compRoleData);
//     let processChildType = "";
//     if (node.nodeSign === "approver") {
//       processChildType = "0";
//     } else if (node.nodeSign === "transactor") {
//       processChildType = "1";
//     } else if (node.nodeSign === "auditor") {
//       processChildType = "2";
//     }
//     validateFieldsAndScroll((err, values) => {
//       if (values.nodeNames === undefined || trim(values.nodeNames) === "") {
//         message.warning("未填写节点名称");
//         return;
//       }
//       if (selectNodeApproveData.length === 0) {
//         message.warning("未选择审批人员");
//         return;
//       }

//       const selectNodeApproveDataList = selectNodeApproveData.map((item) => {
//         const { id, type, ...params } = item;
//         return params;
//       });

//       const itemApprovalList = JSON.parse(
//         JSON.stringify(selectNodeApproveDataList).replace(/types/g, "type")
//       );
//       onChangeNodeInfo(
//         {
//           ...node,
//           nodeInfo: {
//             type: "1",
//             name: values.nodeNames,
//             required: "0",
//             itemApprovalList,
//             processChildType,
//           },
//         },
//         "single"
//       );
//     });
//   };

//   render() {
//     const {
//       visible,
//       node: { nodeSign = "", nodeInfo = {} },
//       form: { getFieldDecorator },
//       compRoleData,
//       compApprovalData,
//     } = this.props;

//     const { name = undefined } = nodeInfo;

//     const { spdata, jsdata } = this.state;

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

//     const tailFormItemLayout = {
//       wrapperCol: {
//         sm: {
//           span: 15,
//           offset: 4,
//         },
//       },
//     };

//     let nodename = "审批";
//     if (nodeSign === "approver") {
//       nodename = "审批";
//     } else if (nodeSign === "transactor") {
//       nodename = "办理";
//     } else if (nodeSign === "auditor") {
//       nodename = "审核";
//     }

//     return (
//       <Drawer
//         width={500}
//         closable={false}
//         onClose={this.onClose}
//         visible={visible}
//         destroyOnClose
//       >
//         <Form {...formItemLayout}>
//           <Form.Item label="节点名称">
//             {getFieldDecorator("nodeNames", {
//               initialValue: name,
//             })(<Input maxLength={20} autoComplete="off" />)}
//           </Form.Item>
//           <Form.Item label={`${nodename}人员`}>
//             <div
//               className={classnames(style.choosePeople, "oa-clearfix", "oa-pr")}
//             >
//               <div className={classnames("oa-fl", "oa-mr8")}>
//                 <ChooseBox
//                   tipName={`+请选择${nodename}人`}
//                   data={spdata}
//                   tags={compApprovalData}
//                   onChange={this.getSPData}
//                   searchResultIsPhoto
//                 />
//               </div>
//               <div className={classnames("oa-fl")}>
//                 <ChooseBox
//                   tipName="+按角色选择"
//                   data={jsdata}
//                   tags={compRoleData}
//                   onChange={this.getJSData}
//                   searchResultIsPhoto={false}
//                 />
//               </div>
//             </div>
//           </Form.Item>
//         </Form>
//         <div className={classnames(style.setSingleNodeBtnBox)}>
//           <Button
//             className={classnames("oa-mr8")}
//             onClick={this.handleSubmit}
//             type="primary"
//           >
//             保存
//           </Button>
//           <Button onClick={this.onClose}>取消</Button>
//         </div>
//       </Drawer>
//     );
//   }
// }
