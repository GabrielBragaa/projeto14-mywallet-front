import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  let token = localStorage.getItem("token");
  let headers = {'Authorization': `Bearer ${token}`};
  let body = {value: 0, description: ''};
  let params = (location.pathname).substring(16);
  const navigate = useNavigate();

  useEffect(() => {
    token = localStorage.getItem("token");
    headers = {'Authorization': `Bearer ${token}`};
  }, [])

  function submit(e) {
    e.preventDefault();
    
    if (!value || value <= 0) {
      return alert('O valor tem que ser maior do que zero.');
    }

    if (!description) {
      return alert('Preencha a descrição.')
    }

    body = {value, description};

    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${params}`, body, {headers: headers})
    .then(() => {
      console.log('OK')
      navigate('/home')
    })
    .catch((err) => console.log(err));

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={submit}>
        <input placeholder="Valor" type='number' value={value} onChange={e => setValue(e.target.value)} data-test='registry-amount-input' />
        <input placeholder="Descrição" type="text" value={description} onChange={e => setDescription(e.target.value)} data-test='registry-name-input' />
        <button data-test='registry-save' >Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
