import React from 'react'
import * as mainViews from "../constants/mainViewStrings";

interface HeaderProps {
    setMainView: (viewName: string) => void;
}

function Header({ setMainView }: HeaderProps) {
    function handleSetMainView(viewName: string) {
        setMainView(viewName);
    }

  return (
    <header className='header'>
        <h1 className='header__title'>Skarbonka Alanka</h1>
        <div className="header__btns-row">
            <button className='header__btn' onClick={() => handleSetMainView(mainViews.sumView)}>Suma</button>
            <button className='header__btn' onClick={() => handleSetMainView(mainViews.debtView)}>Długi</button>
        </div>
    </header>
  )
}

export default Header