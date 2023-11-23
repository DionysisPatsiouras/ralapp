import '../styles/css/globals.css'
import '../styles/css/theme.scss'
import 'react-data-grid/lib/styles.css'
import '../styles/css/datagrid.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'ΡΑΛ App',
    description: 'ΡΑΛ App by Younet Digital'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-light">{children}</body>
        </html>
    )
}
