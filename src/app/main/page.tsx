import React from 'react'
import { Input } from "@/components/ui/input"


function page() {
  return (
    <div className=''>
    <div><Input placeholder='username'/></div>
    <div><Input placeholder='email'/></div>
    <div><Input placeholder='password'/></div>
    <div><Input placeholder='state'/></div>
    </div>
  )
}

export default page