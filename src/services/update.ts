import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function updatePersonAmount(personId: string, newPersonAmountDebt: number[]) {
    const personDoc = doc(db, "people", personId)

    await updateDoc(personDoc, { amountDebt: newPersonAmountDebt })
}