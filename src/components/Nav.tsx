import React from 'react'

interface NavProps {
  setLoginModalActive: (loginModalActive: boolean) => void
}

function Nav({ setLoginModalActive }: NavProps) {
  function handleSetLoginModal() {
    setLoginModalActive(true);
  }

  return (
    <nav className='nav'>
        <button className='nav__btn-circle' onClick={handleSetLoginModal}>
            <i className="fa-solid fa-right-to-bracket" aria-label='zaloguj się'></i>
        </button>
        <button className='nav__btn' onClick={handleSetLoginModal}>
            Zaloguj się
        </button>
    </nav>
  )
}

export default Nav