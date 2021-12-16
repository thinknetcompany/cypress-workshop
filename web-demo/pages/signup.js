import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Form, Input, Button, Upload, Row, Col, Modal, Divider, message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import { getErrorMessage } from '../lib/form'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 8,
  },
}

const MUTATION_SIGN_UP = gql`
  mutation MutationSignUp($email: String!, $password: String!, $nickname: String, $avatar: Base64) {
    signUp(input: { email: $email, password: $password, nickname: $nickname, avatar: $avatar }) {
      user {
        id
        email
        nickname
      }
    }
  }
`

function SignUp() {
  const client = useApolloClient()
  const [signUp] = useMutation(MUTATION_SIGN_UP)
  const router = useRouter()

  const onFinish = useCallback(async (valueList) => {
    console.log('valueList', valueList)
    const {
      email, password, nickname, upload,
    } = valueList
    const file = upload?.[0]?.originFileObj
    const reader = new FileReader()
    try {
      const base64File = !file ? null : await new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
          resolve(reader.result)
        }, false)

        if (file) {
          reader.readAsDataURL(file)
        } else {
          reject('EMPTY_FILE')
        }
      })

      await signUp({
        variables: {
          email,
          password,
          nickname,
          avatar: base64File,
        },
      })

      await client.resetStore()
      await router.push('/')
    } catch (error) {
      Modal.error({ title: getErrorMessage(error) })
    }
  }, [router])
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const normFile = useCallback((event) => {
    const type = event.file?.type
    if (!/^image\//.test(type)) {
      message.error('You can only upload JPG/PNG file!')
      return []
    }

    return event.fileList?.slice?.(event.fileList.length - 1, event.fileList.length) || []
  })

  return (
    <>
      <Row>
        <Col offset={formItemLayout.labelCol.span}>
          <h1>Sign Up</h1>
        </Col>
      </Row>
      <Form
        name="signup-form"
        initialValues={{
          remember: true,
        }}
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: <div id="signup-form-email-error-notvalidlabel">The input is not valid E-mail!</div>,
            },
            {
              required: true,
              message: <div id="signup-form-email-error-requiredlabel">Please input your email!</div>,
            },
          ]}
        >
          <Input autoComplete="email" id="signup-form-email-input" />
        </Form.Item>

        <Form.Item
          label="Nickname"
          name="nickname"
        >
          <Input id="signup-form-nickname-input" />
        </Form.Item>

        <Form.Item
          id="signup-form-password"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: <div id="signup-form-password-error-requiredlabel">Please input your password!</div>,
            },
          ]}
        >
          <Input.Password id="signup-form-password-input" />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          listType="picture-card"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            accept="image/*"
            name="avatar"
            listType="picture"
          >
            <Button id="signup-form-avatar-input">
              <PlusOutlined />
              {' '}
              Click to upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button id="signup-form-submit-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col offset={formItemLayout.labelCol.span}>
          <Divider plain>or</Divider>
          <Link href="signin">
            <Button id="signup-singin-button" type="dashed">Sign in</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default SignUp
