import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/placeholder.jpg'
import logo from '../../../assets/logo-l.png'
import { useEffect } from 'react'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toogleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className='fixed top-0 w-full bg-white z-50 shadow-sm'>
      <Container>
        <div className='h-16 flex items-center justify-between gap-3'>
          <Link to='/' onClick={closeMenu}>
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
              to='/support'
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              Support
            </NavLink>

            <NavLink
              to='/membership'
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              Membership
            </NavLink>

            <NavLink
              to='/leaderboard'
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              Leaderboard
            </NavLink>
          </div>

          {/* Dropdown Menu Button (same behavior as before) */}
          <div className='relative'>
            <div className='flex items-center'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-2 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <AiOutlineMenu />
                <div className='hidden md:block'>
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
                  {/* Mobile nav links (only show on mobile) */}
                  <div className='md:hidden border-b'>
                    <Link onClick={closeMenu} to='/' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      Home
                    </Link>
                    <Link onClick={closeMenu} to='/all-contests' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      Contests
                    </Link>
                    <Link onClick={closeMenu} to='/support' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      Support
                    </Link>
                    <Link onClick={closeMenu} to='/membership' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      Membership
                    </Link>
                    <Link onClick={closeMenu} to='/leaderboard' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      Leaderboard
                    </Link>
                  </div>

                  {/* Auth menu (same as your current functionality) */}
                  {user ? (
                    <>
                      <h2 className='px-4 py-3 text-blue-800 font-semibold border-b truncate'>
                        {user.displayName}
                      </h2>

                      <Link
                        onClick={closeMenu}
                        to='/dashboard'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Dashboard
                      </Link>

                      <div
                        onClick={() => {
                          logOut()
                          closeMenu()
                        }}
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link onClick={closeMenu} to='/login' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                        Login
                      </Link>
                      <Link onClick={closeMenu} to='/signup' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
           <div>
          <input
            onChange={(e) => toogleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />
        </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
