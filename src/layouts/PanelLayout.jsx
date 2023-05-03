import React from 'react'
import { Outlet } from 'react-router-dom'

const PanelLayout = () => {
    return (
        <>
            <main className='bg-gray-100 h-screen'>
                <Outlet />
            </main>
        </>
      )
}

export default PanelLayout