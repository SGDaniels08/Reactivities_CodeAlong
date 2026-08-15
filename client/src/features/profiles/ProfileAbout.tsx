import { Link, useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile } = useProfile(id);

  return (
    <Box>
        <Box display='flex' justifyContent='space-between'>
            <Typography variant="h5">About {profile?.displayName}</Typography>
            <Button
                component={Link}
                to={`/editProfile/${profile?.id}`}
                size="medium"
                variant="contained"
                sx={{display: 'flex', justifySelf: 'self-end', borderRadius: 3}}
            >
                Edit profile
            </Button>
        </Box>
        <Divider sx={{my: 2}} />
        <Box sx={{overflow: 'auto', maxHeight: 350}}>
            <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>
                {profile?.bio || 'No description added yet'}
            </Typography>
        </Box>
    </Box>
  )
}