import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BigSideBar = () => {
  const { isSideBarOpen } = useSelector((store) => store.user)
  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen
            ? 'sidebar-container '
            : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Link to='landing'>
              <Logo />
            </Link>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
