import React, {useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import { updatePersonAmount } from '../services/update'
import * as messages from "../constants/messages"
import TextField from "@mui/material/TextField";
import amountValidation from '../validations/amountValidation'
import { useNavigate } from 'react-router-dom'

interface SumItemProps {
    person: any,
}

interface AmountErrors {
    amount: boolean,
    amountMessage: string
}

function SumItem({ person }: SumItemProps) {
    const [amountDebt, setAmountDebt] = useState<number[]>(person.amountDebt)
    const [customAmountValue, setCustomAmountValue] = useState<string>("")
    const [errors, setErrors] = useState<Partial<AmountErrors>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useAuth();
    const { showErrorNotification, showNotification } = useNotification();
    const navigate = useNavigate()

    function handleUpdatePersonAmount(personId: string, personNewAmount: number) {
        amountDebt.push(personNewAmount)

        setLoading(true)
        updatePersonAmount(personId, amountDebt)
            .then(() => {
                showNotification(messages.addedAmountDebtSuccess)
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
        setErrors(amountValidation(customAmountValue))
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && customAmountValue.length > 0) {
            handleUpdatePersonAmount(person.id, Number(customAmountValue))
        }
    }, [errors])

  return (
    <div className="sum__item">
        <p className='sum__item-name'>{person.name}</p>
        <p className='sum__item-amount'>{person.amount} zł</p>
        {user && (
            <>
                <div className="sum__item-btns-row">
                    <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, 2)} disabled={loading}>+2</button>
                    <button className='sum__item-btn' onClick={() => handleUpdatePersonAmount(person.id, 5)} disabled={loading}>+5</button>      
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField 
                        type='number' 
                        label="Wartość niestandardowa" 
                        error={errors.amount} 
                        helperText={errors.amount && errors.amountMessage} 
                        value={customAmountValue} onChange={handleInputChange} 
                        fullWidth />
                    <button type='submit' className='sum__item-btn-full-width' disabled={loading}>Dodaj wartość</button>
                    <button className='sum__item-btn-full-width' onClick={() => navigate(`/person/${person.id}`)}>Przejdź do długów</button>
                </form>
            </>
        )}
    </div>
  )
}

export default SumItem