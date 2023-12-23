interface AmountErrors {
    amount: boolean,
    amountMessage: string
}

export default function amountValidation(oldAmount: number, newAmount: string) {
    const errors: Partial<AmountErrors> = {}
    const newAmountNumber = Number(newAmount)

    if (newAmount.length === 0) {
        errors.amount = true
        errors.amountMessage = "Pole wymagane"
    }

    if (oldAmount + newAmountNumber < 0) {
        errors.amount = true
        errors.amountMessage = "Suma nie może być mniejsza niż 0"
    }

    return errors
}