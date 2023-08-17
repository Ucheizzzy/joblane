import { useState } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData
    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields')
      return
    }
    dispatch(updateUser({ name, email, lastName, location }))
  }
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Profile</h4>
        <div className='form-center'>
          <FormRow
            name='name'
            type='text'
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            name='email'
            type='email'
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            name='lastName'
            type='text'
            labelText='Last Name'
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            name='location'
            type='text'
            value={userData.location}
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-orange' disabled={isLoading}>
            {isLoading ? 'Please wait' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
