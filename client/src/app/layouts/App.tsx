import { useState} from "react";
import { CssBaseline, Container, Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);    // Native react state management if not using React Query
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();

// Activity object needed in ActivityDashboard.tsx
// Could move creation of "activities" bject to that file,
// but new activities are created through button on NavBar
// We want those activities to be accessible for display immediately
// Must be accessible at a high enough level (above NavBar)
// For short-term, activity creation logic stays here

  // When including a function inside another function, Udemy author
  // recommends making internal function an arrow function.
  // Not required, just style recommendation
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  // Takes a nullable parameter because it is used for
  // creating a new activity as well as editing an existing one
  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

const handleFormClose = () => {
  setEditMode(false);
}

// const handleSubmitForm = (activity: Activity) => {
//   // if (activity.id) {
//   //   setActivities(activities.map(x => x.id === activity.id ? activity : x))
//   // } else {
//   //   const newActivity = {...activity, id: activities.length.toString()}
//   //   setSelectedActivity(newActivity);
//   //   setActivities([...activities, newActivity]) // The three-dot notation put everything in the attached object into an array
//   // }
//   // Placeholder during dev
//   console.log(activity);
//   setEditMode(false);
// }

//const handleDelete = (id: string) => {
//  //setActivities(activities.filter(x => x.id !== id))
//  console.log(id);
//}

  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{mt: 3}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard 
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            //submitForm={handleSubmitForm}
            //deleteActivity={handleDelete}
          />
        )}

      </Container>
    </Box>
  )
}

export default App
