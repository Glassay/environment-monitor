import React from 'react';
import { Select, DatePicker, Button, Divider, Table } from 'antd';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import { DataSet } from '@antv/data-set';

import styles from './Status.less';

const Option = Select.Option;

export default class Status extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const { DataView } = DataSet;
    const statusData = [
      { item: '异常', count: 50 },
      { item: '正常', count: 50 },
    ];

    const dv = new DataView();

    dv.source(statusData).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });

    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    }
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
    },{
      key: '2',
      name: '河北申科电子股份有限公司',
      area: '小辛庄乡工业园区',
      date: '2018-05-09 10:45:00',
      type: '焦化',
      status: '异常',
    }, {
      key: '3',
      name: '河北申科电子股份有限公司',
      area: '小辛庄乡工业园区',
      date: '2018-05-09 10:45:00',
      type: '焦化',
      status: '异常',
    }, {
      key: '4',
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
        <Chart height={window.innerHeight / 2} data={dv} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
          <Coord type='theta' radius={0.75} />
          <Axis name="percent" />
          <Legend position='left' offsetY={-window.innerHeight / 2 + 220} offsetX={250} />
          <Tooltip 
            showTitle={false} 
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
          <Geom
            type="intervalStack"
            position="percent"
            // color='item'
            color={['item', ['#fa4659', '#65eeb7']]}
            tooltip={['item*percent',(item, percent) => {
              percent = percent * 100 + '%';
              return {
                name: item,
                value: percent
              };
            }]}
            style={{ lineWidth: 1, stroke: '#fff'}}
            >
            <Label content='percent' formatter={(val, item) => {
                return item.point.item + ': ' + val;}} />
          </Geom>
        </Chart>
        <Table columns={columns} dataSource={data} />
        <div
          style={{
            position: 'relative',
            right: '-1200px',
            top: '-600px'
          }}
        >
          <div>
            <span>总计：</span>
            <span>6家</span>
          </div>
          <div>
            <span>设备数：</span>
            <span>17台</span>
          </div>
          <div>
            <span>正常：</span>
            <span>3家</span>
          </div>
          <div>
            <span>异常：</span>
            <span>3家</span>
          </div>
        </div>
      </div>
    );
  }
}
