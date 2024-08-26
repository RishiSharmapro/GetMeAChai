import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-blue-950 flex justify-center items-center p-4 text-white'>
        <p className='text-center'>Copyright &copy; {currentYear} Get Me A Chai - All rights reserved!</p>
    </footer>
  )
}

export default Footer