import { Link } from 'react-router-dom'
import joblane from '../assets/images/joblane.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Track your job application and never loose sight of it. Keep it and
            update it anytime, your job application deserves a good treatment..
          </p>
          <Link to='/register' className='btn btn-orange'>
            Login/Regoster
          </Link>
        </div>
        <img src={joblane} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
