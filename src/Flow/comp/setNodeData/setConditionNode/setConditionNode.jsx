import { useContext, useEffect } from "react";
import { Drawer, Form, Input, Button, Select } from "antd";
import Context from "../../../Context";
import "../style.css";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const ConditionForm = ({ nodeData, branchData }) => {
  const {
    conditionDrawerVisible,
    conditionDrawerChange,
    onChangeNodeInfo,
    onCurOperateConditionInfoChange,
  } = useContext(Context);

  const { branches = [] } = branchData;

  const { nodeInfo = {} } = nodeData;
  const { condition = {} } = nodeInfo;
  const {
    conditionName = undefined,
    priority,
    conditionVal = undefined,
  } = condition;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      priority: priority,
      conditionName: conditionName,
      conditionVal: conditionVal,
    });
  }, [conditionName, conditionVal, form, priority]);

  const onFinish = (values) => {
    onChangeNodeInfo(
      {
        ...nodeData,
        nodeInfo: {
          name: values.conditionName,
          type: "2",
          condition: {
            conditionName: values.conditionName,
            conditionVal: values.conditionVal,
            priority: nodeData.nodeInfo.condition.priority,
          },
        },
      },
      "branch"
    );
  };

  const close = () => {
    conditionDrawerChange(false, {}, {});
  };

  const priorityOnchange = (value) => {
    const a = nodeData.nodeInfo.condition;
    const obj = {
      ...a,
      priority: value,
    };
    const obj2 = {
      ...nodeData.nodeInfo,
      condition: obj,
    };
    onCurOperateConditionInfoChange({
      ...nodeData,
      nodeInfo: obj2,
    });
  };

  const priorityOption = branches.map((item, key) => (
    <Option value={key + 1} key={item.markingId}>
      优先级{key + 1}
    </Option>
  ));

  return (
    <Drawer
      width={500}
      closable={false}
      onClose={() => {
        conditionDrawerChange(false);
      }}
      visible={conditionDrawerVisible}
      destroyOnClose
      getContainer={false}
    >
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item name="priority" label="优先级">
          <Select value={priority} onChange={priorityOnchange}>
            {priorityOption}
          </Select>
        </Form.Item>
        <Form.Item name="conditionName" label="条件名">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="conditionVal" label="条件">
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

export default ConditionForm;
