import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate, Link, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

// type Props = {
//     selectedActivity: Activity
//     cancelSelectActivity: () => void;
//     openForm: (id: string) => void;
// }

export default function ActivityDetail() {
// Currently, the "activity" that is passed to ActivityDetail is not changed
// when object is mutated. Since ID is immutable, can use ID of parameter "activity"
// to query the actual database with React Query
//
//Temp fix: just call custom "useActivities" to set list of activities
    //const {activities} = useActivities();
    //const activity = activities?.find(x => x.id === selectedActivity.id);
    
    const navigate = useNavigate();
    const {id} = useParams(); // Must match what we use in createBrowserRouter()
    const {activity, isLoadingActivity} = useActivities(id);

    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity not found</Typography>
    
    return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia 
            component='img'
            src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
            <Typography variant='h5'>{activity.title}</Typography>
            <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
            <Typography variant='body1'>{activity.description}</Typography>
        </CardContent>
        <CardActions>
            {/* <Button onClick={() => openForm(activity.id)}color='primary'>Edit</Button> */}
            {/* Two ways of routing, using "Link" and "useNavigate" */}
            <Button component={Link} to={`/manage/${activity.id}`} color='primary'>Edit</Button>    
            <Button onClick={() => navigate('/activities')} color='inherit'>Cancel</Button>
        </CardActions>
    </Card>    
  )
}