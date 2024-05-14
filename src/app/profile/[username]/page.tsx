"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

function Page() {
  const params = useParams<{ username: string }>();
  const email = params.username;
  const emailWithoutPercentEncoding = decodeURIComponent(email);
  const [data, setdata] = useState({
    email:emailWithoutPercentEncoding,
    name:'',
    reps:'',
    weight:''
  })
    const add=async()=>{
      console.log(data);
      try {
       await axios.post('/api/addexercise',data).then(()=>{console.log("exercise added");
        }).catch(()=>{console.log("unable to add exercise");
        })
      } catch (error) {
        
      }
      
    }

  return (
    <div>
      <div className='text-3xl text-violet-400'>welcome:{emailWithoutPercentEncoding}</div>
      <div>
       <form action={add}>
        <Input placeholder='exercise name' name='name'  onChange={(e) => setdata({ ...data, name: e.target.value })} />
        <Input placeholder='weight' name='weight'  onChange={(e) => setdata({ ...data, weight: e.target.value })}/>
        <Input placeholder='reps' name='reps'  onChange={(e) => setdata({ ...data, reps: e.target.value })}/>
        <Button >add exercise</Button>
       </form>
      </div>

    </div>
  )
}

export default Page