import React from 'react';
import {
  DatePicker,
  Button,
  Divider,
  Form,
  Cascader
} from 'antd';

import companyName from '../assets/data/companyName';
import provinces from '../assets/data/provinces';
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
        // const value = {
        //   name: values.name,
        //   sex: values.sex,
        //   age: +values.age,
        //   IDnumber: values.IDnumber,
        //   address: values.address,
        //   area: values.area[0] + values.area[1]
        // }
        console.log('Received values of form: ', values);
        // this.props.dispatch({
        //   type: 'population/insertData',
        //   payload: value,
        // })
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
              // rules: [{ required: true, message: '请输入姓名!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={provinces} placeholder="选择区域" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('companyName', {
              // rules: [{ required: true, message: '请输入年龄!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={companyName} placeholder="选择公司名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('sex', {
              // rules: [{ required: true, message: '请选择性别!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={devices} placeholder="选择设备名" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('date', {
              // rules: [{ required: true,  message: '请输入正确的身份证号！'}]
            })(
              <DatePicker style={{ marginLeft: '40px' }} onChange={this.dateChange} />
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
