import React from 'react'

function Sum() {
  return (
    <div className='sum'>
        <div className="sum__item">
            <p className='sum__item-name'>Mama</p>
            <p className='sum__item-amount'>50 zł</p>
            <div className="sum__item-btns-row">
                <button className='sum__item-btn'>+2</button>
                <button className='sum__item-btn'>+5</button>
                <button className='sum__item-btn'>-2</button>
                <button className='sum__item-btn'>-5</button>
            </div>
        </div>
        <div className="sum__item">
            <p className='sum__item-name'>Babcia</p>
            <p className='sum__item-amount'>50 zł</p>
            <div className="sum__item-btns-row">
                <button className='sum__item-btn'>+2</button>
                <button className='sum__item-btn'>+5</button>
            </div>
        </div>
        <div className="sum__item">
            <p className='sum__item-name'>Dziadek</p>
            <p className='sum__item-amount'>50 zł</p>
            <div className="sum__item-btns-row">
                <button className='sum__item-btn'>+2</button>
                <button className='sum__item-btn'>+5</button>
            </div>
        </div>
        <div className="sum__item">
            <p className='sum__item-name'>Wujek</p>
            <p className='sum__item-amount'>50 zł</p>
            <div className="sum__item-btns-row">
                <button className='sum__item-btn'>+2</button>
                <button className='sum__item-btn'>+5</button>
            </div>
        </div>
    </div>
  )
}

export default Sum