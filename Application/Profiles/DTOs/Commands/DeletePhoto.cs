using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor,
        IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);   // Not FirstOrDefaultAsync(), because we already have the photos from the db

            if (photo == null) return Result<Unit>.Failure("Cannot find photo", 400);        

            if (photo.Url == user.ImageUrl)
                return Result<Unit>.Failure("Cannot delete main photo", 400);

            // Now delete photo from Cloudinary
            await photoService.DeletePhoto(photo.PublicId);     // Cloudinary ID, will throw exception already if fails

            user.Photos.Remove(photo);      // Remove from user's photo collection

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem deleting photo", 400);
        }
    }
}