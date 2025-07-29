import React, { ReactNode } from 'react'

const Layout  = async ({children}:{children:ReactNode}) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    )
}
export default Layout
