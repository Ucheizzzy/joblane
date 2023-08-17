import { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow, Logo } from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  }

  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((store) => store.user)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])
  const [values, setValues] = useState(initialState)
  const handleChange = (e) => {
    // console.log(e.target)
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    //destructure the value object
    const { name, email, isMember, password } = values
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill in all fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
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
        <button
          type='submit'
          className='btn btn-block btn-orange'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
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
