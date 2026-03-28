import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

//// All prop drilling removed from components when using React Router

// The following line, and the new parameter in ActivityDashboard(),
// tie this component to the Activity object created in App.tsx

// type Props = {
//     activities: Activity[]
//     selectActivity: (id: string) => void;
//     cancelSelectActivity: () => void;
//     selectedActivity?: Activity;
//     //the above line is also equivalent to:
//     // selectedActivity: Activity | undefined;
//     openForm: (id: string) => void;   // not id? here, because it cannot function without id
//     closeForm: () => void;
//     editMode: boolean
//     //submitForm: (activity: Activity) => void;
//     //deleteActivity: (id: string) => void;
// }

// Don't usually use "props" like below (this is valid code)
// --> export default function ActivityDashboard(props: Props) {
// ...
//                 {props.activities.map((activity) => (
//
// Normally, it will be "destructured" like below
// export default function ActivityDashboard({
//   activities
// , cancelSelectActivity
// , selectActivity
// , selectedActivity
// , openForm
// , closeForm
// , editMode
// //, submitForm
// //, deleteActivity
// }: Props) {
export default function ActivityDashboard() {
  // Can do everything we need without prop drilling
  // by using custom hook, useActivities
  // (previously in App.tsx)
  
  return (
    <Grid container spacing={3}>
        <Grid size={8}>
            <ActivityList 
              //activities={activities}
              //selectActivity={selectActivity}
              //deleteActivity={deleteActivity}
            />
        </Grid>
        <Grid size={4}>
          <ActivityFilters />
        </Grid>
    </Grid>
  )
}