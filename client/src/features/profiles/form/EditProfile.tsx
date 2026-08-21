import { useForm } from "react-hook-form"
import { profileSchema, type ProfileSchema } from "../../../lib/schemas/profileSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { useProfile } from "../../../lib/hooks/useProfile";
import { Box, Button, Paper, Typography } from "@mui/material";
import TextInput from "../../../app/shared/components/TextInput";

export default function EditProfile() {
    const { control, reset, handleSubmit } = useForm<ProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema)
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { profile, editProfile } = useProfile(id);

    const onSubmit = async (data: ProfileSchema) => {
        try {
            console.log('EditProfile onSubmit')
            console.log(data)
            if (profile) {
                editProfile.mutate({id:profile.id, ...data}, {
                    onSuccess: () => navigate(`/profiles/${profile.id}`),
                    onError: (e) => console.log(e)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant='h5' gutterBottom color='primary'>Edit Profile</Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label="Display Name" control={control} name="displayName" />
                <TextInput label="Bio" control={control} name="bio" multiline rows={5} />

                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={() => { }} color='inherit'>Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={editProfile.isPending}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
