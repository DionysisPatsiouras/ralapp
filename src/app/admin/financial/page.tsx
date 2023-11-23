'use client'
import { Col, Container, Row } from 'react-bootstrap'
import PageHeading from '@/widgets/PageHeading/PageHeading'
import DataGrid from 'react-data-grid'
import HeaderFilters from './HeaderFilters'

export default function Home() {
    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Ονομα ΦΔΛ' },
        { key: 'area', name: 'Περιοχή' },
        { key: 'debt', name: 'Οφειλή' },
        { key: 'date', name: 'Ημερομηνία' }
    ]

    const rows = [
        { id: 0, name: 'Διονύσης', area: 'Λάρισα', debt: '1000 €' },
        { id: 2, name: 'Γιώργος', area: 'Αθήνα', debt: '1200 €' },
    ]


    return (
        <>
            <Container fluid className="p-6">
                {/* Page Heading */}
                <PageHeading heading="Αρχική" />
                
                <Row className="mt-6">
                    <Col xl={{ span: 15, offset: 0 }} lg={{ span: 10, offset: 0 }} md={12} xs={12}>
                        <Row>
                            {/* <DataGrid columns={columns} rows={rows}  rowHeight={50} /> */}
                        </Row>
                    </Col>
                </Row>

                
                <HeaderFilters direction='ltr'/>
                
            </Container>
        </>
    )
}
