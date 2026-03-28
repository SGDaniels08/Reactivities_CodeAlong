// General-purpose helper functions

import { format, type DateArg } from "date-fns";

export function formatDate(date: DateArg<Date>) // DateArg encompassese dates in multiple formats and date types
{
    return format(date, 'dd MMM yyyy h:mm a');
}