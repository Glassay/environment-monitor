import React from 'react';
import {
  Form,
  Input,
  Button,
  Divider
} from 'antd';

const FormItem = Form.Item;

export default class Users extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, min: 6, message: '请输入最少六位密码!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('realName', {
              rules: [{ required: true, message: '请输入真实姓名!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="真实姓名" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('role', {
              rules: [{ required: true, message: '请输入用户角色信息！'}]
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="角色信息" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '40px' }}
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

Users = Form.create({})(Users);
