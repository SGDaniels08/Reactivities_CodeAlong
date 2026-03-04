import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

// The following line, and the new parameter in ActivityDashboard(),
// tie this component to the Activity object created in App.tsx

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    //the above line is also equivalent to:
    // selectedActivity: Activity | undefined;
    openForm: (id: string) => void;   // not id? here, because it cannot function without id
    closeForm: () => void;
    editMode: boolean
}

// Don't usually use "props" like below (this is valid code)
// --> export default function ActivityDashboard(props: Props) {
// ...
//                 {props.activities.map((activity) => (
//
// Normally, it will be "destructured" like below
export default function ActivityDashboard({
  activities
, cancelSelectActivity
, selectActivity
, selectedActivity
, openForm
, closeForm
, editMode
}: Props) {
  return (
    <Grid container spacing={3}>
        <Grid size={7}>
            <ActivityList 
              activities={activities}
              selectActivity={selectActivity}
            />
        </Grid>
        <Grid size={5}>
          {selectedActivity && !editMode &&
            <ActivityDetail
              activity={selectedActivity} 
              cancelSelectActivity={cancelSelectActivity}
              openForm={openForm}

            />
          }
          {editMode &&
          <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
        </Grid>
    </Grid>
  )
}