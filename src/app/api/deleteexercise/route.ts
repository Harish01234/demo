import dbConnect from "@/lib/connectDb";
import { User } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const reqBody = await request.json();
    const { email, _id } = reqBody;

    if (!_id) {
        return Response.json({ message: 'Object ID not provided', success: false }, { status: 400 });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return Response.json({ message: 'User not found', success: false }, { status: 404 });
        }

        // Delete the object within the user's document
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id, 'exercises._id': _id },
            { $pull: { exercises: { _id: _id } } },
            { new: true }
        );

        if (!updatedUser) {
            console.log("Object not found in user's exercises");
            return Response.json({ message: 'Object not found in user\'s exercises', success: false }, { status: 404 });
        }

        console.log("Object deleted from user's exercises:", updatedUser);
        return Response.json({ message: 'Object deleted successfully from user\'s exercises', success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting object from user's exercises:", error);
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
}
