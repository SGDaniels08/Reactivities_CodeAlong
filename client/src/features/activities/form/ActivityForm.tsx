import { Box, Button, Paper, TextField, Typography } from "@mui/material";
//import type { SyntheticEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";

// type Props = {
//     activity?: Activity
//     closeForm: () => void;
//     //submitForm: (activity: Activity) => void;
// }

export default function ActivityForm() {
    const { register, reset, handleSubmit, formState: {errors} } = useForm<ActivitySchema>({
        mode: 'onTouched',        // OnSubmit is default; OnTouched will trigger validation when clicking out of form input box
        resolver: zodResolver(activitySchema)
    });
    const {id} = useParams();   // Pass this to useActivities in order to get activity details
    const {updateActivity, createActivity, activity} = useActivities(id);
    //const navigate = useNavigate();

    useEffect(() => {
        if(activity) reset(activity);
    }, [activity, reset]);

    const onSubmit = (data: ActivitySchema) => {
        console.log(data); 
        // Removed for Section 11: Forms
        // event.preventDefault();

        // const formData = new FormData(event.currentTarget);

        // const data: {[key: string]: FormDataEntryValue} = {}
        // formData.forEach((value, key) => {
        //     data[key] = value;
        // });
        // // The 'key' value above will be tied to each form element
        // // Using the 'name' property of the JXS tags below

        // if (activity) {
        //     data.id = activity.id
        //     await updateActivity.mutateAsync(data as unknown as Activity);
        //     navigate(`/activities/${activity.id}`);
        // } else {
        //     await createActivity.mutate(data as unknown as Activity, {
        //         onSuccess: (id) => navigate(`/activities/${id}`)
        //     });
        //     //closeForm();
        // }

        // if (isLoadingActivity) return <Typography>Loading...</Typography>
    }

    return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
            {activity ? 'Edit activity' : 'Create Activity'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
            <TextField 
                {...register('title')} 
                label='Title' 
                defaultValue={activity?.title} 
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField {...register('description')} label='Description' defaultValue={activity?.description} multiline rows={3} />
            <TextField {...register('category')} label='Category' defaultValue={activity?.category} />
            <TextField {...register('date')} label='Date' type='date'
                defaultValue={activity?.date                                //
                    ? new Date(activity.date).toISOString().split('T')[0]   // Ternary operator to set date in form if not provided
                    : new Date().toISOString().split('T')[0]                //
                } 
            />
            <TextField {...register('city')} label='City' defaultValue={activity?.city} />
            <TextField {...register('venue')} label='Venue' defaultValue={activity?.venue} />
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