import { Routes, Route } from 'react-router-dom';

import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from "./_root/pages";
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from './components/ui/ui/toaster';

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* Public Routes ->  pages that everybody will be able to see*/}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm />} />
              <Route path="/sign-up" element={<SignupForm />} />
            </Route>
            
            {/* Private Routes ->  pages that you will be able to see only if you're signed in*/}
            <Route element={<RootLayout />} >
              <Route index element={<Home />} />
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App
