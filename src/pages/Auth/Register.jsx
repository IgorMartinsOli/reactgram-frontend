import "./Auth.css"

//components
import { Link } from "react-router-dom"
import Message from "../../components/Message"

//hooks
import { useState, useEffect } from "react"

//redux
import {register, reset } from "../../slices/authSlice"
import {useDispatch, useSelector} from "react-redux"

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch(); 
    const {loading, error, success} = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        dispatch(register(user));
    }

    //clean all auth states
    useEffect(() => {
        return () => {
            dispatch(reset());
        }
    }, [dispatch])

    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">Cadastres-se para ver as fotos dos seus amigos</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ''}/>
                <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ''}/>
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ''}/>
                <input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ''}/>
                {!loading && <button type="submit">Cadastre-se</button>}
                {loading && <button disabled type="submit">Carregando...</button>}
                {error && <Message message={error} type="error"/>}
            </form>
            <p>Já tem conta? <Link to='/login'>Clique aqui</Link></p>
        </div>
    )
}

export default Register