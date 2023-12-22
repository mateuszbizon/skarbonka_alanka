import React from 'react'
import { useAuth } from '../context/AuthContext'

interface SumProps {
    peopleList: any[]
}

function Sum({ peopleList }: SumProps) {
    const { user } = useAuth();

  return (
    <div className='sum'>
        {peopleList.map((person, index) => (
            <div key={index} className="sum__item">
                <p className='sum__item-name'>{person.name}</p>
                <p className='sum__item-amount'>{person.amount} zł</p>
                {user && (
                    <div className="sum__item-btns-row">
                        <button className='sum__item-btn'>+2</button>
                        <button className='sum__item-btn'>+5</button>
                        {person.amount >= 2 && (
                            <button className='sum__item-btn'>-2</button>                          
                        )}
                        {person.amount >= 5 && (
                            <button className='sum__item-btn'>-5</button>  
                        )}
                    </div>
                )}
            </div>
        ))}
    </div>
  )
}

export default Sum