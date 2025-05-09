import {useState} from 'react'
import BlogLogo from '../../assets/blog_log_logo.png'
import { btnDesktop,btnMobile } from '../../js/navbarbuttons'
import { Link } from 'react-router'

import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react'

const SiteLogo = () => {

    return (
        <div className='grow'>
            <button type="button" className='cursor-pointer w-[fit-content]'>
                <Link to="/">
                    <img src={BlogLogo} alt="logo" className='w-[64px]'/>
                </Link>
            </button>
        </div>
    )
}

const NavbarButtonWrapper = ({wrap, children}) => {

    if(wrap) {
        return (
            <SignedOut>
                {children}
            </SignedOut>
        )
    }
    else {
        return <>{children}</>
    }
}

const NavbarButton = ({item}) => {
    return (
        <button
            type="button" 
            className={item.className}
        >
            <Link to={item.href}>
                {item.title}
            </Link>
        </button>
    )
}

const Navbar = () => {
    const[open, setOpen] = useState(false)

    const {getToken} = useAuth()

    return (
        <div 
            className='sm:p-[0.5rem] sm:border-b sm:border-gray-400/50'
        >
            {/*Desktop */}
            <div className='hidden sm:flex gap-x-[0.25rem] px-[2rem]'>
                <SiteLogo />

                <div className='flex gap-x-[0.75rem] items-center'>
                    {
                        btnDesktop.map((item, index) => (
                            <NavbarButtonWrapper wrap={item.title !== 'Login' ? false : true} key={index}>
                                <NavbarButton item={item}/>
                            </NavbarButtonWrapper>
                        ))
                    }
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

            {/* Mobile */}
            <div className={`sm:hidden fixed z-10 w-screen bg-zinc-300`}>

                <div className='p-[0.5rem] flex justify-between gap-x-[0.5rem] border-b border-gray-400/50'>
                    <SiteLogo />

                    <div className='flex items-center gap-x-[0.75rem]'>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        {
                            !open && (
                                <button 
                                    type="button" 
                                    className='cursor-pointer z-10'
                                    onClick={() => setOpen(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                </button>
                            )
                        }
                        {
                            open && (
                                <button 
                                    type="button" 
                                    className='cursor-pointer group z-10'
                                    onClick={() => setOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                    </svg>
                                </button>
                            )
                        }
                    </div>
                    
                </div>

                <div 
                    className={`fixed flex flex-col gap-y-[0.5rem] justify-center items-center h-screen w-screen
                     border-1 border-double border-gray-400/50 bg-zinc-300
                    ${!open ? ' right-[-100%]' : 'right-0'} transition-normal duration-200
                    ${open ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    {
                        btnMobile.map((item, index) => (
                            <NavbarButtonWrapper wrap={item.title !== 'Login' ? false : true} key={index}>
                                <NavbarButton item={item}/>
                            </NavbarButtonWrapper>
                        ))
                    }
                </div>
            </div>
            {/* Dummy div to fake navbar still being part 
                of document flow even if the navbar is fixed */}
            <div className='sm:hidden w-screen h-[4rem]'></div>
        </div>
    )
}

export default Navbar