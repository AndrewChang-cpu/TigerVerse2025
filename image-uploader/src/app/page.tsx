'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion'; // Add this import
import FloatingEmojis from "@/components/FloatingEmojis";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	
	// Text animation variants
	const textVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			filter: "blur(8px)",
		},
		visible: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				duration: 0.8,
				ease: "easeOut",
			}
		}
	};
	
	// Stagger the animations
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	return (

			<div className='flex h-screen justify-center items-center px-[100px]'>
				<div className='flex flex-row gap-10px] w-full'> 
					<motion.div 
						className='flex flex-col justify-center gap-[30px]'
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.h1 variants={textVariants}>
							Get smashing with new kinds of fun!
						</motion.h1>
						
						<motion.h5 variants={textVariants}>
							Upload pictures of your friends and fight them in an arcade adventure!
						</motion.h5>
						
						<motion.div 
							className='flex flex-row gap-[50px]'
							variants={textVariants}
						>
							<a
								className='bg-white rounded-full text-black  px-[40px]'
								href='/gallery'
							>
								<h5>Gallery</h5>
							</a>
							<a
								className='bg-[#6134eb] rounded-full px-[40px]'
								href='/upload'
							>
								<h5>Upload</h5>
							</a>
						</motion.div>
					</motion.div>
			</div>
			<div className='w-full' ref={containerRef}>
				<FloatingEmojis containerRef={containerRef} />
			</div>
		</div>
	);
};