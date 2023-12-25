import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sum from '../components/Sum';
import LoginModal from '../components/LoginModal';
import Container from '@mui/material/Container';
import { getAllPeople } from '../services/getData';
import { useNotification } from '../context/NotificationContext';
import { useAmountMoney } from '../context/AmountMoneyContext';
import * as messages from "../constants/messages";

function Main() {
  const [loginModalActive, setLoginModalActive] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<any[]>([])
  const { showErrorNotification } = useNotification();
  const { amountMoney, getPeopleList } = useAmountMoney();

  function handleGetAllPeople() {
    getAllPeople()
      .then(data => {
        const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
        console.log(filteredData)
        setPeopleList(filteredData)
        getPeopleList(filteredData)
      })
      .catch(error => {
        showErrorNotification(messages.getAllPeopleFail)
      })
  }

  useEffect(() => {
    handleGetAllPeople();
  }, [])

  return (
    <div className='main'>
      <Nav setLoginModalActive={setLoginModalActive} />
      <LoginModal loginModalActive={loginModalActive} setLoginModalActive={setLoginModalActive} />
      <Container fixed>
        <h1 className="main__title">Skarbonka Alanka</h1>
        <h2 className="main__amount">Suma pieniędzy: {amountMoney} zł</h2>
        <Sum peopleList={peopleList} />
      </Container>
    </div>
  )
}

export default Main