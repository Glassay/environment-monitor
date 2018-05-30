import React from 'react';
import {
  DatePicker,
  Button,
  Divider,
  Form,
  Cascader
} from 'antd';

import companyName from '../assets/data/companyName';
import province from '../assets/data/province';
import devices from '../assets/data/devices';

const FormItem = Form.Item;

class Analyze extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  dateChange = (value) => {
    console.log(value);
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
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
      </div>
    );
  }
}

Analyze = Form.create({})(Analyze);

export default Analyze;
