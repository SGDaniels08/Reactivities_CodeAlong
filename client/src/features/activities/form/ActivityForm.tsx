import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

// type Props = {
//     activity?: Activity
//     closeForm: () => void;
//     //submitForm: (activity: Activity) => void;
// }

export default function ActivityForm() {
    const {updateActivity, createActivity} = useActivities();
    const activity = {} as Activity;

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: {[key: string]: FormDataEntryValue} = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });
        // The 'key' value above will be tied to each form element
        // Using the 'name' property of the JXS tags below

        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity);
            //closeForm();
        } else {
            await createActivity.mutateAsync(data as unknown as Activity);
            //closeForm();
        }

        //submitForm(data as unknown as Activity);
    }

    return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
            Create activity
        </Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
            <TextField name='title' label='Title' defaultValue={activity?.title} />
            <TextField name='description' label='Description' defaultValue={activity?.description} multiline rows={3} />
            <TextField name='category' label='Category' defaultValue={activity?.category} />
            <TextField name='date' label='Date' type='date'
                defaultValue={activity?.date                                //
                    ? new Date(activity.date).toISOString().split('T')[0]   // Ternary operator to set date in form if not provided
                    : new Date().toISOString().split('T')[0]                //
                } 
            />
            <TextField name='city' label='City' defaultValue={activity?.city} />
            <TextField name='venue' label='Venue' defaultValue={activity?.venue} />
            <Box display='flex' justifyContent='end' gap={3}>
                <Button onClick={() => {}} color='inherit'>Cancel</Button>
                <Button 
                    type='submit' 
                    color='success' 
                    variant='contained'
                    disabled={updateActivity.isPending || createActivity.isPending}
            >Submit</Button>
            </Box>
        </Box>
    </Paper>
  )
}