import { z } from "zod";
import { requiredString } from "../util/util";

export const editProfile = z.object({
    displayName: requiredString('displayName'),
    bio: requiredString('bio')
})

export type ProfileSchema = z.infer<typeof editProfile>