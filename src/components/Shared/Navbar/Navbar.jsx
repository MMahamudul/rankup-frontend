import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/placeholder.jpg'
import logo from '../../../assets/logo-l.png'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed top-0 w-full bg-white z-10 shadow-sm'>
      <Container>
        <div className='h-16 flex items-center justify-between gap-3'>
         
          <Link to='/'>
            <img src={logo} alt='logo' width='75' height='75' />
          </Link>

          {/* Desktop Nav (hidden on mobile) */}
          <div className='hidden md:flex items-center gap-6'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to='/all-contests'
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              Contests
            </NavLink>

            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Dropdown Menu (works for both desktop + mobile) */}
          <div className='relative'>
            <div className='flex items-center'>
              {/* Dropdown btn */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-2 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                  {/* Avatar */}
                  <img
                    className='rounded-full w-8 h-8 object-cover'
                    referrerPolicy='no-referrer'
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt='profile'
                  />
                </div>
              </div>
            </div>

            {isOpen && (
              <div className='absolute right-0 top-12 rounded-xl shadow-md w-64 md:w-56 bg-white overflow-hidden text-sm border'>
                <div className='flex flex-col'>
                  {/* Mobile Nav Links (only show on mobile) */}
                  <div className='md:hidden border-b'>
                    <Link
                      to='/'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>
                    <Link
                      to='/all-contests'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Contests
                    </Link>
                    <Link
                      to='/contact'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Contact
                    </Link>
                  </div>

                  {user ? (
                    <>
                      <h2 className='px-4 py-3 text-blue-800 font-semibold border-b truncate'>
                        {user.displayName}
                      </h2>

                      <Link
                        to='/dashboard'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Dashboard
                      </Link>

                      <div
                        onClick={logOut}
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/login'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Login
                      </Link>
                      <Link
                        to='/signup'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
