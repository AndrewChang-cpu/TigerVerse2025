'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import supabase from '@/api/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
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
                  /*
                  cacheControl: '3600',
                  upsert: <false></false>*/
                  contentType: image.type
                })
      
              if (uploadError) throw uploadError
      
              // 3. get a public URL
              // const { publicUrl } = supabase
              //   .storage
              //   .from('images')
              //   .getPublicUrl(data.path);
      
              // console.log(publicUrl);

              // here insert a new row with the url
              const { data: insertedRow, error: insertError } = await supabase
                .from('images')
                .insert([{ 
                  image_url: `https://qoxgoiqvsrahxvwjeely.supabase.co/storage/v1/object/public/images/${data.path}`
                }])
                .select()
                .single();
      
              // set selected image to this new image_url
                const { data: updateData, error: updateError } = await supabase
                    .from('global')
                    .update({ selected_image_url: `https://qoxgoiqvsrahxvwjeely.supabase.co/storage/v1/object/public/images/${data.path}` })
                    .eq('id', 1);
                if (updateError) {
                    console.error(updateError);
                }
            } catch (err) {
              //console.error('Upload error:', err)
              setLoading(false);
              alert('Failed to upload image.')
            } finally {
              router.push('/new-image');
              setLoading(false)
            }
        }
        uploadImage();
    };



	return (
		<div className='flex flex-col h-screen justify-center items-center'>
            <div className='flex flex-col gap-[20px] w-fill '>
                <h1>Upload a selfie your friend! 😈</h1>
                    <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex flex-col gap-[25px]'>
                        <ImageUploader onFileSelect={(image: File) => {setImage(image)}}/>
                        <button
                        className={`bg-[#6134eb] w-full text-white rounded-full transition-all duration-300 ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleChooseImage}
                        disabled={loading}
                        >
                    <div className="flex items-center justify-center py-2">
                                {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <h5 className='font-light'>Uploading...</h5>
                                </div>
                                ) : (
                                <h5 className='font-light'>Upload Image</h5>
                                )}
                            </div>
                            </button>
                        </div>
                            </div>
                        </div>
		</div>
	)
};