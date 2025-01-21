'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { CaptionsIcon, HistoryIcon, MenuIcon, Wand2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
	const [showMobileNav, setShowMobileNav] = useState(false);

	return (
		<nav className='max-md:px-2 flex justify-between backdrop-blur-md items-center px-4 py-3 fixed top-0 w-full'>
			<Link href={'/'}>
				<div className='flex gap-2'>
					<Wand2Icon className='max-md:w-5' />
					<h1 className='max-md:text-[16px] max-md:w-24 text-wrap text-base font-bold'>
						AI Video Captioner
					</h1>
				</div>
			</Link>
			<div className='flex items-center space-x-7 max-md:text-sm max-md:space-x-1'>
				<Link
					href='/generate-caption'
					className='border-4 hover:shadow-2xl body-bg-grad hover:shadow-red-400 border-[#EF527A] rounded-xl p-2 max-md:hidden'
				>
					<div className='flex font-semibold items-center gap-1'>
						<CaptionsIcon className='max-md:w-5' />
						Generate Caption
					</div>
				</Link>
				<Link
					href='/history'
					className='border-4 hover:shadow-2xl body-bg-grad hover:shadow-red-400 border-[#EF527A] rounded-xl p-2 max-md:hidden'
				>
					<div className='flex font-semibold items-center gap-1'>
						<HistoryIcon className='max-md:w-5' />
						History
					</div>
				</Link>
				<SignedOut>
					<div className='btn-primary border-2 border-black'>
						<SignInButton forceRedirectUrl={'/remove-bg'} />
					</div>
				</SignedOut>
				<SignedIn>
					<div className='btn-primary shadow-2xl text-white border border-red-100'>
						<UserButton showName />
					</div>
				</SignedIn>
				<div className='hidden max-md:flex flex-col items-center gap-2'>
					<MenuIcon size={40} cursor={'pointer'} onClick={() => setShowMobileNav(!showMobileNav)} />
					{showMobileNav && (
						<div className='rounded-xl border absolute body-bg-grad top-20 right-2 w-[90%] shadow-2xl p-2'>
							<Link
								href='/generate-caption'
							>
								<div className='flex font-semibold items-center hover:bg-white px-2 rounded-lg py-3 gap-1'>
									<CaptionsIcon className='max-md:w-5' />
									Generate Caption
								</div>
							</Link>
							<hr className='bg-white text-white' />
							<Link
								href='/history'
							>
								<div className='flex font-semibold items-center hover:bg-white px-2 rounded-lg py-3 gap-1'>
									<HistoryIcon className='max-md:w-5' />
									History
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
