
'use client';

import { useState, useEffect } from 'react';
import motion from 'framer-motion';
import supabase from '@/api/supabaseClient';

export default function NewImagePage() {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getImage = async () => {
            const { data, error } = await supabase
                .from('global')
                .select('selected_image_url')
                .single();
            if (error) {
                console.error(error);
            } else {
                setImage(data.selected_image_url);
                setLoading(false);
            };
        };
        getImage();
    });

    return (
        <>
            {!loading ? (
                <div className='h-screen flex-col justify-center items-center gap-[20px]'>
                    <h2>Your new enemy is ready</h2>
                    <h5>Jump into the VR game to get fend off this new horde!</h5>
                    <img
                        src={image}
                        alt='new image'
                        width={100}
                    />
                    <div className='flex flex-row'>
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
                    </div>
                </div>
            ) : (
                <div className='h-screen flex justify-center items-center mt-[150px]'>
					<div className="flex items-center">
						<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				</div>
            )}
        </>
    );
};