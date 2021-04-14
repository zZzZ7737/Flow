/*
 * @Author: 郑寒颖
 * @Date: 2020-05-12 19:07:49
 * @LastEditors: 郑寒颖
 * @LastEditTime: 2020-05-12 19:54:08
 * @Description: file content
 */
export default function randomNumber(n) {
  function random() {
    // 生成10-12位不等的字符串
    return Number(
      Math.random()
        .toString()
        .substr(2),
    ).toString(36); // 转换成十六进制
  }
  const arr = [];
  function createId() {
    const num = random();
    let sbool = false;
    arr.forEach(v => {
      if (v === num) sbool = true;
    });
    if (sbool) {
      createId();
    } else {
      arr.push(num);
    }
  }
  let i = 0;
  while (i < n) {
    createId();
    i++;
  }
  return arr;
}
