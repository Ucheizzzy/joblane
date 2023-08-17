import Wrapper from '../../assets/wrappers/SharedLayout'
import { Outlet } from 'react-router-dom'
import { SmallSideBar, BigSideBar, Navbar } from '../../components'
const SharedLayouts = () => {
  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  )
}

export default SharedLayouts
