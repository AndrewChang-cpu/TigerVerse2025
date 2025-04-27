'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import supabase from '@/api/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import Router from 'next/router';

export default function UploadPage() {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

    const handleChooseImage = () => {
        const uploadImage = async () => {
            if (!image) {
              alert('No image selected')
              return
            }
      
            setLoading(true)
            try {
              // 1. generate a unique filename (you can tweak this)
              const ext = image.name.split('.').pop()
              const fileName = `${uuidv4()}.${ext}`
      
              // 2. upload to your "images" bucket
              const { data, error: uploadError } = await supabase
                .storage
                .from('images')
                .upload(fileName, image, {
                  cacheControl: '3600',
                  upsert: false
                })
      
              if (uploadError) throw uploadError
      
              // 3. get a public URL
              const { publicUrl, error: urlError } = supabase
                .storage
                .from('images')
                .getPublicUrl(data.path)
      
              if (urlError) throw urlError
      
              // 4. inform parent / update UI
              //onFileSelect(publicUrl)
            } catch (err) {
              console.error('Upload error:', err)
              alert('Failed to upload image.')
            } finally {
              setLoading(false)
              console.log('success!')
              Router.push('/gallery');
            }
        }
        uploadImage();
    };

	return (
		<div className='flex flex-col h-screen justify-center items-center'>
            <div className='flex flex-col gap-[20px] w-fill outline-white'>
                <h1>Upload pictures of your friends 😈</h1>
                <ImageUploader onFileSelect={(image: File) => {setImage(image)}}/>
                <button
                    className='bg-[#6134eb] w-full text-white rounded-full'
                    onClick={handleChooseImage}
                >
                    Upload Image
                </button>
            </div>
		</div>
	)
};