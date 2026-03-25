import { Grid, Typography } from "@mui/material"
//import Grid from "@mui/material/Grid"

//import { useNavigate, Link, useParams } from "react-router";
//import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

// type Props = {
//     selectedActivity: Activity
//     cancelSelectActivity: () => void;
//     openForm: (id: string) => void;
// }

export default function ActivityDetailPage() {
// Currently, the "activity" that is passed to ActivityDetail is not changed
// when object is mutated. Since ID is immutable, can use ID of parameter "activity"
// to query the actual database with React Query
//
//Temp fix: just call custom "useActivities" to set list of activities
    // const {activities} = useActivities();
    // const activity = activities?.find(x => x.id === selectedActivity.id);
    
    // const navigate = useNavigate();
    const {id} = useParams(); // Must match what we use in createBrowserRouter()
    const {activity, isLoadingActivity} = useActivities(id);

    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity not found</Typography>
    
     return (
    // <Card sx={{borderRadius: 3}}>
    //     <CardMedia 
    //         component='img'
    //         src={`/images/categoryImages/${activity.category}.jpg`}
    //     />
    //     <CardContent>
    //         <Typography variant='h5'>{activity.title}</Typography>
    //         <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
    //         <Typography variant='body1'>{activity.description}</Typography>
    //     </CardContent>
    //     <CardActions>
    //         {/* <Button onClick={() => openForm(activity.id)}color='primary'>Edit</Button> */}
    //         {/* Two ways of routing, using "Link" and "useNavigate" */}
    //         <Button component={Link} to={`/manage/${activity.id}`} color='primary'>Edit</Button>    
    //         <Button onClick={() => navigate('/activities')} color='inherit'>Cancel</Button>
    //     </CardActions>
    // </Card>
    //
    // Note the "size" property, this controls how many columns are used
    // First one uses 8 of 12 columns, second one contains reminaing columns
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar />
            </Grid>
        </Grid>    
    )
}