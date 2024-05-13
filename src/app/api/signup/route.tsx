import connectDb from '@/lib/connectDb'
import {User} from '@/model/User'
import { error } from "console";
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDb()

export async function POST(request:NextRequest)
{
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        //validation
        console.log(reqBody)
        const user=await User.findOne({email})

        if(user)
        {
            return NextResponse.json({error:"user already exits"},{status:400})
        }    

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newUser=new User({
        username,
        email,
        password:hashedPassword
        })

        const savedUser=await newUser.save()
        console.log(savedUser);

        //send verifiaction mail

        
        return NextResponse.json({
            message:"user registered succesfully",
            success:true,savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}