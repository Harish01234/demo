"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { ModeToggle } from '@/components/modeToggle'
import Link from 'next/link'
import {useRouter} from "next/navigation";


import { Button } from '@/components/ui/button'
import axios from 'axios'

function Page() {

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",

  })
  const signinhandler = () => {
    console.log(user);
    try {
     const response= axios.post('/api/signin', user)
     console.log(response);
     response.then((res)=>{ router.push(`/profile/${user.email}`)}).catch((err)=>{console.log(err);
     })
     
   
    } catch (error:any) {
      throw new Error(error)
    }
  }


  return (
    <div >
      <div className='absolute top-0 right-0'><ModeToggle /></div>
      <div className='grid gap-4 m-9 sm:grid-cols-2 grid-cols-1'>
        <div>
          <h1 className='text-4xl text-gray-400'>FlexCount</h1>
          <h2 className='text-gray-400 mt-9'>FlexCount help you to track your reps, weights, and progress effortlessly</h2>
        </div>
        <form action={signinhandler} className='grid gap-4 m-9'>
          <Input type='email' placeholder='Email' name='Email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <Input type='text' placeholder='Password' name='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
          <Button type='submit' >signin</Button>
          <Link href='/signup' className='text-green-400'>Create new account</Link>


        </form>

      </div>

    </div>
  )

}

export default Page