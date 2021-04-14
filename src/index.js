import React from "react";
import ReactDOM from "react-dom";
import Flow from "./Flow/view";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./static.css";

moment.locale("zh-cn");

ReactDOM.render(
  <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
    <Flow />
  </ConfigProvider>,
  document.getElementById("root")
);
