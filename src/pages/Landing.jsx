import { Link } from 'react-router-dom'
import joblane from '../assets/images/joblane.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { useSelector } from 'react-redux'
const Landing = () => {
  const { user } = useSelector((store) => store.user)
  return (
    <Wrapper>
      <nav>
        <h3
          style={{
            marginRight: '5px',
            fontWeight: 'bolder',
            letterSpacing: '0.25rem',
          }}
        >
          JOBLANE
        </h3>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Track your job application and never loose sight of it. Keep it and
            update it anytime, your job application deserves a good reference..
          </p>
          <Link to={user ? '/' : '/register'} className='btn btn-orange'>
            {user ? 'Dashboard' : 'Login/Regoster'}
          </Link>
        </div>
        <img src={joblane} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
