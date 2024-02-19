import { Link } from '@inertiajs/react';
import React, { useState } from 'react'
import { router } from '@inertiajs/react';

const Navbar = ({isUserLogin}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    const value = event.target.value
    setSearchQuery(value);
    if (value?.length > 2) {
      router.post('inventories/search', {searchQuery: value})
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Di sini Anda dapat memanggil fungsi pencarian jika ingin melakukan pencarian setelah tombol submit ditekan
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <p className="text-bold text-2xl"><Link href={route('dashboard')} as="button">Hi, this is Homepage!</Link></p>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
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