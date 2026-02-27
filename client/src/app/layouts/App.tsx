import { useEffect, useState } from "react";
import axios from "axios";
import { CssBaseline, Container, Box } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

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

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{mt: 3}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </Box>
  )
}

export default App
