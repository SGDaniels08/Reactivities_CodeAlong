import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";

// The following line, and the new parameter in ActivityDashboard(),
// tie this component to the Activity object created in App.tsx

type Props = {
    activities: Activity[]
}

// Don't usually use "props" like below (this is valid code)
// --> export default function ActivityDashboard(props: Props) {
// ...
//                 {props.activities.map((activity) => (
//
// Normally, it will be "destructured" like below
export default function ActivityDashboard({activities}: Props) {
  return (
    <Grid container>
        <Grid size={9}>
            <ActivityList activities={activities}/>
        </Grid>
    </Grid>
  )
}