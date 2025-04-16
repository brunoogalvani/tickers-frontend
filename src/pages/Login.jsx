import { useNavigate } from 'react-router-dom'

function Login() {
    
    const navigate = useNavigate()
    
    return (
        <>
            <div className='flex flex-col items-center'>
                <p>Página de Login não Feita</p>
                <button onClick={() => navigate('/')}>Voltar para Home</button>
            </div>
        </>
    )
}

export default Login