import React, { FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { ModeToggle } from '@/components/modeToggle'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

function page() {
 
  return (
    <div >
   <div className='absolute top-0 right-0'><ModeToggle/></div>
  <div className='grid gap-4 m-9 sm:grid-cols-2 grid-cols-1'>
    <div>
      <h1 className='text-4xl text-gray-400'>FlexCount</h1>
      <h2 className='text-gray-400 mt-9'>FlexCount help you to track your reps, weights, and progress effortlessly</h2>
    </div>
    <form action='' className='grid gap-4 m-9'>  
    <Input type='email' placeholder='Email' name='Email'/>
    <Input type='text' placeholder='Password' name='Password'/>
    <Button  type='submit' >signin</Button>
    <Link href='/signup' className='text-green-400'>Create new account</Link>


    </form>
  
  </div>
    
    </div>
  )

}

export default page