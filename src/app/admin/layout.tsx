'use client'

import { Header } from '@/components/Header/Header'
import { useState } from 'react'
import { NavbarTop } from '@/components/NavBars/NavbarTop'
import { NavbarVertical } from '@/components/NavBars/NavbarVertical'

// import theme style scss file
import '../../styles/css/theme.scss'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showMenu, setShowMenu] = useState(true)
    const ToggleMenu = () => {
        return setShowMenu(!showMenu)
    }

    return (
        <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
            <div className="navbar-vertical navbar">
                <NavbarVertical
                    showMenu={showMenu}
                    onClick={(value: boolean | ((prevState: boolean) => boolean)) => setShowMenu(value)}
                />
            </div>
            <div id="page-content">
                <div className="header">
                    <NavbarTop
                        data={{
                            showMenu: showMenu,
                            SidebarToggleMenu: ToggleMenu
                        }}
                    />
                </div>
                {children}
            </div>
        </div>
    )
}
