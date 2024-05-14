import connectDb from '@/lib/connectDb'
import {User} from '@/model/User'
import { error } from "console";
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDb()
export async function POST(request:NextRequest) {

    
    const reqBody=await request.json()
    const {email,name,reps,weight}=reqBody
    try {
        const user = await User.findOne({ email }).exec();

        
    if (!user) {
        return Response.json(
          { message: 'User not found', success: false },
          { status: 404 }
        );
      }

      const newExercise = { name,reps,weight };
      user.exercises.push(newExercise)
      await user.save();
      
    return Response.json(
        { message: 'exercise added successfully', success: true },
        { status: 201 }
      );

    } catch (error) {
        
        console.error('Error adding message:', error);
        return Response.json(
          { message: 'Internal server error', success: false },
          { status: 500 }
        );
    }



}