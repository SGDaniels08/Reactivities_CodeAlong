import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  LinearProgress,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

// type Props = {
//   openForm: () => void;
// }

//// Remove all prop drilling when using react router
//export default function NavBar({openForm}: Props) {
export default function NavBar() {
  const {uiStore} = useStore();
  
  // Note, in <MenuBar> below, the Router requires the "component" property
  // And Typescript requires a "to" property to be set, which will be the
  // actual endpoint (for homepage, to='/' ; for activity l ist, to='/activities' )
  //
  // Note the <AppBar> has a "static" position; 
  // this is because the loading bar (<Observer> -> <LinearProgress>)
  // is "relative", and needs a "static" from which to determine its position
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
          position: 'relative'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <MenuItem
                component={NavLink}
                to="/" // Forward slash indicates relative link
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight={"bold"}>
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/activities"
              >
                Activities
              </MenuItemLink>
              <MenuItemLink
                to="/createActivity"
              >
                Create Activity
              </MenuItemLink>
              <MenuItemLink
                to="/counter"
              >
                Counter
              </MenuItemLink>
            </Box>
            <MenuItem>User Menu</MenuItem>
          </Toolbar>
        </Container>
        {/* The following <Observer> component
        
        */}
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress 
              color='secondary'
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4
              }}
            />
          ) : null}
        </Observer>

      </AppBar>
    </Box>
  );
}


// Behind the scenes, React Router assigns a class of "active"
// to the HTML element that is being invoked by the route
// So, when we go to /activities, the corresponding HTML element
// will be marked active, making it visible. If we go to /createActivity,
// then "active" will be applied to that HTML element and removed
// from /activities