import connectDb from '@/lib/connectDb'
import {User} from '@/model/User'
import { error } from "console";
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDb()
export async function POST(request:NextRequest) {

    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        //validation
        console.log(reqBody);
        const user=await User.findOne({email})
        if(!user)
        {
            return NextResponse.json({error:"user does not exists"},{status:500})
        }    
        console.log("user exists");
       
       const validpassword= await bcryptjs.compare(password,user.password)
       if(!validpassword)
        {
            return NextResponse.json({error:"cheek your credentials"},{status:400})
        }

        const tokendata={
            userid:user._id,
            email:user.email,
            username:user.username
            
        }

        const token=jwt.sign(tokendata,process.env.TOKEN_SECRET!, { expiresIn: '1h' })
        const response=NextResponse.json({
            message:"loged in succes",
            succes:true
        })
        
        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    
}