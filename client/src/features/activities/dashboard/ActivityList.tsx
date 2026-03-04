import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}   

export default function ActivityList({activities, selectActivity, deleteActivity}: Props) {
  return (
//  You can use parentheses or curly brackets in the arrow function
//  If you use curly brackets, you must include a return statement
//  Curly brackets useful if returning multiple components
//    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
//        {activities.map(activity =>{
//            return <ActivityCard />
//        })}
//    </Box>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {activities.map(activity =>(
            <ActivityCard 
                key={activity.id} 
                activity={activity} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
            />
        ))}
        
    </Box>
  )
}