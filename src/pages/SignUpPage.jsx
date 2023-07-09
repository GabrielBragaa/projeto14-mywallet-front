import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from 'axios';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [user, setUser] = useState({
    name,
    email,
    password
  })

  function signUp(e) {
    e.preventDefault();
    
    if (confPass !== password) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!name || !email || !password || !confPass) {
      alert('Preencha todos os campos!');
      return;
    }

    setUser({name, email, password});

    axios.post("http://localhost:5000/cadastro", user)
    .then(console.log('OK'))
    .catch(err => alert(err.response.data));

  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={confPass} onChange={e => setConfPass(e.target.value)} />
        <button>Cadastrar</button>
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
