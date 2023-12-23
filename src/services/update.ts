import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function updatePersonAmount(personId: string, newPersonAmount: number) {
    const personDoc = doc(db, "people", personId)

    await updateDoc(personDoc, { amount: newPersonAmount })
}