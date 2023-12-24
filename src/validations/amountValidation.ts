interface AmountErrors {
    amount: boolean,
    amountMessage: string
}

export default function amountValidation(newAmount: string) {
    const errors: Partial<AmountErrors> = {}
    const newAmountNumber = Number(newAmount)

    if (newAmount.length === 0) {
        errors.amount = true
        errors.amountMessage = "Pole wymagane"
    }

    if (newAmountNumber <= 0) {
        errors.amount = true
        errors.amountMessage = "Suma nie może być mniejsza lub równa 0"
    }

    return errors
}