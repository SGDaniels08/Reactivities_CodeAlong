import { useEffect, useState } from "react";
import axios from "axios";
import { CssBaseline, Container, Box } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {}
  }, [])

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
    setSelectedActivity(activities.find(x => x.id === id));
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


  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{mt: 3}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />
      </Container>
    </Box>
  )
}

export default App
