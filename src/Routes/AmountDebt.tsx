import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPerson } from '../services/getData'
import * as messages from "../constants/messages";
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { updatePersonAmount, updatePersonAmountAndPersonAmountMoney } from '../services/update';

function AmountDebt() {
    const [person, setPerson] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams()
    const { showErrorNotification, showNotification } = useNotification()
    const navigate = useNavigate()

    function handleGetPerson() {
        if (id) {
            getPerson(id)
                .then(data => {
                    setPerson({ ...data.data(), id: id})
                    console.log(data.data())
                })
                .catch(error => {
                    console.log(error)
                    showErrorNotification(messages.getPersonFail)
                })
        }
    }

    function handleDeleteDebt(index: number) {
        const updatedPersonAmountDebt = [...person.amountDebt]
        updatedPersonAmountDebt.splice(index, 1);

        return updatedPersonAmountDebt
    }

    function handleUpdatePersonAmount(index: number) {
        const updatedPersonAmountDebt = handleDeleteDebt(index)

        setLoading(true)
        updatePersonAmount(person.id, updatedPersonAmountDebt)
            .then(() => {
                setPerson({ ...person, amountDebt: updatedPersonAmountDebt })
                showNotification(messages.deletedDebtSuccess)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                showErrorNotification(messages.updatePersonFail)
                setLoading(false)
            })
    }

    function handleUpdatePersonAmountAndPersonAmountMoney(index: number) {
        const newPersonAmount = person.amount + person.amountDebt[index]
        const updatedPersonAmountDebt = handleDeleteDebt(index)

        setLoading(true)
        updatePersonAmountAndPersonAmountMoney(person.id, updatedPersonAmountDebt, newPersonAmount)
            .then(() => {
                setPerson({ ...person, amount: newPersonAmount, amountDebt: updatedPersonAmountDebt })
                showNotification(messages.addedAmountDebtToAmountMoneySuccess)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                showErrorNotification(messages.updatePersonFail)
                setLoading(false)
            })
    }

    useEffect(() => {
        handleGetPerson()
    }, [])

  return (
    <div className="amount-debt">
        <Container fixed>
            <h1 className="amount-debt__title">Długi dla {person?.name}</h1>
            <div className="amount-debt__btns-row">
                <button className='amount-debt__btn' onClick={() => navigate("/")}>Wróć do sumy pieniędzy</button>
            </div>
            <div className="amount-debt__debts">
                {!person?.amountDebt?.length ? (
                    <>
                        <p className="amount-debt__message">Brak długów</p>
                    </>
                ) : (
                    <>
                        {person?.amountDebt?.map((debt: any, index: any) => (
                            <div key={index} className="amount-debt__debt">
                                <span className='amount-debt__debt-text'>+{debt} zł</span>
                                <button 
                                    className="amount-debt__btn" 
                                    onClick={() => handleUpdatePersonAmountAndPersonAmountMoney(index)}
                                    disabled={loading}>
                                Dodaj do sumy
                                </button>
                                <button 
                                    className="amount-debt__btn" 
                                    onClick={() => handleUpdatePersonAmount(index)}
                                    disabled={loading}>
                                Usuń
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </Container>
    </div>
  )
}

export default AmountDebt