import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa'
import Logo from './Logo'
import { logoutUser, toggleSidebar } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
const Navbar = () => {
  const { user } = useSelector((store) => store.user)
  const [showLogout, setShowLogout] = useState(false)
  const dispatch = useDispatch()
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <h3>JOBLANE</h3>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn btn-orange'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'show-dropdown dropdown' : 'dropdown'}>
            <button
              className='dropdown-btn'
              type='button'
              onClick={() => {
                dispatch(logoutUser(`Logging out.. See you soon. ${user.name}`))
                setShowLogout(!showLogout)
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
