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

export default function loginValidation(formValues: Form) {
    const errors: Partial<Errors> = {}

    if (!formValues.email.length) {
        errors.email = true;
        errors.emailMessage = "Pole wymagane"
    }

    if (!formValues.password.length) {
        errors.password = true;
        errors.passwordMessage = "Pole wymagane"
    }

    return errors;
}