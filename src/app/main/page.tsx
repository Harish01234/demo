import React from 'react'
import { Input } from "@/components/ui/input"
import { ModeToggle } from '@/components/modeToggle'

import connectDb from '@/lib/connectDb'

function page() {
  connectDb()
  return (
    <div >
   <div className='absolute top-0 right-0'><ModeToggle/></div>
  
    
    </div>
  )
}

export default page