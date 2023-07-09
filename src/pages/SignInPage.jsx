import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let user = {
    email: '', 
    password: ''};

  function signIn(e) {
    e.preventDefault();

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    user = {email, password};

    axios.post(`${import.meta.env.VITE_API_URL}/`, user)
    .then(console.log('OK'))
    .catch(err => alert(err.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo/>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Entrar</button>
      </form>

      <Link>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
