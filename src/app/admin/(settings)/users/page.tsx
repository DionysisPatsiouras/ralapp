'use client'
import { useState } from "react"
import { useForm } from 'react-hook-form'

export default function Home() {

    type FormValues = {
        firstname: string
        lastname: string
    }

    const [modal, setModal] = useState(true)


    const form = useForm<FormValues>();
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted')
    }

    return (
        <>
            <p>Users</p>
            <button onClick={() => setModal(!modal)} >Εισαγωγή Νέου Χρήστη</button>

            {modal
                ?
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <label htmlFor="firstname">Firstname*</label>
                    <input
                        type="text"
                        id="firstname"
                        {...register("firstname", {
                            required: {
                                value: true,
                                message: "this field is required"
                            }
                        })}
                    />
                    <p>{errors.firstname?.message}</p>

                    <label htmlFor="lastname">Lastname*</label>
                    <input
                        type="text"
                        id="lastname"
                        {...register("lastname", {
                            required: {
                                value: true,
                                message: "this field is required"
                            }
                        })}
                    />
                    <p>{errors.lastname?.message}</p>
                    <button>Submit</button>
                </form>

                : null}

        </>
    )
}
