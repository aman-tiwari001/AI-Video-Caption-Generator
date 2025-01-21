import {
	ArrowRight,
	Video,
	History,
	Zap,
	UploadCloud,
	CpuIcon,
	DownloadIcon,
} from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';

const Home = () => {
	return (
		<div className='space-y-16 pt-24'>
			<section className='text-center space'>
				<h1 className='text-6xl mt-10 mb-2 font-bold text-grad'>
					AI-Powered Video Caption Generator!
				</h1>
				<p className='text-xl mb-10 text-gray-600 underline'>
					Generate captioned videos with our cutting-edge AI technology
				</p>
				<div>
          <div className='flex btn-primary w-36 mx-auto justify-center items-center gap-1'>
            <SignUpButton forceRedirectUrl={'/remove-bg'}>
              Get Started
            </SignUpButton>
            <ArrowRight className='h-4 w-4' />
          </div>
				</div>
			</section>

			<section className='grid md:grid-cols-3 gap-8 px-8'>
				<div className='text-center space-y-2 bg-grad py-8 rounded-xl'>
					<Video className='mx-auto h-12 w-12 text-white' />
					<h2 className='text-xl font-semibold text-white'>Easy Upload</h2>
					<p className='text-gray-100'>
						Simply upload your video and let our AI do the rest
					</p>
				</div>
				<div className='text-center space-y-2 bg-grad py-8 rounded-xl'>
					<Zap className='mx-auto h-12 w-12 text-white' />
					<h2 className='text-xl font-semibold text-white'>Fast Processing</h2>
					<p className='text-gray-100'>
						Get your video captioned in seconds
					</p>
				</div>
				<div className='text-center space-y-2 bg-grad py-8 rounded-xl'>
					<History className='mx-auto h-12 w-12 text-white' />
					<h2 className='text-xl font-semibold text-white'>View History</h2>
					<p className='text-gray-100'>
						Access all your processed videos anytime
					</p>
				</div>
			</section>

			<section className='bg-grad px-8 rounded-t-3xl py-5'>
				<h2 className='text-3xl mb-4 font-bold text-center text-white'>
					How It Works?
				</h2>
				<div className='grid md:grid-cols-3 gap-8'>
					<div className='space-y-2 text-center'>
						<div className='bg-gradient-to-br from-orange-100 via-pink-100 to-red-100 p-10 space-y-4 rounded-xl shadow-sm'>
							<UploadCloud color='#EF527A' size={50} className='mx-auto' />
							<p className='text-center text-black text-lg'>
								1. Upload your video
							</p>
						</div>
					</div>
					<div className='space-y-2 text-center'>
						<div className='bg-gradient-to-br from-orange-100 via-pink-100 to-red-100 p-10 space-y-4 rounded-xl shadow-sm'>
							<CpuIcon color='#EF527A' size={50} className='mx-auto' />
							<p className='text-center text-black text-lg'>
								2. AI adds captions to your video
							</p>
						</div>
					</div>
					<div className='space-y-2 text-center'>
						<div className='bg-gradient-to-br from-orange-100 via-pink-100 to-red-100 p-10 space-y-4 rounded-xl shadow-sm'>
							<DownloadIcon color='#EF527A' size={50} className='mx-auto' />
							<p className='text-center text-black text-lg'>
								3. Download your video
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Home;
