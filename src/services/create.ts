import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const peopleCollection = collection(db, "people");

export async function addNewPerson(newPersonName: string) {
    await addDoc(peopleCollection, { name: newPersonName, amount: 0, amountDebt: [] })
}