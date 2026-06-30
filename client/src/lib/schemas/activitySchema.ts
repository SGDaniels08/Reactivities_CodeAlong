import { z } from "zod";
import { requiredString } from "../util/util";

// // Create function to handle all string validations
// // Moved to util.ts
// const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`})
//                                                .min(1, {error: `${fieldName} is required`})

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    //date: requiredString('Date'),
    date: z.coerce.date({message: 'Date is required'}),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number()
    })
    // city: requiredString('City'),
    // venue: requiredString('Venue')
})

export type ActivitySchema = z.infer<typeof activitySchema>;