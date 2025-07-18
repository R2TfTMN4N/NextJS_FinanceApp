import React from 'react'
import HeaderLogo from './header-logo'
import {Navigation} from './navigation'
import { ClerkLoaded,ClerkLoading } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import WelcomeMsg from './welcome-msg'
const Header = () => {
  return (
    <header
      className="bg-gradient-to-b from-blue-600
     to-blue-100 px-4 py-8 lg:px-14 pb-36"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton  />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin size-8 text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg/>
      </div>
    </header>
  );
}

export default Header
