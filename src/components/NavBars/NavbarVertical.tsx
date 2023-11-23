import { Fragment, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { ListGroup, Card, Image, Badge } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

// import simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// import routes file
import { AdminDashboardMenu } from '@/routes/DashboardRoutes'

export const NavbarVertical = (props: any) => {
    const location = usePathname()

    const CustomToggle = ({ children, eventKey, icon }: any) => {
        const { activeEventKey } = useContext(AccordionContext)
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            //console.log('totally custom!')
        })
        const isCurrentEventKey = activeEventKey === eventKey
        return (
            <li className="nav-item">
                <Link
                    href="#"
                    className="nav-link "
                    onClick={decoratedOnClick}
                    data-bs-toggle="collapse"
                    data-bs-target="#navDashboard"
                    //aria-expanded={isCurrentEventKey ? true : false}
                    aria-controls="navDashboard"
                >
                    {icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ''} {children}
                </Link>
            </li>
        )
    }

    const CustomToggleLevel2 = ({ children, eventKey, icon }: any) => {
        const { activeEventKey } = useContext(AccordionContext)
        const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'))
        const isCurrentEventKey = activeEventKey === eventKey
        return (
            <Link
                href="#"
                className="nav-link "
                onClick={decoratedOnClick}
                data-bs-toggle="collapse"
                data-bs-target="#navDashboard"
                aria-expanded={isCurrentEventKey ? true : false}
                aria-controls="navDashboard"
            >
                {children}
            </Link>
        )
    }

    const isMobile = useMediaQuery({ maxWidth: 767 })

    const generateLink = (item: any) => {
        return (
            <Link
                href={item.link}
                className={`nav-link ${location === item.link ? 'active' : ''}`}
                onClick={(e) => (isMobile ? props.onClick(!props.showMenu) : props.showMenu)}
            >
                {item.name}
                {''}
                {item.badge ? (
                    <Badge className="ms-1" bg={item.badgecolor ? item.badgecolor : 'primary'}>
                        {item.badge}
                    </Badge>
                ) : (
                    ''
                )}
            </Link>
        )
    }

    return (
        <Fragment>
            <SimpleBar style={{ maxHeight: '100vh' }}>
                <div className="nav-scroller">
                    <Link href="/" className="navbar-brand">
                        <Image src="/images/brand/logo/logo.svg" alt="ral" width={'100%'} height={'auto'} />
                    </Link>
                </div>
                {/* Dashboard Menu */}
                <Accordion defaultActiveKey="0" as="ul" className="navbar-nav flex-column">
                    {AdminDashboardMenu.map((menu, index): any => {
                        if (menu.hasChildren) {
                            return (
                                <Fragment key={index}>
                                    <CustomToggle eventKey={index.toString()} icon={menu.icon}>
                                        {menu.title}
                                    </CustomToggle>
                                    <Accordion.Collapse eventKey={index.toString()} as="li" bsPrefix="nav-item">
                                        <ListGroup as="ul" bsPrefix="" className="nav flex-column">
                                            {menu.children?.map((menuLevel1Item: any, menuLevel1Index: any) => {
                                                return (
                                                    <ListGroup.Item as="li" bsPrefix="nav-item" key={menuLevel1Index}>
                                                        {/* first level menu items */}
                                                        {generateLink(menuLevel1Item)}
                                                        {/* end of first level menu items */}
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                    </Accordion.Collapse>
                                </Fragment>
                            )
                        } else {
                            return (
                                <Card bsPrefix="nav-item" key={index}>
                                    {/* menu item without any childern items */}
                                    <Link href={menu.link} className={`nav-link ${location === menu.link ? 'active' : ''}`}>
                                        <i className="fa-solid fa-house me-2"></i>
                                        {menu.title}
                                    </Link>
                                    {/* end of menu item without any childern items */}
                                </Card>
                            )
                        }
                    })}
                </Accordion>
                {/* end of Dashboard Menu */}
            </SimpleBar>
        </Fragment>
    )
}
