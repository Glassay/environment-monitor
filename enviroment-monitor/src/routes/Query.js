import React from 'react';
import { connect } from 'dva';
import {
  DatePicker,
  Button,
  Divider,
  Table,
  Form,
  Cascader
} from 'antd';
import moment from 'moment';

import companyName from '../assets/data/companyName';
import province from '../assets/data/province';
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
          area: values.province[0],
          name: values.companyName[0],
          device: values.device[0],
          data_time: '2018-05-29'
        }
        console.log('Received values of form: ', value);
        this.props.dispatch({
          type: 'query/queryInfo',
          payload: value,
        })
      }
    });
  }
  render() {
    const { infos } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '设备名称',
      dataIndex: 'device',
      key: 'device',
    }, {
      title: '数据时间',
      dataIndex: 'created',
      key: 'created',
      render: text => moment(text).format('L')
    }, {
      title: 'A相电流',
      dataIndex: 'aa',
      key: 'aa',
    }, {
      title: 'B相电流',
      dataIndex: 'ab',
      key: 'ab',
    }, {
      title: 'C相电流',
      dataIndex: 'ac',
      key: 'ac',
    }, {
      title: 'A相电压',
      dataIndex: 'va',
      key: 'va',
    }, {
      title: 'B相电压',
      dataIndex: 'vb',
      key: 'vb',
    }, {
      title: 'C相电压',
      dataIndex: 'vc',
      key: 'vc',
    }, {
      title: 'A相电量(kW-h)',
      dataIndex: 'wa',
      key: 'wa',
    }, {
      title: 'B相电量(kW-h)',
      dataIndex: 'wb',
      key: 'wb',
    }, {
      title: 'C相电量(kW-h)',
      dataIndex: 'wc',
      key: 'wc',
    }];
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('province', {
              rules: [{ required: true, message: '请选择省份!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={province} placeholder="选择区域" />
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
            {getFieldDecorator('device', {
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
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={infos.data}
        />
      </div>
    );
  }
}

Query = Form.create({})(Query);

export default connect(state => ({
  infos: state.query.infos,
  loading: state.loading.models.population
}))(Query);
