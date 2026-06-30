// General-purpose helper functions

import { format, type DateArg } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>) // DateArg encompassese dates in multiple formats and date types
{
    return format(date, 'dd MMM yyyy h:mm a');
}

// Create function to handle all string validations
export const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`})
                                               .min(1, {error: `${fieldName} is required`})