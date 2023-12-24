import React, { createContext, useContext, useState } from 'react';

interface AmountMoneyContextProps {
    amountMoney: number,
    getPeopleList: (peopleList: any[]) => void
    changeAmountMoney: (personId: string, personAmount: number) => void
}

const amountMoneyContext = createContext<AmountMoneyContextProps>({
    amountMoney: 0,
    getPeopleList: () => {},
    changeAmountMoney: () => {}
})

export function useAmountMoney() {
    return useContext(amountMoneyContext)
}

export function AmountMoneyProvider({ children }: any) {
    const [updatedPeopleList, setUpdatedPeopleList] = useState<any[]>([])
    const [amountMoney, setAmountMoney] = useState<number>(0)

    function calculateAmountMoney(peopleList: any[]) {
        let newAmountMoney = 0

        peopleList.forEach(person => {
            newAmountMoney += person.amount
        })

        setAmountMoney(newAmountMoney)
    }

    function getPeopleList(peopleList: any[]) {
        setUpdatedPeopleList(peopleList)
        calculateAmountMoney(peopleList)
    }

    function changeAmountMoney(personId: string, personAmount: number) {
        const person = updatedPeopleList.find(person => person.id === personId)
        const personIndex = updatedPeopleList.indexOf(person)

        person.amount += personAmount
        updatedPeopleList[personIndex] = person
        setUpdatedPeopleList(updatedPeopleList)
        calculateAmountMoney(updatedPeopleList)
    }
  
    const value: AmountMoneyContextProps = {
      amountMoney,
      getPeopleList,
      changeAmountMoney
    };
  
    return <amountMoneyContext.Provider value={value}>{children}</amountMoneyContext.Provider>
  };