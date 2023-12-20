import React, { useState } from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header';
import Sum from '../components/Sum';
import Container from '@mui/material/Container';
import * as mainViews from "../constants/mainViewStrings";

function Main() {
  const [mainView, setMainView] = useState<string>(mainViews.sumView);

  return (
    <div className='main'>
      <Nav />
      <Container fixed>
        <Header setMainView={setMainView} />
        <h2 className="main__amount">Suma pieniędzy: 200 zł</h2>
        {mainView === mainViews.sumView && <Sum />}
      </Container>
    </div>
  )
}

export default Main