import { CssBaseline, Container, Box } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);    // Native react state management if not using React Query
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);

// Activity object needed in ActivityDashboard.tsx
// Could move creation of "activities" bject to that file,
// but new activities are created through button on NavBar
// We want those activities to be accessible for display immediately
// Must be accessible at a high enough level (above NavBar)
// For short-term, activity creation logic stays here

  // // When including a function inside another function, Udemy author
  // // recommends making internal function an arrow function.
  // // Not required, just style recommendation
  // const handleSelectActivity = (id: string) => {
  //   setSelectedActivity(activities!.find(x => x.id === id));
  // }

  // const handleCancelSelectActivity = () => {
  //   setSelectedActivity(undefined);
  // }

  // // Takes a nullable parameter because it is used for
  // // creating a new activity as well as editing an existing one
  // const handleOpenForm = (id?: string) => {
  //   if (id) handleSelectActivity(id);
  //   else handleCancelSelectActivity();
  //   setEditMode(true);
  // }

//// When adding router, remove all these handle functions, router will take be responsible for these 
// const handleFormClose = () => {
//   setEditMode(false);
// }

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

// When routing, the <Outlet /> component below 
// will be replaced by whatever we route to
  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{mt: 3}}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default App
