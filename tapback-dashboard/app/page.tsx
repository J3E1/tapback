import Link from 'next/link';
import { ChevronRight, ArrowUpRight, ChevronDown } from 'lucide-react';

export default function Component() {
	return (
		<div className='min-h-screen bg-black text-white'>
			<header className='container mx-auto px-4 py-6 flex justify-between items-center'>
				<div className='text-green-400 text-2xl font-bold'>NFT</div>
				<nav className='hidden md:flex space-x-6'>
					<Link className='hover:text-green-400' href='#'>
						Home
					</Link>
					<Link className='hover:text-green-400' href='#'>
						About
					</Link>
					<Link className='hover:text-green-400' href='#'>
						Blog
					</Link>
					<Link className='hover:text-green-400' href='#'>
						Work
					</Link>
				</nav>
				<button className='bg-green-400 text-black px-4 py-2 rounded-full hover:bg-green-500 transition duration-300'>
					Join Now
				</button>
			</header>

			<main className='container mx-auto px-4'>
				<section className='py-20 text-center md:text-left md:flex md:items-center md:justify-between'>
					<div className='md:w-1/2'>
						<h1 className='text-5xl md:text-6xl font-bold mb-6'>Start Making Money With NFTs</h1>
						<p className='mb-8 text-gray-400'>
							Join our community and start profiting from NFT investments today!
						</p>
						<button className='bg-green-400 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300 flex items-center mx-auto md:mx-0'>
							Join Discord
							<ChevronRight className='ml-2' />
						</button>
					</div>
					<div className='md:w-1/2 mt-10 md:mt-0'>
						{/* Placeholder for NFT image */}
						<div className='bg-gray-800 h-80 rounded-lg'></div>
					</div>
				</section>

				<section className='py-20'>
					<h2 className='text-4xl font-bold mb-12 text-center'>
						The Ultimate NFT Signals AlphaGroup
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
						{[1, 2, 3, 4].map(item => (
							<div key={item} className='bg-gray-900 p-6 rounded-lg text-center'>
								<div className='text-4xl font-bold mb-2'>{item}</div>
								<p className='text-gray-400'>Feature description goes here</p>
							</div>
						))}
					</div>
				</section>

				<section className='py-20 md:flex md:items-center md:justify-between'>
					<div className='md:w-1/2 mb-10 md:mb-0'>
						<h2 className='text-4xl font-bold mb-6'>Game-Changer For Online Investment Strategy</h2>
						<p className='text-gray-400 mb-8'>
							Our platform provides cutting-edge tools and insights for NFT investments.
						</p>
						<button className='bg-green-400 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300 flex items-center'>
							Get Our Program
							<ArrowUpRight className='ml-2' />
						</button>
					</div>
					<div className='md:w-1/2'>
						{/* Placeholder for NFT image */}
						<div className='bg-gray-800 h-80 rounded-lg'></div>
					</div>
				</section>

				<section className='py-20'>
					<h2 className='text-4xl font-bold mb-12 text-center'>Get Popular Nft Here</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[
							{ color: 'bg-purple-600', price: '3.4 ETH' },
							{ color: 'bg-red-600', price: '4.9 ETH' },
							{ color: 'bg-orange-600', price: '7.8 ETH' },
							{ color: 'bg-yellow-600', price: '2.0 ETH' },
							{ color: 'bg-blue-600', price: '3.8 ETH' },
							{ color: 'bg-indigo-600', price: '5.1 ETH' },
						].map((item, index) => (
							<div key={index} className={`${item.color} p-6 rounded-lg`}>
								<div className='bg-gray-800 h-40 rounded-lg mb-4'></div>
								<div className='flex justify-between items-center'>
									<span>Clonex #{index + 1}</span>
									<span>{item.price}</span>
								</div>
								<button className='mt-4 w-full bg-white text-black py-2 rounded-full hover:bg-gray-200 transition duration-300'>
									Buy Now
								</button>
							</div>
						))}
					</div>
				</section>

				<section className='py-20'>
					<h2 className='text-4xl font-bold mb-12 text-center'>FAQ</h2>
					<div className='space-y-6'>
						{[
							'NFT FAQ: The ultimate guide for your questions',
							'Who Are We?',
							"We're with you the entire way.",
							'Participate in our NFT Educational Program',
						].map((item, index) => (
							<div key={index} className='border-b border-gray-800 pb-6'>
								<button className='flex justify-between items-center w-full text-left'>
									<span className='text-xl font-semibold'>{item}</span>
									<ChevronDown />
								</button>
							</div>
						))}
					</div>
				</section>

				<section className='py-20 bg-green-400 rounded-lg text-black'>
					<div className='text-center md:flex md:items-center md:justify-between md:text-left'>
						<div className='md:w-1/2 mb-8 md:mb-0'>
							<h2 className='text-4xl font-bold mb-4'>
								Take Your NFT Investment To The Next Level?
							</h2>
							<p>Join our exclusive program and maximize your NFT profits today!</p>
						</div>
						<button className='bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300'>
							Join Now
						</button>
					</div>
				</section>
			</main>

			<footer className='container mx-auto px-4 py-12'>
				<div className='flex flex-col md:flex-row justify-between items-center'>
					<div className='text-green-400 text-2xl font-bold mb-6 md:mb-0'>NFT</div>
					<nav className='flex space-x-6 mb-6 md:mb-0'>
						<Link className='hover:text-green-400' href='#'>
							Information
						</Link>
						<Link className='hover:text-green-400' href='#'>
							Blog
						</Link>
						<Link className='hover:text-green-400' href='#'>
							FAQ
						</Link>
					</nav>
					<div className='flex space-x-4'>
						{/* Placeholder for social media icons */}
						{[1, 2, 3, 4].map(item => (
							<div key={item} className='w-8 h-8 bg-gray-800 rounded-full'></div>
						))}
					</div>
				</div>
				<div className='mt-8 text-center text-gray-600'>© 2023 NFT. All rights reserved.</div>
			</footer>
		</div>
	);
}
