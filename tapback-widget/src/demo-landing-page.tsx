export default function DemoLandingPage() {
	return (
		<div className='min-h-screen bg-gray-100'>
			{/* Navbar */}
			<nav className='bg-white shadow'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						<div className='flex'>
							<div className='flex-shrink-0'>
								<h1 className='text-xl font-bold text-indigo-600'>SaaSify</h1>
							</div>
							<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
								<a
									href='#'
									className='text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium'>
									Features
								</a>
								<a
									href='#'
									className='text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium'>
									Pricing
								</a>
								<a
									href='#'
									className='text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium'>
									Contact
								</a>
							</div>
						</div>
						<div className='flex items-center'>
							<a
								href='#'
								className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
								Log in
							</a>
							<a
								href='#'
								className='ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500'>
								Sign up
							</a>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<header className='bg-indigo-600 py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h1 className='text-4xl font-bold text-white'>
						Grow Your Business with SaaSify
					</h1>
					<p className='mt-4 text-lg text-indigo-200'>
						The all-in-one platform to manage your business, scale, and grow
						faster than ever.
					</p>
					<div className='mt-8'>
						<a
							href='#'
							className='px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50'>
							Get Started
						</a>
					</div>
				</div>
			</header>

			{/* Features Section */}
			<section className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl font-bold text-gray-800'>
						Why Choose SaaSify?
					</h2>
					<p className='mt-4 text-gray-500'>
						A feature-rich platform built to scale with your business.
					</p>
					<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='bg-white shadow p-6 rounded-lg'>
							<h3 className='text-xl font-semibold text-gray-800'>
								User-Friendly Interface
							</h3>
							<p className='mt-4 text-gray-500'>
								Intuitive design that’s easy to navigate for anyone.
							</p>
						</div>
						<div className='bg-white shadow p-6 rounded-lg'>
							<h3 className='text-xl font-semibold text-gray-800'>
								Advanced Analytics
							</h3>
							<p className='mt-4 text-gray-500'>
								Get deep insights into your data with detailed analytics.
							</p>
						</div>
						<div className='bg-white shadow p-6 rounded-lg'>
							<h3 className='text-xl font-semibold text-gray-800'>
								Scalable Infrastructure
							</h3>
							<p className='mt-4 text-gray-500'>
								Easily scale your business without technical hurdles.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-indigo-600 py-16 text-center'>
				<h2 className='text-3xl font-bold text-white'>
					Ready to Transform Your Business?
				</h2>
				<p className='mt-4 text-indigo-200'>
					Sign up today and get a free 30-day trial of SaaSify.
				</p>
				<div className='mt-8'>
					<a
						href='#'
						className='px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50'>
						Start Your Free Trial
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-white py-8'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<p className='text-gray-500'>© 2024 SaaSify. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
