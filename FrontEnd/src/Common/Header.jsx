import React from 'react'

function Header() {
  return (
    <>
        <div className='w-full bg-black text-white text-center py-2 '>
            <span className='hover:text-gray-400 cursor-pointer'>up to 80 % of</span>
        </div>

        <div className='flex justify-between w-[1000px] mx-auto py-3'>
            <div>VV </div>
            <div>Icons</div>
        </div>

        <div className='bg-black text-white py-2'>
            menu
        </div>
    </>
  )
}

export default Header