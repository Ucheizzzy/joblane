import customFetch from '../../utils/axios'
import { clearAllJobsState } from '../allJobs/allJobsSlice'
import { clearValues } from '../job/jobSlice'
import { logoutUser } from './userSlice'

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    //in this thunkAPI we have access to dispatch to actions, also to getAState to get the initial states states and also rejectwithBalue for errors
    // console.log(thunkAPI)
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return resp.data
    // console.log(thunkAPI.getState().user.user.token)
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
    // console.log(error.response)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logout User
    thunkAPI.dispatch(logoutUser(message))
    //clear job input values
    thunkAPI.dispatch(clearAllJobsState())
    // clear job input values
    thunkAPI.dispatch(clearValues())
    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}
