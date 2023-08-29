import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
export const getAllJobsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs', {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
