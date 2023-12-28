import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Shadow from "./Shadow";
import TextField from "@mui/material/TextField";
import loginValidation from "../validations/loginValidation";
import { loginWithEmailAndPassword } from "../services/auth";
import { useNotification } from "../context/NotificationContext";
import * as messages from "../constants/messages";

interface Form {
	email: string;
	password: string;
}

interface Errors {
    email: boolean,
    emailMessage: string,
    password: boolean,
    passwordMessage: string
}

interface LoginModalProps {
    loginModalActive: boolean,
    setLoginModalActive: (loginModalActive: boolean) => void
}

function LoginModal({ loginModalActive, setLoginModalActive }: LoginModalProps) {
	const [form, setForm] = useState<Form>({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<Errors>>({})
    const [loading, setLoading] = useState<boolean>(false);
    const { showErrorNotification } = useNotification()

	function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	}

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors(loginValidation(form));
    }

    function handleLoginWithEmailAndPassword() {
        setLoading(true);

        loginWithEmailAndPassword(form.email, form.password)
            .then(() => {
                setLoginModalActive(false)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)

                if (error.code === 'auth/invalid-credential') {
                    showErrorNotification(messages.loginCredentialsIncorrect)
                    return;
                }

                showErrorNotification(messages.loginFail)
            })
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && form.email.length > 0 && form.password.length > 0) {
            handleLoginWithEmailAndPassword();
        }
    }, [errors])

	return (
		<>
			<Shadow modalActive={loginModalActive} setModalActive={setLoginModalActive} />
            <div className={loginModalActive ? "modal modal-show" : "modal"}>
                <h3 className='modal__title'>Zaloguj</h3>
                <form onSubmit={handleSubmit}>
                    <div className='modal__box'>
                        <TextField
                            type='text'
                            name='email'
                            label='Adres email'
                            error={errors.email}
                            value={form.email}
                            onChange={handleChangeInput}
                            helperText={errors.email && errors.emailMessage}
                            fullWidth
                        />
                    </div>
                    <div className='modal__box'>
                        <TextField
                            type='password'
                            name='password'
                            label='Hasło'
                            error={errors.password}
                            value={form.password}
                            onChange={handleChangeInput}
                            helperText={errors.password && errors.passwordMessage}
                            fullWidth
                        />
                    </div>
                    <button type="submit" className="modal__submit-btn" disabled={loading}>Zaloguj</button>
                </form>
            </div>
		</>
	);
}

export default LoginModal;
