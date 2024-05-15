"use client"
import ExerciseView from '@/components/excerciseviwe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { error } from 'console';
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

  const [viewdata, setViewData] = useState([]); 
    const add=async()=>{
      console.log(data);
      try {
       await axios.post('/api/addexercise',data).then(()=>{console.log("exercise added");
        }).catch(()=>{console.log("unable to add exercise");
        })
      } catch (error:any) {
        throw new Error(error)
      }
      
    }

    

    const viewexercisedata=async()=>{
     const newdata={email:emailWithoutPercentEncoding}
     await axios.post('/api/getexercise',newdata).then((res)=>{
      const exercises=res.data
      const viewdata=exercises.data
      console.log(viewdata[0]);
      
     setViewData(res.data.data)

      
     }).catch((error)=>{
      console.log(error);
      
     })

     


      
    }



  return (
    <div>
      <div className='text-3xl text-violet-400'>welcome:{emailWithoutPercentEncoding}</div>
      <div>
       <form action={add}  className='grid gap-4 m-9'>
        <Input placeholder='exercise name' name='name'  onChange={(e) => setdata({ ...data, name: e.target.value })} />
        <Input placeholder='weight' name='weight'  onChange={(e) => setdata({ ...data, weight: e.target.value })}/>
        <Input placeholder='reps' name='reps'  onChange={(e) => setdata({ ...data, reps: e.target.value })}/>
        <Button >add exercise</Button>
       </form>
      </div>
      <div>
        

        <Button onClick={viewexercisedata}>view all exercise</Button>
      </div>
      <ExerciseView exercises={viewdata} />


    </div>
  )
}

export default Page