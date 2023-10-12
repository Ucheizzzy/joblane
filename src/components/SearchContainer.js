import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice'
import { useState, useMemo } from 'react'
const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs)

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)
  const [localSearch, setLocalSearch] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    if (isLoading) return
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }

  const debounce = () => {
    let timeoutID
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      }, 1000)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }
  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Trying to remember a job? Search for it..</h4>

        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button className='btn btn-block btn-danger' disabled={isLoading}>
            Clear Values
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
