import React from 'react';
import { Select, DatePicker, Button, Divider, Table } from 'antd';

import styles from './Status.less';

const Option = Select.Option;

export default class Query extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const columns = [{
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '设备名称：',
      dataIndex: 'machineName',
      key: 'machineName',
    }, {
      title: '数据时间',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: 'A电流',
      dataIndex: 'aElectric',
      key: 'aElectric',
    }, {
      title: 'B电流',
      dataIndex: 'bElectric',
      key: 'bElectric',
    }, {
      title: 'C电流',
      dataIndex: 'cElectric',
      key: 'cElectric',
    }, {
      title: 'D电流',
      dataIndex: 'dElectric',
      key: 'dElectric',
    }];
    const data = [{
      key: '1',
      name: '河北申科电子股份有限公司',
      machineName: '3#楼二楼(0003)',
      date: '2018-05-09 10:45:00',
      aElectric: '0.058',
      bElectric: '0.18J',
      cElectric: '0.154',
      dElectric: '2/0',
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
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
