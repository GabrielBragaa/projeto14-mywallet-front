import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage() {
  
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const owner = localStorage.getItem("email");
  let headers = {'Authorization': `Bearer ${token}`};
  let [transactions, setTransactions] = useState([{}]);

  useEffect(() => {
    headers = {'Authorization': `Bearer ${token}`};
    axios.get(`${import.meta.env.VITE_API_URL}/home`, {headers: headers})
    .then(list => {
      list.data.map(t => {
        transactions.push(t);
        setTransactions(transactions);
      })
    })
  }, [])

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name" >Olá, {userName}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
        {transactions.map(item => console.log(transactions))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to='/nova-transacao/entrada' data-test='new-income' >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </Link>
        <Link to='/nova-transacao/saida' data-test='new-expense' >
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`