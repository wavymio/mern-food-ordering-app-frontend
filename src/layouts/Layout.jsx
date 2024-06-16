import Hero from '../components/Hero'
import Header from '../components/Header'
import React from 'react'
import Footer from '../components/Footer'

const Layout = ({ children, showHero = false }) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        { showHero && <Hero />}
        <div className="container mx-auto flex-1 py-10">
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout
