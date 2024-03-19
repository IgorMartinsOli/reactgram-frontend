import "./Auth.css"

//components
import { Link } from "react-router-dom"

//hooks
import { useState, useEffect } from "react"

const handleSubmit = (e) => {
    e.preventDefault()
    console.log('clicou');
}

const Register = () => {
    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">Cadastres-se para ver as fotos dos seus amigos</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome"/>
                <input type="email" placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <input type="password" placeholder="Confirme a senha"/>
                <input type="submit" value='Cadastrar'/>
            </form>
            <p>Já tem conta? <Link to='/login'>Clique aqui</Link></p>
        </div>
    )
}

export default Register