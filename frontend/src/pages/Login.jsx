import React from 'react'
import Form from '../components/Form'
import Navbar from '../components/Navbar'

const Login = () => {
  return (
    <>
    <Navbar />
    <Form route="api/token/" method="login" />
    </>
  )
}

export default Login