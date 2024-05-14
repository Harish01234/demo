"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { ModeToggle } from '@/components/modeToggle'

import connectDb from '@/lib/connectDb'
import { Button } from '@/components/ui/button'
import { User } from '@/model/User'
import axios from 'axios'
import { error } from 'console'

function page() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const loginhandler=()=>{
        console.log(user);
        axios.post('/api/signup',user)
    }    



  return (
    <div >
  <div className='absolute top-0 right-0'><ModeToggle/></div>
  <div className='grid gap-4 m-9 sm:grid-cols-2 grid-cols-1'>
    <div>
      <h1 className='text-4xl text-gray-400'>FlexCount</h1>
      <h2 className='text-gray-400 mt-9'>FlexCount help you to track your reps, weights, and progress effortlessly</h2>
    </div>
    <form action={loginhandler} className='grid gap-4 m-9'>
    <h2>do sign up</h2>  
    <Input type='text' placeholder='Username' name='Username'  onChange={(e)=>setUser({...user,username:e.target.value})}/>
    <Input type='email' placeholder='Email' name='Email'  onChange={(e) => setUser({...user, email: e.target.value})}/>
    <Input type='text' placeholder='Password' name='Password'  onChange={(e) => setUser({...user, password: e.target.value})}/>
    <Button type='submit' >signup</Button>


    </form>
  
  </div>
    
    </div>
  )
}

export default page