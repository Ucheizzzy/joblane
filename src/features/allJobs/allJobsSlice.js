import { createSlice } from '@reduxjs/toolkit'

const initialFilterState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOption: ['latest', 'oldest', 'a-z', 'z-a'],
}
const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  pages: 1,
  state: {},
  monthlyApplication: [],
  ...initialFilterState,
}
const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
})

export default allJobsSlice.reducer
