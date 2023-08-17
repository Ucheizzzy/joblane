import { Landing, Error, Register, ProtectedRoutes } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayouts,
  Stats,
} from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoutes>
              <SharedLayouts />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Stats />} />
          <Route path='profile' element={<Profile />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
        </Route>

        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='error' element={<Error />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
