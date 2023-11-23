'use client'
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'


import { Col, Container, Row } from 'react-bootstrap'
import PageHeading from '@/widgets/PageHeading/PageHeading'
import DataGrid from 'react-data-grid'

import style from '../../../styles/css/settings/settings.module.css'

export default function Settings() {

    const [activeTab, setActiveTab] = useState("Χρήστη")
    const [title, setTitle] = useState('Χρήστες')
    const [modal, setModal] = useState(false)
    const [cancelConfirmation, setCancelConfirmation] = useState(false)

    type FormValues = {
        firstname: string
        lastname: string
    }

    const form = useForm<FormValues>();
    const { register, handleSubmit, formState, reset } = form
    const { errors } = formState
    const onSubmit = (data: FormValues) => {
        console.log('Form submitted')
        reset();
    }

    // const [data, setData] = useState<any[]>([])


    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' }
    ]

    const rows = [
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
    ]


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const json = await response.json();
            // setData(json);
        };

        fetchData();
    }, [activeTab]);




    return (
        <div className={style.container}>

            {/* Tabs */}
            <div className={style.topSection}>
                <div>
                    <button type="button" className="btn btn-outline-dark" onClick={() => { setActiveTab('Χρήστη'), setTitle('Χρήστες') }}>Χρήστες</button>
                    <button type="button" className="btn btn-outline-dark" onClick={() => { setActiveTab('Group'), setTitle('Groups') }}>Groups</button>
                    <button type="button" className="btn btn-outline-dark" onClick={() => { setActiveTab('Ποσοστού'), setTitle('Ποσοστά') }}>Ποσοστά</button>
                </div>
                <div>
                    <button type="button" className="btn btn-primary" style={{ 'margin': '0' }} onClick={() => setModal(!modal)}>Εισαγωγή νέου {activeTab}</button>
                </div>
            </div>
            <h2>{title}</h2>



            <Container fluid className="p-6">
                <Row className="mt-6">
                    <Col xl={{ span: 8, offset: 0 }} lg={{ span: 10, offset: 0 }} md={12} xs={12}>
                        <Row>
                            <DataGrid columns={columns} rows={rows} />
                        </Row>
                    </Col>
                </Row>
            </Container>




            {modal ?
                <div className={style.modal}>

                    <div className={style.formWindow} >
                        <h3>Εισαγωγή νέου {activeTab}</h3>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <input
                                placeholder="Ονομα"
                                type="text"
                                id="firstname"
                                {...register("firstname", {
                                    required: {
                                        value: true,
                                        message: "Υποχρεωτικό πεδίο"
                                    }
                                })}
                            />
                            <p>{errors.firstname?.message}</p>

                            <input
                                placeholder="Επώνυμο"
                                type="text"
                                id="lastname"
                                {...register("lastname", {
                                    required: {
                                        value: true,
                                        message: "Υποχρεωτικό πεδίο"
                                    }
                                })}
                            />
                            <p>{errors.lastname?.message}</p>


                            {/* Prompt user for confirmation before closing the window */}
                            {cancelConfirmation ?
                                <div>Οι αλλαγές σας δεν έχουν αποθηκευτεί. Είστε σίγουροι ότι θέλετε να εξέλθετε;<br></br><br></br>
                                    <button type="button" className="btn btn-danger" onClick={() => { setModal(!modal), reset(); setCancelConfirmation(false) }}>Εξοδος</button>
                                    <button type="button" className="btn btn-success" onClick={() => setCancelConfirmation(false)}>Συνέχεια Επεξεργασίας</button>

                                </div>
                                :
                                <div>
                                    {/* Close modal window and reset form values */}
                                    <button type="button" className="btn btn-danger" onClick={() => setCancelConfirmation(true)}>Ακύρωση</button>
                                    <button type="submit" className="btn btn-success" onClick={() => setCancelConfirmation(false)}>Επιβεβαίωση</button>
                                </div>
                            }

                        </form>
                    </div>

                </div>
                : null
            }

        </div >
    )
}
