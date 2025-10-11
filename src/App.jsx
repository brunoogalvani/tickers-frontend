import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Promoter from './pages/Promoter.jsx'
import PaginaUsuario from './pages/PaginaUsuario.jsx'
import Admin from './pages/Admin.jsx'
import Eventos from './pages/Eventos.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Evento from './pages/Evento.jsx'
function App() {

  return (
    <Router>
      <Routes>
          <Route path='/pagina-usuario' element={<PaginaUsuario />}></Route>
          <Route path='/register' element={<Register />}></Route>        
          <Route index element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/promoter' element={<Promoter />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/eventos' element={<Eventos />}></Route>
          <Route path='/Carrinho' element={<Carrinho />}></Route>
          <Route path='/evento/:idEvento' element={<Evento />}></Route>
      </Routes>
    </Router>
  )
}

export default App
