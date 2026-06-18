import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

// type Props = {
//     activities: Activity[]
//     selectActivity: (id: string) => void;
//     //deleteActivity: (id: string) => void;
// }   

export default function ActivityList() {
  const {activities, isLoading} = useActivities();

  if (isLoading) return <Typography>Loading...</Typography>

  if (!activities) return <Typography>No activities found</Typography>

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
                //selectActivity={selectActivity}
                //deleteActivity={deleteActivity}
            />
        ))}
        
    </Box>
  )
}