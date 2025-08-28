'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-transparent shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Link href="/">
            <div className="text-2xl font-bold text-blue-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              MediCare
            </div>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  scrolled ? 'text-white hover:text-blue-200' : 'text-white hover:text-blue-200'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Login Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden md:block"
        >
          <Link
            href="/login"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              scrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
          >
            <FaUser />
            <span>Login</span>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FaTimes className={scrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <FaBars className={scrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-2 mx-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar