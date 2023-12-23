import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import { updatePersonAmount } from '../services/update'
import * as messages from "../constants/messages"

interface SumItemProps {
    person: any
}

function SumItem({ person }: SumItemProps) {
    const [updatedPerson, setUpdatedPerson] = useState<any>(person)
    const { user } = useAuth();
    const { showErrorNotification } = useNotification();

    function handleUpdatePersonAmount(personId: string, personOldAmount: number, personNewAmount: number) {
        let newAmount = personOldAmount + personNewAmount

        updatePersonAmount(personId, newAmount)
            .then(() => {
                setUpdatedPerson({ ...updatedPerson, amount: newAmount })
            })
            .catch(error => {
                showErrorNotification(messages.updatePersonFail)
            })
    }

  return (
    <div className="sum__item">
        <p className='sum__item-name'>{person.name}</p>
        <p className='sum__item-amount'>{updatedPerson.amount} zł</p>
        {user && (
            <div className="sum__item-btns-row">
                <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, 2)}>+2</button>
                <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, 5)}>+5</button>
                {updatedPerson.amount >= 2 && (
                    <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, -2)}>-2</button>                          
                )}
                {updatedPerson.amount >= 5 && (
                    <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, -5)}>-5</button>  
                )}
            </div>
        )}
    </div>
  )
}

export default SumItem