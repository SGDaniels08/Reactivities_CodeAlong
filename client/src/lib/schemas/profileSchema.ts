import { z } from "zod";
import { requiredString } from "../util/util";

export const profileSchema = z.object({
    displayName: requiredString('displayName'),
    bio: requiredString('bio')
})

export type ProfileSchema = z.infer<typeof profileSchema>