import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function updatePersonAmountDebt(personId: string, newPersonAmountDebt: number[]) {
    const personDoc = doc(db, "people", personId)

    await updateDoc(personDoc, { amountDebt: newPersonAmountDebt })
}

export async function updatePersonAmountDebtAndPersonAmountMoney(personId: string, newPersonAmountDebt: number[], newPersonAmount: number) {
    const personDoc = doc(db, "people", personId)

    await updateDoc(personDoc, { amountDebt: newPersonAmountDebt, amount: newPersonAmount })
}