import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
 
  return (
<header className='bg-slate-800 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
   
      <span className='text-slate-500'>Bhavy</span>
    <span className='text-slate-100'>Estate</span>
    
</h1>
</Link>
<form className='bg-slate-100 p-1 rounded-lg flex items-center'>
<input type="text" placeholder="Search.." 
className='bg-transpert focus:outline-none w-24 sm:w-64' />
<FaSearch className='text-slate-600'/>
</form>
<ul className='flex gap-4'>
  <Link to='/'>
  <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>Home</li>
  </Link>
  <Link to='/About'>
    <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>About</li>
  </Link> 
  {/* <Link to='/SignIn'>
    <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>SignIn</li>
  </Link> 
   */}
  <Link to='/Profile'>
            {currentUser ? (
              <img src={currentUser.avatar} className='rounded-full h-7 w-7 object-cover' alt='profile'/>
            ) : (
              <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '> Sign In</li>
            )}
          </Link>

  </ul>
</div>
</header>
    
  )
}
