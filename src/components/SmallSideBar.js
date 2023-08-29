import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { toggleSidebar } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import NavLinks from './NavLinks'

const SmallSideBar = () => {
  const dispatch = useDispatch()
  const { isSideBarOpen } = useSelector((store) => store.user)

  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <h3
              style={{
                marginRight: '5px',
                fontWeight: 'bolder',
                letterSpacing: '0.25rem',
              }}
            >
              JOBLANE
            </h3>
          </header>
          <NavLinks toggleSideBar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar
