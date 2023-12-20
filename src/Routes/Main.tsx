import React, { useState } from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header';
import Container from '@mui/material/Container';

function Main() {
  const [mainView, setMainView] = useState<string>("");

  return (
    <div className='main'>
      <Nav />
      <Container fixed>
        <Header setMainView={setMainView} />
      </Container>
    </div>
  )
}

export default Main