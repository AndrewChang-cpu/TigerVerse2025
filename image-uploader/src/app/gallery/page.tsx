'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import supabase from '@/api/supabaseClient';

// list of strings
const dummyImages = [
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
    '/maanav.png',
];

const containerVariants = {
    hidden: {}, // we don’t need to animate the container itself
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0 }
};

export default function GalleryPage() {
	const [images, setImages] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchImages = async () => {
			const { data, error } = await supabase
				.from('images')
				.select('*');
			if (error) {
				console.error('Error fetching images:', error.message);
			} else if (data) {
				const urls = data.map((item: { image_url: string }) => item.image_url);
				setImages(urls);
				setLoading(false)
			}
		};
		fetchImages();
	}, []) 

    return (
		<>
			{!loading ? (
			<div className='flex flex-col h-full px-[200px] py-[100px] gap-[20px]'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='gap-[5px]'
				>
					<h2>Gallery</h2>
					<h5>Try these images out in the VR game itself!</h5>
				</motion.div>
				{images.length > 0 && (
					<motion.div
						className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-12"
						variants={containerVariants}
						initial="hidden"
						animate="show"
					>
						{images.map((imageUrl, index) => (
						<motion.div 
							key={index} 
							variants={cardVariants}
							className=""
						>
							<img
								src={imageUrl}
								alt={`image_${index}`}
								width={200}
							/>
						</motion.div>
						))}
					</motion.div>
				)}
			</div>
			) : (
				<motion.div 
					className='flex flex-col justify-center items-center pt-[200px]'
					variants={cardVariants}
				>
					<div className="flex items-center">
						<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				</motion.div>
			)}
		</>
    );
};