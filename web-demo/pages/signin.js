import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import gql from 'graphql-tag'
import {
  Form, Input, Button, Row, Col, Modal, Divider,
} from 'antd'
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

const MUTATION_SIGN_IN = gql`
  mutation MutationSignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignIn() {
  const client = useApolloClient()
  const [signIn] = useMutation(MUTATION_SIGN_IN)
  const router = useRouter()

  async function onFinish(valueList) {
    console.log('valueList', valueList)
    const { email, password } = valueList

    try {
      await client.resetStore()
      const { data } = await signIn({
        variables: {
          email,
          password,
        },
      })
      const { user } = data.signIn
      if (user) {
        await router.push('/')
      }
    } catch (error) {
      Modal.error({ title: getErrorMessage(error) })
    }
  }

  return (
    <>
      <Row>
        <Col offset={formItemLayout.labelCol.span}>
          <h1>Sign In</h1>
        </Col>
      </Row>
      <Form
        name="signup-form"
        initialValues={{
          remember: true,
        }}
        {...formItemLayout}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: <div id="signin-form-email-error-notvalidlabel">The input is not valid E-mail!</div>,
            },
            {
              required: true,
              message: <div id="signin-form-email-error-requiredlabel">Please input your email!</div>,
            },
          ]}
        >
          <Input id="signin-form-email-input" autoComplete="email" />
        </Form.Item>

        <Form.Item
          id="signin-form-password"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: <div id="signin-form-password-error-requiredlabel">Please input your password!</div>,
            },
          ]}
        >
          <Input.Password id="signin-form-password-input" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button id="signin-form-submit-button" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col offset={formItemLayout.labelCol.span}>
          <Divider plain>or</Divider>
          <Link href="signup">
            <Button id="signin-singup-button" type="dashed">Register now</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default SignIn
