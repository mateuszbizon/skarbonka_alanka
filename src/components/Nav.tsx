import React from 'react'
import { useAuth } from '../context/AuthContext';

interface NavProps {
  setLoginModalActive: (loginModalActive: boolean) => void
  setNewPersonModalActive: (newPersonModalActive: boolean) => void
}

function Nav({ setLoginModalActive, setNewPersonModalActive }: NavProps) {
  const { user, logOut } = useAuth();

  function handleSetLoginModal() {
    setLoginModalActive(true);
  }

  function handleSetNewPersonModal() {
    setNewPersonModalActive(true)
  }

  function handleLogOut() {
    logOut();
  }

  return (
    <nav className='nav'>
        {user ? (
          <>
            <button className='nav__btn-circle' onClick={handleLogOut}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
            <button className='nav__btn' onClick={handleLogOut}>
              Wyloguj się
            </button>
          </>
        ) : (
          <>
            <button className='nav__btn-circle' onClick={handleSetLoginModal}>
              <i className="fa-solid fa-right-to-bracket" aria-label='zaloguj się'></i>
            </button>
            <button className='nav__btn' onClick={handleSetLoginModal}>
                Zaloguj się
            </button>
          </>
        )}
        {user && (
          <>
            <button className='nav__btn-circle' onClick={handleSetNewPersonModal}>
              <i className="fa-solid fa-plus" aria-label='dodaj nową osobę'></i>
            </button>
            <button className='nav__btn' onClick={handleSetNewPersonModal}>
                Dodaj nową osobę
            </button>
          </>
        )}
    </nav>
  )
}

export default Nav