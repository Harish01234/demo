import dbConnect from "@/lib/connectDb";
import { User } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    
    const reqBody=await request.json()
    const {email}=reqBody


    try {
        
        const user = await User.findOne({ email }).exec();
        
            
    if (!user) {
        return Response.json(
          { message: 'User not found', success: false },
          { status: 404 }
        );
      }

      const data=user.exercises
      console.log(data[0]);
      return Response.json(
        { message: 'exercise get succesfully', success: true,data },
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
