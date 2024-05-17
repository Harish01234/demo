import React, { useState } from 'react';
import { Button } from './ui/button';
import { User } from '@/model/User';
import { Input } from './ui/input';
import axios from 'axios';

// Define the interface for the exercise object
interface Exercise {
    name: string;
    reps: number;
    weight: number;
    _id: string;
}

// Define the props interface for ExerciseView component
interface ExerciseViewProps {
    exercises: Exercise[];
}

function ExerciseView({ exercises }: ExerciseViewProps) {

    
    const [showForm, setShowForm] = useState(false);
    const [data, setdata] = useState({
        "exerciseId":" ",
        "weight":" ",
        "reps":" "
    })

    const update = (_id: string) => {
        // Implement your logic to update the exercise with the given _id
        console.log(`Clicked on exercise with _id: ${_id}`);


    }
    

    const doubleclick = (_id: string) => {
        // Implement your logic to update the exercise with the given _id
        console.log(`Clicked on exercise with _id: ${_id}`);
        setShowForm(true);

        
        setdata({...data,exerciseId:_id})
        console.log(data);
        


    }

    const onsubmit=()=>{

        axios.post('/api/updatevalue',data).then((res)=>{
            console.log(res.data);
            
        }).catch((error)=>{console.log(error);
        }).finally(
            ()=>{
                setShowForm(false)
                setdata({...data,exerciseId:" ",weight:" ",reps:" "})
                
            }
        )
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 bg-gray-300 rounded-lg shadow-lg text-black"> {/* Ensuring text color is set */}
                <h2 className="text-xl font-bold mb-4">Exercise List</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Reps</th>
                                <th className="px-4 py-2">Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise) => (
                                <tr key={exercise._id} onDoubleClick={() => doubleclick(exercise._id)}>
                                    <td className="border px-4 py-2 text-center">{exercise.name}</td>
                                    <td className="border px-4 py-2 text-center">{exercise.reps}</td>
                                    <td className="border px-4 py-2 text-center">{exercise.weight}</td>
                                    
                                </tr>
                            ))}

                            
                        </tbody>
                    </table>
                </div>

            </div>
            <div>
                {
                    showForm && <form action={onsubmit}>
                        <Input placeholder='weight' name='weight'  onChange={(e)=>setdata({...data,weight:e.target.value})}/>
                        <Input placeholder='reps' name='reps' onChange={(e)=>setdata({...data,reps:e.target.value})}/>
                        <Button type='submit' >change</Button>
                    </form>
                }
            </div>
        </div>
    );
}

export default ExerciseView;
