import React, {useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import { updatePersonAmount } from '../services/update'
import * as messages from "../constants/messages"
import TextField from "@mui/material/TextField";
import amountValidation from '../validations/amountValidation'

interface SumItemProps {
    person: any,
}

interface AmountErrors {
    amount: boolean,
    amountMessage: string
}

function SumItem({ person }: SumItemProps) {
    const [updatedPerson, setUpdatedPerson] = useState<any>(person)
    const [customAmountValue, setCustomAmountValue] = useState<string>("")
    const [errors, setErrors] = useState<Partial<AmountErrors>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useAuth();
    const { showErrorNotification } = useNotification();

    function handleUpdatePersonAmount(personId: string, personOldAmount: number, personNewAmount: number) {
        let newAmount = personOldAmount + personNewAmount

        setLoading(true)
        updatePersonAmount(personId, newAmount)
            .then(() => {
                setUpdatedPerson({ ...updatedPerson, amount: newAmount })
                setLoading(false)
            })
            .catch(error => {
                showErrorNotification(messages.updatePersonFail)
                setLoading(false)
            })
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCustomAmountValue(e.target.value)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrors(amountValidation(updatedPerson.amount, customAmountValue))
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && customAmountValue.length > 0) {
            handleUpdatePersonAmount(person.id, updatedPerson.amount, Number(customAmountValue))
        }
    }, [errors])

  return (
    <div className="sum__item">
        <p className='sum__item-name'>{person.name}</p>
        <p className='sum__item-amount'>{updatedPerson.amount} zł</p>
        {user && (
            <>
                <div className="sum__item-btns-row">
                    <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, 2)} disabled={loading}>+2</button>
                    <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, 5)} disabled={loading}>+5</button>
                    {updatedPerson.amount >= 2 && (
                        <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, -2)} disabled={loading}>-2</button>                          
                    )}
                    {updatedPerson.amount >= 5 && (
                        <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, updatedPerson.amount, -5)} disabled={loading}>-5</button>  
                    )}
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField 
                        type='number' 
                        label="Wartość niestandardowa" 
                        error={errors.amount} 
                        helperText={errors.amount && errors.amountMessage} 
                        value={customAmountValue} onChange={handleInputChange} 
                        fullWidth />
                    <button type='submit' className='sum__item-btn-submit' disabled={loading}>Zmień wartość</button>
                </form>
            </>
        )}
    </div>
  )
}

export default SumItem