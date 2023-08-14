import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Ops! We can't seem to find the page you are looking for.</h3>
        <Link to='/'>Back To Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
