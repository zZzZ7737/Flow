import React, { useState, useEffect } from 'react';
import { Select, Button, message, Tooltip, InputNumber } from 'antd';
import classnames from 'classnames';
import { InfoCircleFilled, DownOutlined } from '@ant-design/icons';
import getUrlParams from 'get-url-params';
import PropTypes from 'prop-types';
import ChooseBox from '@/components/choosePeople';
import randomNumber from '@/publicMethod/randomNumber/randomNumber';
import renderSelectComp from '../public/renderConditionSelectComp';
import { conditionFieldChangeToCode, expressionRuleMaps } from '../../../../public/directory';
import style from '../style.module.less';

const { Option } = Select;

const Expression = ({
  dutyList,
  getChooseApprvalData,
  expressionList,
  conditionApprover,
  onChange,
  conditionField,
  elecTypeList,
}) => {
  const [expressionField, setExpressionField] = useState(undefined);
  const [expressionRule, setExpressionRule] = useState(undefined);
  const [expressionSymbol] = useState([
    { value: '(' },
    { value: ')' },
    { value: '且' },
    { value: '或' },
    { value: '删除' },
    { value: '清空' },
  ]);
  const [deptList, setDeptList] = useState([]);
  const [inputType, setInputType] = useState(null);
  const [drowDownIsShowIcon, setDrowDownIsShowIcon] = useState(true);
  const [selectExpressionKey, setSelectExpressionKey] = useState(undefined);
  const [ruleSelectDisable, setRuleSelectDisable] = useState(true);
  const [expressionRuleMap, setExpressionRuleMap] = useState([]);
  const [exValue, setExValue] = useState(undefined);
  const [amount, setAmount] = useState(undefined);

  const onChangeField = (value, v) => {
    const dutyValue = value.split('#');
    const dept = [];
    if (dutyValue[1] === '1') {
      dept.push(renderSelectComp(dutyList, dutyValue[0]));
    }
    setInputType(dutyValue[1]);
    getChooseApprvalData([]);
    setRuleSelectDisable(false);
    setDrowDownIsShowIcon(true);
    setExpressionRule(undefined);
    setExpressionField(v.props.children);
    setDeptList(dept);
    setExpressionRuleMap(expressionRuleMaps(dutyValue[1], dutyValue[0]));
  };

  const onRuleChange = (value) => {
    setExpressionRule(value);
    setDrowDownIsShowIcon(false);
  };

  const insertExpression = (insertType, operateName = '') => {
    let concatExpression;
    let obj;
    const expressionLists = [...expressionList];
    if (expressionLists.length > 199) {
      message.warning('条件超出最大值200个块');
      return expressionLists;
    }
    if (insertType === 'expression') {
      let va;
      let showValue;
      if (inputType === '1') {
        if (conditionFieldChangeToCode(expressionField)[0] === 'sponsorJob') {
          va = conditionApprover[0].name;
        } else {
          va = conditionApprover[0].id;
        }
        showValue = conditionApprover[0].name;
      }
      if (inputType === '2') {
        va = exValue;
        showValue = exValue;
      }

      if (inputType === '3') {
        va = amount;
        showValue = amount;
      }

      const ruleMap = {
        1: ['=', '=='],
        2: ['≠', '!='],
        3: ['<', '<'],
        4: ['≤', '<='],
        5: ['>', '>'],
        6: ['≥', '>='],
        7: ['包含', '=='],
        8: ['不包含', '!='],
      };

      // implicitExpression 字段中 运算符前后要有空格
      obj = {
        operator: '',
        explicitExpression: `${expressionField}${ruleMap[expressionRule][0]}${showValue}`,
        implicitExpression: `${conditionFieldChangeToCode(expressionField)[0]} ${
          ruleMap[expressionRule][1]
        } '${va}'`,
        name: `${expressionField}${ruleMap[expressionRule][0]}${showValue}`,
        type: insertType,
        markingIds: randomNumber(1)[0],
        dealField: `1${expressionRule === '1' ? ' == ' : ' != '}1`,
      };
    } else {
      let implicitOperator = '';
      if (operateName === '且') {
        implicitOperator = ' && ';
      } else if (operateName === '或') {
        implicitOperator = ' || ';
      } else {
        implicitOperator = ` ${operateName} `;
      }
      obj = {
        operator: operateName,
        explicitExpression: '',
        implicitExpression: '',
        implicitOperator,
        name: operateName,
        type: insertType,
        markingIds: randomNumber(1)[0],
        dealField: implicitOperator,
      };
    }
    if (selectExpressionKey !== undefined) {
      expressionLists.splice(selectExpressionKey + 1, 0, obj);
      concatExpression = expressionLists.map((item) => {
        return item.isFoucs ? { ...item, isFoucs: false } : { ...item };
      });
    } else {
      concatExpression = expressionList.concat(obj);
    }
    return concatExpression;
  };

  // 将表达式写入表达式框中
  const writeIntoExpressin = () => {
    if (
      expressionField === undefined ||
      !expressionRule ||
      (inputType === '1' && !conditionApprover.length) ||
      (inputType === '2' && !exValue) ||
      (inputType === '3' && !amount)
    ) {
      message.warning('字段、规则和值不能为空');
      return;
    }
    onChange(insertExpression('expression'));
    getChooseApprvalData([]);
    setExpressionField(undefined);
    setExpressionRule(undefined);
    setDrowDownIsShowIcon(true);
    setSelectExpressionKey(undefined);
    setRuleSelectDisable(true);
    setExValue(undefined);
    setAmount(undefined);
    setInputType(null);
  };

  // 删除表达式框中的表达式
  const deleteExpression = (e) => {
    const operateName = e.target.dataset.value;
    if (operateName !== '删除' && operateName !== '清空') {
      onChange(insertExpression('symbol', operateName));
    } else if (operateName === '清空') {
      onChange([]);
      setSelectExpressionKey(undefined);
    } else if (operateName === '删除') {
      const lists = expressionList.filter((item) => !item.isFoucs);
      onChange(lists);
      setSelectExpressionKey(undefined);
    }
  };

  // 键盘backspace删除选中表达式
  const onKeyUpdeleteExpression = (e) => {
    if (e.keyCode === 8) {
      const lists = expressionList.filter((item) => !item.isFoucs);
      onChange(lists);
      setSelectExpressionKey(undefined);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyUpdeleteExpression);
    return () => {
      document.removeEventListener('keydown', onKeyUpdeleteExpression);
    };
  });

  const getExpressionValue = (res) => {
    const roledata = res.map((item) => {
      let obj = {};
      obj.approvalBy = item.id;
      obj = { ...item, ...obj };
      return obj;
    });
    getChooseApprvalData(roledata);
  };

  // 表达式框中选中某个表达式
  const selectExpression = (key) => {
    const lists = expressionList.map((item, k) => {
      if (key === k) {
        return { ...item, isFoucs: true };
      }
      return { ...item, isFoucs: false };
    });
    onChange(lists);
    setSelectExpressionKey(key);
  };

  // 表达式操作按钮
  const exSymbol = expressionSymbol.map((item) => {
    let exclassName;
    if (item.value === '删除') {
      exclassName = style.expressionDelete;
    } else if (item.value === '清空') {
      exclassName = style.expressionClear;
    } else {
      exclassName = style.expressionSymbol;
    }
    return (
      <button
        type="button"
        data-value={item.value}
        className={classnames(
          style.oaFl,
          `${item.value === '清空' ? 'oa-mr8' : 'oa-mr12'} `,
          `${exclassName}`,
        )}
        onClick={(e) => deleteExpression(e)}
        key={item.value}
      >
        {item.value}
      </button>
    );
  });

  // 字段 OptionList
  const optionList = conditionField.map((item) => (
    <Option value={`${item.code}#${item.inputType}`} key={item.code}>
      {item.name}
    </Option>
  ));

  // 规则 OptionList
  const expressionRuleList = expressionRuleMap.map((item) => (
    <Option value={item.id} key={item.id}>
      {item.name}
    </Option>
  ));

  const expressionStrings = expressionList.map((item, key) => {
    return (
      <em
        className={classnames(
          'oa-fl',
          'oa-pr',
          'oa-mr12',
          style.tempStyle,
          `${item.isFoucs ? `${style.animation} ${style.hasBG}` : ''} ${
            item.type === 'symbol' ? style.symbolStyle : ''
          }`,
        )}
        data-name={item.name}
        onClick={() => {
          selectExpression(key);
        }}
        key={item.markingIds}
      >
        {item.name}
      </em>
    );
  });

  const expressionValueOnChange = (value) => {
    setExValue(value);
  };

  // 金额input值改变
  const amountOnChange = (value) => {
    setAmount(value);
  };

  // 值变化
  const expressionValueBox = () => {
    if (inputType === '1' && !drowDownIsShowIcon) {
      return (
        <span className={classnames(style.selectDept, style.oaFlb, 'oa-pr')}>
          <ChooseBox
            tipName="选择"
            data={deptList}
            tags={conditionApprover}
            onChange={getExpressionValue}
            searchResultIsPhoto
            isSingleSelectAndNoShowTipname
            multiple={false}
          />
          <DownOutlined
            style={{ color: '#6b6b6b', position: 'absolute', right: '8px', top: '15px' }}
          />
        </span>
      );
    }
    if (inputType === '2' && !drowDownIsShowIcon) {
      return (
        <span className={classnames(style.oaFlb, 'oa-pr', style.paddingZero)}>
          <Select placeholder="选择" value={exValue} onChange={expressionValueOnChange}>
            {elecTypeList.map((item) => (
              <Option key={item.id || item.cID} value={item.name || item.cName}>
                {item.name || item.cName}
              </Option>
            ))}
          </Select>
        </span>
      );
    }
    if (inputType === '3' && !drowDownIsShowIcon && getUrlParams().formType !== '1') {
      return (
        <span className={classnames(style.oaFlb, 'oa-pr')}>
          <InputNumber
            className={classnames(style.inputAmout)}
            min={1}
            max={100000000}
            step={1}
            defaultValue={null}
            onChange={amountOnChange}
            placeholder="请输入金额"
          />
        </span>
      );
    }
    if (inputType === '3' && !drowDownIsShowIcon && getUrlParams().formType === '1') {
      return (
        <span className={classnames(style.oaFlb, 'oa-pr')}>
          <InputNumber
            className={classnames(style.inputAmout)}
            min={1}
            max={999.9}
            step={1}
            defaultValue={null}
            onChange={amountOnChange}
            placeholder="输入时间(天)"
          />
        </span>
      );
    }
    if (inputType === '3' && drowDownIsShowIcon && getUrlParams().formType !== '1') {
      return <span className={classnames(style.expressionValue, style.oaFlb)}>请输入金额</span>;
    }
    if (inputType === '3' && drowDownIsShowIcon && getUrlParams().formType === '1') {
      return <span className={classnames(style.expressionValue, style.oaFlb)}>输入时间(天)</span>;
    }
    return (
      <span className={classnames(style.expressionValue, style.oaFlb)}>
        选择
        <DownOutlined style={{ color: '#ccc' }} className={classnames(style.expressionValueIcon)} />
      </span>
    );
  };

  return (
    <>
      <div className={classnames(style.expressionBox)}>{expressionStrings}</div>
      <div className={classnames(style.expressionSymbolBox, 'oa-clearfix')}>
        {exSymbol}
        <Tooltip
          placement="bottom"
          overlayClassName={classnames(style.expression, 'backgrounIsWhite')}
          title={
            <div className={classnames(style.tipBox)}>
              且：“且”连接的两个子表达式意思是左右两个子表达式需要同时满足。
              <br />
              或：“或”连接的两个子表达式意思是左右两个子表达式需要仅满足一个即可。
              <br />
              （）：表达式同时有“且”与“或”时，需要用括号判断运算符优先级，括号中的子式需要先满足。不加（）时先执行“且”，再执行“或”。
              <br />
              例1：（发起部门组=A 且 发起用户组=B） 或 发起职务=经理
              <br />
              满足此条件的单据有两种：1、发起人的部门属于部门组A，同时发起人属于用户组B；2、发起人的职务是经理。
              <br />
              例2：发起部门组=A 且 （发起用户组=B 或 发起职务=经理）
              <br />
              满足此条件的单据有两种：1、发起人的部门属于部门组A，同时发起人属于用户组B；2、发起人的部门属于部门组A，同时发起人的职务是经理。
            </div>
          }
        >
          <InfoCircleFilled
            style={{ fontSize: '12px', color: '#ccc', marginTop: '20px', cursor: 'pointer' }}
          />
        </Tooltip>
      </div>
      <div className={classnames(style.setExpressionBox)}>
        <div className={classnames(style.setExpressionTitle, 'oa-clearfix')}>
          <span className={classnames(style.oaFla)}>字段</span>
          <span className={classnames(style.oaFla)}>规则</span>
          <span className={classnames(style.oaFla)}>
            值
            {inputType === '2' && getUrlParams().formType === '1' && (
              <Tooltip
                placement="bottom"
                overlayClassName={classnames(style.backgrounIsWhite)}
                title={
                  <div className={classnames(style.tipBox)}>
                    请假事项包含的定义：
                    <br />
                    查询请假流程中每行明细中的请假事项是否包含条件中的选项，只要其中一行包含就符合包含的规则
                    <br />
                    请假事项不包含的定义：
                    <br />
                    查询请假流程中每行明细中的请假事项是否包含条件中的选项，每一行都不包含，才符合不包含的规则
                  </div>
                }
              >
                <InfoCircleFilled
                  style={{ fontSize: '12px', color: '#ccc', cursor: 'pointer', marginLeft: '6px' }}
                />
              </Tooltip>
            )}
          </span>
        </div>
        <div className={classnames(style.setExpressionContent, 'oa-clearfix', 'oa-pr')}>
          <span className={classnames(style.field, style.oaFlb)}>
            <Select
              onChange={onChangeField}
              placeholder="选择"
              className={!drowDownIsShowIcon ? 'visible-icon' : ''}
              dropdownClassName={classnames(style.dropDownMenu)}
              value={expressionField}
            >
              {optionList}
            </Select>
          </span>
          <span className={classnames(style.oaFlb, style.rule)}>
            <Select
              placeholder="选择"
              value={expressionRule}
              onChange={onRuleChange}
              dropdownClassName={classnames(style.dropDownMenu)}
              disabled={ruleSelectDisable}
            >
              {expressionRuleList}
            </Select>
          </span>
          {expressionValueBox()}
        </div>
      </div>
      <Button className={classnames('oa-mt20')} onClick={writeIntoExpressin}>
        写入
      </Button>
    </>
  );
};

Expression.propTypes = {
  expressionList: PropTypes.array,
  onChange: PropTypes.func,
  conditionApprover: PropTypes.array,
  dutyList: PropTypes.object,
  getChooseApprvalData: PropTypes.func,
  conditionField: PropTypes.array,
  elecTypeList: PropTypes.array,
};

Expression.defaultProps = {
  expressionList: [],
  onChange: () => undefined,
  conditionApprover: [],
  dutyList: {},
  getChooseApprvalData: () => undefined,
  conditionField: [],
  elecTypeList: [],
};

export default React.memo(Expression);
