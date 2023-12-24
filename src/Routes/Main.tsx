import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header';
import Sum from '../components/Sum';
import LoginModal from '../components/LoginModal';
import Container from '@mui/material/Container';
import * as mainViews from "../constants/mainViewStrings";
import { getAllPeople } from '../services/getData';
import { useNotification } from '../context/NotificationContext';
import { useAmountMoney } from '../context/AmountMoneyContext';
import * as messages from "../constants/messages";

function Main() {
  const [mainView, setMainView] = useState<string>(mainViews.sumView);
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
        <Header setMainView={setMainView} />
        <h2 className="main__amount">Suma pieniędzy: {amountMoney} zł</h2>
        {mainView === mainViews.sumView && <Sum peopleList={peopleList} />}
      </Container>
    </div>
  )
}

export default Main