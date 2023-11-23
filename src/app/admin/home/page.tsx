'use client'
import { Row, Col, Container } from 'react-bootstrap'
import PageHeading from '@/widgets/PageHeading/PageHeading'

export default function Home() {
    return (
        <>
            <Container fluid className="p-6">
                {/* Page Heading */}
                <PageHeading heading="Αρχική" />

                <Row className="mt-6">
                    <Col xl={{ span: 8, offset: 0 }} lg={{ span: 10, offset: 0 }} md={12} xs={12}>
                        <Row>
                            <p>Home Page</p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
