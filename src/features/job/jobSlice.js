import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createJobThunk } from './jobThunk'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  company: '',
  position: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    return createJobThunk('/jobs', job, thunkAPI)
  }
)
const jobSlice = createSlice({
  name: 'job',
  initialState,

  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      //clear the fields and persist the value of the jobLocation gotten from the user
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('job created successfully')
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { handleChange, clearValues } = jobSlice.actions
export default jobSlice.reducer
