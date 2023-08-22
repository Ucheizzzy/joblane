import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import FormRow from '../../components/FormRow'
import FormRowSelect from '../../components/FormRowSelect'
import { toast } from 'react-toastify'
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from '../../features/job/jobSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AddJob = () => {
  const navigate = useNavigate()
  // const[position, company, jobLocation, jobType] = userState()
  const dispatch = useDispatch()
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job)

  const { user } = useSelector((store) => store.user)

  useEffect(() => {
    if (!isEditing) {
      //assign values of the location of the user to the jobLocation field
      dispatch(handleChange({ name: 'jobLocation', value: user.location }))
    }
  }, [])
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields')
      return
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            status,
            position,
            company,
            jobLocation,
            jobType,
          },
        })
      )
      navigate('/all-jobs')
      return
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }))
    navigate('/all-jobs')
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>{isEditing ? 'Edit Job' : 'Add Job'} </h4>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='Job Location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            labelText='Job Status'
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            labelText='Job Type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className='btn-container'>
            <button
              style={{ backgroundColor: 'red' }}
              className='btn'
              type='button'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-orange'
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
