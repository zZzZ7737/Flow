import { useContext, useEffect } from "react";
import { Drawer, Form, Button, Input } from "antd";
import Context from "../../../Context";
import "../style.css";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const SetSingleNode = ({ nodeData }) => {
  const {
    singleDrawerVisible,
    singleDrawerChange,
    onChangeNodeInfo,
  } = useContext(Context);

  const { nodeInfo = {} } = nodeData;
  const { name: approvalName = "", approvalVal = null } = nodeInfo;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      approvalName: approvalName,
      approvalVal: approvalVal,
    });
  }, [approvalName, approvalVal, form]);

  const onFinish = (values) => {
    onChangeNodeInfo(
      {
        ...nodeData,
        nodeInfo: {
          type: "1",
          name: values.approvalName,
          approvalVal: values.approvalVal,
        },
      },
      "single"
    );
  };

  const close = () => {
    singleDrawerChange(false, {}, {});
  };

  return (
    <Drawer
      width={500}
      closable={false}
      onClose={() => {
        singleDrawerChange(false);
      }}
      visible={singleDrawerVisible}
      destroyOnClose
      getContainer={false}
    >
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item name="approvalName" label="审批人">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="approvalVal" label="审批值">
          <Input placeholder="请输入" />
        </Form.Item>
        <div className="singleFooter">
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            确定
          </Button>
          <Button htmlType="button" onClick={close}>
            取消
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default SetSingleNode;
