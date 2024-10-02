import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './components/Admin'
import Home from './components/Home'
import Layout from './components/Layout'
import { AuthProvider } from './components/AuthContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home/>} />
              <Route path="signup" element={<Signup/>} />
              <Route path="login" element={<Login/>} />
              <Route path="admin/dashboard" element={<Admin/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App
