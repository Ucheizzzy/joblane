import { useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow, Logo } from '../components'

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  }

  const [values, setValues] = useState(initialState)
  const handleChange = (e) => {
    // console.log(e.target)
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(values.name)
  }

  const toggleMemeber = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            name='name'
            type='text'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          name='email'
          type='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          name='password'
          type='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block btn-orange'>
          submit
        </button>

        <p>
          {values.isMember ? 'Not a memeber yet?' : 'Already a memeber'}
          <button className='member-btn' type='button' onClick={toggleMemeber}>
            {values.isMember ? 'Regster' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
