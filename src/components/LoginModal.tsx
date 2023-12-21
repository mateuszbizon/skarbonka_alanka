import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Shadow from "./Shadow";
import TextField from "@mui/material/TextField";
import loginValidation from "../validations/loginValidation";

interface Form {
	username: string;
	password: string;
}

interface Errors {
    username: boolean,
    usernameMessage: string,
    password: boolean,
    passwordMessage: string
}

interface LoginModalProps {
    loginModalActive: boolean,
    setLoginModalActive: (loginModalActive: boolean) => void
}

function LoginModal({ loginModalActive, setLoginModalActive }: LoginModalProps) {
	const [form, setForm] = useState<Form>({ username: "", password: "" });
    const [errors, setErrors] = useState<Partial<Errors>>({})

	function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	}

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors(loginValidation(form));
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && form.username.length > 0 && form.password.length > 0) {
            console.log('wyslano')
            setLoginModalActive(false)
        }
    }, [errors])

	return (
		<>
			<Shadow modalActive={loginModalActive} setModalActive={setLoginModalActive} />
            <div className={loginModalActive ? "login-modal login-modal-show" : "login-modal"}>
                <h3 className='login-modal__title'>Zaloguj</h3>
                <form onSubmit={handleSubmit}>
                    <div className='login-modal__box'>
                        <TextField
                            type='text'
                            name='username'
                            label='Nazwa użytkownika'
                            error={errors.username}
                            value={form.username}
                            onChange={handleChangeInput}
                            helperText={errors.username && errors.usernameMessage}
                            fullWidth
                        />
                    </div>
                    <div className='login-modal__box'>
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
                    <button type="submit" className="login-modal__submit-btn">Zaloguj</button>
                </form>
            </div>
		</>
	);
}

export default LoginModal;
