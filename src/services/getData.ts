import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const peopleCollection = collection(db, "people")

export async function getAllPeople() {
    const data = await getDocs(peopleCollection);

    return data;
}