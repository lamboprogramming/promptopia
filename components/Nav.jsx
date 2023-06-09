'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import  { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProviders();
  }, [])

  return (
   <nav className='w-full pt-3 mb-16 flex-between'>
    <Link href="/" className="flex gap-2 flex-center">
      <Image
       src="/assets/images/logo.svg"
       alt="Promptopia Logo"
       width={30}
       height={30}
       className="object-contain" />
       <p className="logo_text">Promptopia</p>
    </Link>
    
    {/* Desktop Navigation */}
    <div className="hidden sm:flex">
    {isUserLoggedIn ? (
      <div className='flex gap-3 md:gap-5'>
    {/*Create a Post */}
        <Link href="/create-prompt"
        className='black_btn'>
        Create Post
        </Link>
    {/* Sign Out */}
        <button type="button" onClick={signOut} className='outline_btn'>
        Sign Out
        </button>

        <Link href="/profile">
          <Image
          src="/assets/images/logo.svg"
          alt="Profile"
          width={37}
          height={37}
          className='rounded-full'
          onClick={() => {}}
           />
          </Link>
        </div>
        ): (
      <>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'>
              Sign In
            </button>
          ))}
      </>
    )}
    </div>

    {/* Mobile Navigation */}
    <div className="relative flex sm:hidden">
            {isUserLoggedIn ? (
              <div className='flex'>
                <Image
                  src="/assets/images/logo.svg"
                  alt="Profile"
                  width={37}
                  height={37}
                  className='rounded-full'
                  onClick={() => setToggleDropdown((prev) => !prev)}  
                  />
    {/* Dropdown Links */}
                  {toggleDropdown && (
                    <div className="dropdown">
                      <Link 
                        href="/profile"
                        className='dropdown_link'
                        onClick={() => setToggleDropdown(false)}
                        >
                        My Profile
                      </Link>
                      <Link 
                        href="/create-prompt"
                        className='dropdown_link'
                        onClick={() => setToggleDropdown(false)}
                        >
                        Create Prompt
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setToggleDropdown(false);
                          signOut();
                        }}
                        className='w-full mt-5 black_btn'
                        >
                        Sign Out
                        </button>
                        
                    </div>
                  )}
              </div>
            ): (
              <div>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                    >
                    Sign In
                  </button>
                ))}
            </div>
            )}
      </div>
     </nav>
  );
}

export default Nav;
