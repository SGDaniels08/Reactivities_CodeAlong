import { ImageList, ImageListItem, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

export default function ProfilePhotos() {
  const { id } = useParams();
  const { photos, loadingPhotos } = useProfile(id);

  if (loadingPhotos) return <Typography>Loading photos...</Typography>;

  if (!photos || photos.length === 0)
    return <Typography>No photos found for this user</Typography>;

  return (
    <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
      {photos.map((item) => (
        <ImageListItem key={item.id}>
          <img
            srcSet={`${item.url.replace(
                '/upload/',
                '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'       // Cloudinary transformations, infixed to image URL
            )}`}
            src={`${item.url.replace(
                '/upload/',
                '/upload/w_164,h_164,c_fill,f_auto,g_face/'
            )}`}
            alt={'user profile image'}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
