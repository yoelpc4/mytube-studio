import { useState } from 'react';

export default function useForm(data) {
  const [ form, setForm ] = useState(data)

  function onInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function resetForm() {
    setForm(Object.keys(form).reduce((newForm, key) => {
      newForm[key] = ''

      return newForm
    }, {}))
  }

  return {
    form,
    onInput,
    resetForm,
  }
}
