import { Box, Button, Paper, Typography } from "@mui/material";
//import type { SyntheticEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

// type Props = {
//     activity?: Activity
//     closeForm: () => void;
//     //submitForm: (activity: Activity) => void;
// }

export default function ActivityForm() {
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',        // OnSubmit is default; OnTouched will trigger validation when clicking out of form input box
        resolver: zodResolver(activitySchema)
    });
    const navigate = useNavigate();
    const {id} = useParams();   // Pass this to useActivities in order to get activity details
    const {updateActivity, createActivity, activity} = useActivities(id);
    //const navigate = useNavigate();

    // The Activity object is a flat object, but our ActivitySchema includes location as a nested object.
    // Have to make sure you're accounting for which type of Activity you're dealing with
    // and reshape your working object accordingly
    useEffect(() => {
        if(activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                latitude: activity.longitude,
                longitude: activity.longitude
            }
        });
    }, [activity, reset]);

    // The CreateActivityDTO that we send to the server on submit is a flat object,
    // so we need to make sure we're submitting the result in a compatible, flattened form

    const onSubmit = async (data: ActivitySchema) => {
        const {location, ...rest} = data;                   // ...rest will flatten everything from data, except for location
        const flattenedData = {...rest, ...location};       // This will flatten everything and store it in a new variable 
        try {
            if (activity) {
                updateActivity.mutate({...activity, ...flattenedData}, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        } catch (error) {
            console.log(error);
        }

        // Removed for Section 11: Forms
        // event.preventDefault();

        // const formData = new FormData(event.currentTarget);

        // const data: {[key: string]: FormDataEntryValue} = {}
        // formData.forEach((value, key) => {
        //     data[key] = value;
        // });
        // // The 'key' value above will be tied to each form element
        // // Using the 'name' property of the JSX tags below

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
            {/* <TextField 
                {...register('title')} 
                label='Title' 
                defaultValue={activity?.title} 
                error={!!errors.title}
                helperText={errors.title?.message}
            /> */}
            <TextInput label="Title" control={control} name="title" />
            <TextInput label="Description" control={control} name="description" multiline rows={3}  />
            <Box display="flex" gap={3}>
                <SelectInput items={categoryOptions} label="Category" control={control} name="category" />
                <DateTimeInput label="Date" control={control} name="date" />
            </Box>
            {/*<TextInput label="Date" control={control} name="date" />    (could set type="datetime-local", but inconsistent experience across browsers) */}
            <LocationInput control={control} label="Enter the location" name="location" />
            {/* <TextField {...register('description')} label='Description' defaultValue={activity?.description} multiline rows={3} />
            <TextField {...register('category')} label='Category' defaultValue={activity?.category} />
            <TextField {...register('date')} label='Date' type='date'
                defaultValue={activity?.date                                //
                    ? new Date(activity.date).toISOString().split('T')[0]   // Ternary operator to set date in form if not provided
                    : new Date().toISOString().split('T')[0]                //
                } 
            />
            <TextField {...register('city')} label='City' defaultValue={activity?.city} />
            <TextField {...register('venue')} label='Venue' defaultValue={activity?.venue} /> */}
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