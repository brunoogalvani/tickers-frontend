import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'

function App() {

  return (
    <Router>
      <Routes>
          <Route path='/register' element={<Register />}></Route>        
          <Route index element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
      </Routes>
    </Router>
  )
}

export default App
