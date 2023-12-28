import React, { useEffect, useState } from 'react'
import Shadow from './Shadow'
import TextField from "@mui/material/TextField";
import newPersonValidation from '../validations/newPersonValidation';
import { addNewPerson } from '../services/create';
import { useNotification } from '../context/NotificationContext';
import * as messages from "../constants/messages";

interface NewPersonModalProps {
    newPersonModalActive: boolean,
    setNewPersonModalActive: (newPersonModalActive: boolean) => void 
}

interface NewPersonForm {
  name: string
}

interface NewPersonFormErrors {
  name: boolean,
  nameMessage: string 
}

function NewPersonModal({ newPersonModalActive, setNewPersonModalActive }: NewPersonModalProps) {
  const [form, setForm] = useState<NewPersonForm>({ name: "" })
  const [errors, setErrors] = useState<Partial<NewPersonFormErrors>>({})
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification, showErrorNotification } = useNotification()

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors(newPersonValidation(form))
  }

  function handleAddNewPerson() {
    setLoading(true)

    addNewPerson(form.name)
      .then(() => {
        setNewPersonModalActive(false)
        setForm({ ...form, name: "" })
        showNotification(messages.addedNewPersonSuccess)
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        showErrorNotification(messages.addedNewPersonFail)
        setLoading(false);
      })
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && form.name.length > 0) {
      handleAddNewPerson();
    }
  }, [errors])

  return (
    <>
        <Shadow modalActive={newPersonModalActive} setModalActive={setNewPersonModalActive} />
        <div className={newPersonModalActive ? "modal modal-show" : "modal"}>
          <h3 className="modal__title">Dodaj osobę</h3>
          <form onSubmit={handleSubmit}>
            <div className="modal__box">
              <TextField 
                type='text' 
                name='name' 
                label="Imię osoby" 
                value={form.name} 
                error={errors.name} 
                helperText={errors.name && errors.nameMessage}
                onChange={handleChangeInput} 
                fullWidth />
            </div>
            <button type='submit' className="modal__submit-btn" disabled={loading}>Dodaj</button>
          </form>
        </div>
    </>
  )
}

export default NewPersonModal