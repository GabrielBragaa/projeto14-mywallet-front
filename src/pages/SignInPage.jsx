import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from 'axios';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let user = {
    email: '', 
    password: ''};
  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    user = {email, password};

    axios.post(`${import.meta.env.VITE_API_URL}/`, user)
    .then((detail) => {
      const token = detail.data[0].token;
      const name = detail.data[0].name;
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      navigate('/home');
    })
    .catch(err => alert(err.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo/>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} data-test="password" />
        <button data-test="sign-in-submit" >Entrar</button>
      </form>

      <Link to='/cadastro'>
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
