import { Link } from '@inertiajs/react';
import React, { useState } from 'react'
import { router } from '@inertiajs/react';

const Navbar = ({isUserLogin}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    const value = event.target.value
    setSearchQuery(value);
    if (value?.length > 3) {
      router.get('inventories/search', {searchQuery: value})
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <p className="text-bold text-2xl"><Link href={route('dashboard')} as="button">Hi, this is Homepage!</Link></p>
      </div>
      <div className="flex-none gap-2">
        {isUserLogin && (
          <div className="form-control">
            <div className='flex'>
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <div className='px-2 flex justify-center'>
                <button className="btn btn-outline"><Link href='/' as="button" method='get'>Reset</Link></button>
              </div>
            </div>
          </div>
        )}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><Link href={route('dashboard')} as="button">{isUserLogin ? 'Dashboard' : 'Login'}</Link></li>
            {isUserLogin && (
              <li><Link href={route('logout')} as="button" method='post'>Logout</Link></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;