import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from 'axios';


export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  let user = {
    name: '',
    email: '',
    password: ''
  }

  function signUp(e) {
    e.preventDefault();
  
    if (confPass !== password) {
      alert('As senhas não coincidem!');
      return;
    }

    user = {
      name, email, password
    }

    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, user)
    .then(console.log('OK'))
    .catch(err => alert(err.response.data));
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} data-test="name"  />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} data-test="password" />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" value={confPass} onChange={e => setConfPass(e.target.value)} data-test="conf-password" />
        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
