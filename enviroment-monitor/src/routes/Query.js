import React from 'react';
import {
  DatePicker,
  Button,
  Divider,
  Table,
  Form,
  Cascader
} from 'antd';

import companyName from '../assets/data/companyName';
import provinces from '../assets/data/provinces';
import devices from '../assets/data/devices';

const FormItem = Form.Item;

class Query extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const value = {
          area: values.area[0],
          name: values.name[0],
          device: values.device[0],
          data_time: values.date
        }
        console.log('Received values of form: ', value);
        // this.props.dispatch({
        //   type: 'population/insertData',
        //   payload: value,
        // })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('province', {
              rules: [{ required: true, message: '请选择省份!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={provinces} placeholder="选择区域" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: '请选择公司名!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={companyName} placeholder="选择公司名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: '请选择设备名!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={devices} placeholder="选择设备名" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('date', {
              rules: [{ required: true,  message: '请选择日期！'}]
            })(
              <DatePicker
                style={{ marginLeft: '40px' }}
                // onChange={this.dateChange}
                placeholder="选择日期"
              />
            )}
          </FormItem>
          <FormItem>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
          </FormItem>
        </Form>
        <Divider />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

Query = Form.create({})(Query);

export default Query;
