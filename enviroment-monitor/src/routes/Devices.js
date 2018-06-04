import React from 'react';
import {
  Form,
  Input,
  Button,
  Divider
} from 'antd';

const FormItem = Form.Item;

export default class Devices extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('deviceID', {
              rules: [{ required: true, message: '请输入设备ID!' }],
            })(
              <Input placeholder="设备ID" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('setupDate', {
              rules: [{ required: true, message: '请输入建立时间!' }],
            })(
              <Input placeholder="建立时间" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('deviceName', {
              rules: [{ required: true, message: '请输入设备名称!' }],
            })(
              <Input placeholder="设备名称" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('deivsionID', {
              rules: [{ required: true, message: '请输入devisionID！'}]
            })(
              <Input placeholder="devisionID" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('deivceAddr', {
              rules: [{ required: true, message: '请输入设备地址！'}]
            })(
              <Input placeholder="设备地址" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: '请输入所属公司名！'}]
            })(
              <Input placeholder="所属公司" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('deviceType', {
              rules: [{ required: true, message: '请输入设备类型！'}]
            })(
              <Input placeholder="设备类型" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              添加
            </Button>
          </FormItem>
        </Form>
        <Divider />
      </div>
    );
  }
}

Devices = Form.create({})(Devices);
