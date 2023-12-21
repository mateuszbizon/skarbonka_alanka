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

export default function loginValidation(formValues: Form) {
    const errors: Partial<Errors> = {}

    if (!formValues.username.length) {
        errors.username = true;
        errors.usernameMessage = "Pole wymagane"
    }

    if (!formValues.password.length) {
        errors.password = true;
        errors.passwordMessage = "Pole wymagane"
    }

    return errors;
}