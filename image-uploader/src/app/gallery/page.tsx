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
			}
		};
		fetchImages();
	}, []) 

    return (
        <div className='flex flex-col h-full px-[200px] py-[100px]'>
            <h2>Gallery</h2>
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
    );
};