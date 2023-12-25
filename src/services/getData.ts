import { db } from "../config/firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";

const peopleCollection = collection(db, "people")

export async function getAllPeople() {
    const data = await getDocs(peopleCollection);

    return data;
}

export async function getPerson(personId: string) {
    const personDoc = doc(db, "people", personId)

    const data = await getDoc(personDoc)

    return data;
}