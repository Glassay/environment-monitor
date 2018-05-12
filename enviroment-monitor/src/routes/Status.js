import React from 'react';
import { Select, DatePicker, Button, Divider, Table } from 'antd';

import styles from './Status.less';

const Option = Select.Option;

export default class Status extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const columns = [{
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属区域',
      dataIndex: 'area',
      key: 'area',
    }, {
      title: '异常日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '行业类别',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
    const data = [{
      key: '1',
      name: '河北申科电子股份有限公司',
      area: '小辛庄乡工业园区',
      date: '2018-05-09 10:45:00',
      type: '焦化',
      status: '异常',
    }]
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <div className={styles.bgColor}>
          <div
            style={{
              marginTop: 17,
              marginLeft: 40
            }}
          >
            <span>图表类型：</span>
            <Select defaultValue="设备状态" style={{ width: 120 }} onChange={this.handleChange}>
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
            <span>行业类型：</span>
            <Select defaultValue="全部" style={{ width: 120 }} onChange={this.handleChange}>
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
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
