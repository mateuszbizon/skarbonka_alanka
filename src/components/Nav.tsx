import React from 'react'

function Nav() {
  return (
    <nav className='nav'>
        <button className='nav__btn-circle'>
            <i className="fa-solid fa-right-to-bracket" aria-label='zaloguj się'></i>
        </button>
        <button className='nav__btn'>
            Zaloguj się
        </button>
    </nav>
  )
}

export default Nav