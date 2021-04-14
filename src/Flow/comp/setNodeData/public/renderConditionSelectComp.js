/*
 * @Author: 郑寒颖
 * @Date: 2020-05-13 17:26:32
 * @LastEditors: 郑寒颖
 * @LastEditTime: 2020-05-22 17:31:58
 * @Description: file content
 */
import getPinyin from '@/components/relationShips/pinyin';

function renderSelectComp(dutyList, value) {
  // value sponsorDept-发起人部门；sponsorJob-发起人职务；sponsorUserGroup-发起人用户组；sponsorDeptGroup-发起人部门组
  if (value === 'sponsorDept') {
    const deptList = dutyList.dept.map((item) => {
      const list = item.list.map((i) => {
        return {
          type: 2,
          id: i.deptId,
          name: i.deptNm,
          searchName: getPinyin(i.deptNm) + i.deptNm,
        };
      });
      return {
        ...item,
        list,
      };
    });
    return {
      hasLetter: false,
      type: '部门',
      list: [...deptList],
    };
  }
  if (value === 'sponsorJob') {
    const postList = dutyList.post.map((item) => {
      const list = item.list.map((i) => {
        return {
          ...i,
          type: 5,
          name: i.postName,
          searchName: getPinyin(i.postName) + i.postName,
        };
      });
      return {
        ...item,
        list,
      };
    });
    return {
      hasLetter: false,
      type: '职务',
      list: [...postList],
    };
  }
  if (value === 'sponsorUserGroup') {
    const usergroupList = dutyList.usergroup.map((item) => {
      const list = item.list.map((i) => {
        return {
          ...i,
          type: 66,
          name: i.groupName,
          searchName: getPinyin(i.groupName) + i.groupName,
        };
      });
      return {
        ...item,
        list,
      };
    });
    return {
      hasLetter: false,
      type: '用户组',
      list: [...usergroupList],
    };
  }
  if (value === 'sponsorDeptGroup') {
    const deptList = dutyList.deptgroup.map((item) => {
      const list = item.list.map((i) => {
        return {
          ...i,
          type: 77,
          id: i.id,
          name: i.groupName,
          searchName: getPinyin(i.groupName) + i.groupName,
        };
      });
      return {
        ...item,
        list,
      };
    });
    return {
      hasLetter: false,
      type: '部门组',
      list: [...deptList],
    };
  }
  return {
    hasLetter: false,
    type: '部门',
    list: [],
  };
}

export default renderSelectComp;
