import { useState } from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/ui/Jobs'
import Browse from './components/ui/Browse'
import Profile from './components/ui/Profile'
import JobDescription from './components/ui/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<SignUp />
  },
  {
    path:'/jobs',
    element:<Jobs />
  },
  {
    path:'/browse',
    element:<Browse />
  },
  {
    path:'/profile',
    element:<Profile />
  },
  {
    path:'/description/:id',
    element:<JobDescription />
  },
  // admin routes
  {
    path:'/admin/companies',
    element: <Companies />
  },
  {
    path:'/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path:'/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path:'/admin/jobs',
    element: <AdminJobs />
  },
  {
    path:'/admin/jobs/create',
    element: <PostJobs />
  },
  {
    path:'/admin/jobs/:id/applicants',
    element: <Applicants />
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
