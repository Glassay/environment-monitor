import React from 'react';
import { Select, DatePicker, Button, Divider } from 'antd';

import styles from './Status.less';

const Option = Select.Option;

export default class Analyze extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <div className={styles.bgColor}>
          <div
            style={{
              marginTop: 17,
              marginLeft: 40
            }}
          >
            <span>区域：</span>
            <Select defaultValue="河北省" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </div>
          <div
            style={{
              marginTop: 17,
              marginLeft: 40
            }}
          >
            <span>公司</span>
            <Select defaultValue="河北申科电子股份有限公司" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </div>
          <div
            style={{
              marginTop: 17,
              marginLeft: 40
            }}
          >
            <span>生产设备：</span>
            <Select defaultValue="3#楼二楼(0003)" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </div>
          <div
            style={{
              marginTop: 17,
              marginLeft: 40
            }}
          >
            <span>日期：</span>
            <DatePicker />
          </div>
          <Button style={{ marginLeft: 100, marginTop: 20 }} type="primary">查询</Button>
        </div>
        <Divider />
      </div>
    );
  }
}
