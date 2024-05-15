import dbConnect from "@/lib/connectDb";
import { User } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const reqBody = await request.json();
    const { exerciseId, weight, reps } = reqBody;

    if (!exerciseId || !weight || !reps) {
        return Response.json({ message: 'Please provide all the required fields', success: false }, { status: 400 });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { 'exercises._id': exerciseId }, // Filter condition
            { $set: { 'exercises.$.weight': weight, 'exercises.$.reps': reps } }, // Update operation
            { new: true }
        );

        if (!updatedUser) {
            console.log("Exercise not found");
            return Response.json({ message: 'Exercise not found', success: false }, { status: 404 });
        }

        return Response.json({ message: 'Exercise value updated successfully', success: true, updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating exercise:", error);
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
}
