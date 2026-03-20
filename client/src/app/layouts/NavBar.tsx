import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

// type Props = {
//   openForm: () => void;
// }

//// Remove all prop drilling when using react router
//export default function NavBar({openForm}: Props) {
export default function NavBar() {
  // Note, in <MenuBar> below, the Router requires the "component" property
  // And Typescript requires a "to" property to be set, which will be the
  // actual endpoint (for homepage, to='/' ; for activity list, to='/activities' )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
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
            </Box>
            <MenuItem>User Menu</MenuItem>
          </Toolbar>
        </Container>
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