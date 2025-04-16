import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
      </Routes>
    </Router>
  )
}

export default App
