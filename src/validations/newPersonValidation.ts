interface NewPersonForm {
    name: string
}

interface NewPersonFormErrors {
    name: boolean,
    nameMessage: string 
}

export default function newPersonValidation(form: NewPersonForm) {
    const errors: Partial<NewPersonFormErrors> = {}

    if (!form.name.length) {
        errors.name = true
        errors.nameMessage = "Pole wymagane"
    }

    return errors;
}