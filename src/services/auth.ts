import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginWithEmailAndPassword(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
}