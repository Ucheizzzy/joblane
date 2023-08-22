import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createJobThunk } from './jobThunk'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import customFetch from '../../utils/axios'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'

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

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      thunkAPI.dispatch(getAllJobs())
      return resp.data.msg
    } catch (error) {
      thunkAPI.dispatch(hideLoading())
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
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
    setEditJob: (state, { payload }) => {
      return { ...state, ...payload, isEditing: true }
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
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload)
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload)
      })
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions
export default jobSlice.reducer
