export default function Header() {
    return (
        <div className='flex absolute w-screen justify-center items-center'>
            <header className='flex justify-end w-full gap-[20px] py-[40px] pr-[200px]'>
                <div className='flex justify-center items-center'>
                    logo
                </div>
                <div className='flex justify-center items-center'>
                    Logo
                </div>
                <div className='w-fill flex flex-row '>
                    <a
                        className='w-full text-white px-[20px] py-[8px] justify-center items-center mr-[-9px]'
                        href='/gallery'
                    >
                        <h6>Devpost</h6>
                    </a>
                    <a
                        className='w-full text-white px-[20px] py-[8px] justify-center items-center'
                        href='/gallery'
                    >
                        <h6>Gallery</h6>
                    </a>
                    <a
                        className='w-full bg-[#6134eb] rounded-full px-[20px] flex justify-center items-center'
                        href='/upload'
                    >
                        <h6>Upload</h6>
                    </a>
                </div>
            </header>
        </div>
    );
};