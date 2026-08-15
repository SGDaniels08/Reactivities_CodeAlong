import { useForm } from "react-hook-form"
import { profileSchema, type ProfileSchema } from "../../../lib/schemas/profileSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { useProfile } from "../../../lib/hooks/useProfile";

export default function EditProfile() {
    const { control, reset, handleSubmit } = useForm<ProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema)
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { profile, editProfile } = useProfile();
    
    const onSubmit = async (data: ProfileSchema) => {
        const flattenedData = {...data};
        try {
            if (profile) {
                editProfile.mutate({...profile, ...flattenedData}, {
                    onSuccess: () => navigate(`/profiles/${profile.id}`)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>EditProfile</div>
  )
}
