import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import Loading from './Loading'
import { useEffect } from 'react'
import { getAllJobs } from '../features/allJobs/allJobsSlice'
const JobsContainer = () => {
  const { jobs, isLoading } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])
  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    )
  }
  if (jobs.length === 0) {
    return <h2>No jobs to display, keep applying</h2>
  }
  return (
    <Wrapper>
      <h4>Jobs Info</h4>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer
