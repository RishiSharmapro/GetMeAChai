import React from 'react'

// const Footer = () => {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className='bg-blue-950 flex justify-center items-center p-4 text-white'>
//         <p className='text-center'>Copyright &copy; {currentYear} Get Me A Chai - All rights reserved!</p>
//     </footer>
//   )
// }
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h3 className="text-xl font-bold text-white mb-4">GetMeA<span className="text-amber-500">Chai</span></h3>
          <p className="text-gray-400 text-sm">Funding creativity, one chai at a time.</p>
        </div>
        <div className="">
            <h4 className="font-semibold text-white mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">Get our weekly newsletter with the best new projects.</p>
            <form className="flex bg-white rounded-md">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-sm text-gray-800 rounded-l-md focus:outline-none" />
                <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-r-md hover:bg-amber-600">&rarr;</button>
            </form>
        </div>
      </div>
      <div className="mt-1 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} GetMeAChai, Inc. All rights reserved.</p>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <span>Made with ❤️ by </span>
          <a href="https://rishisharmapro.vercel.app" className="text-gray-500 hover:text-white">Rishi Sharma</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer