

using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<ActivityAttendee> Activities { get; set; }
        public ICollection<Photo> Photos {get; set;} //specifies one to many relation ship   as one user may have many photos and each user can have many activities
        public ICollection<UserFollowing> Followings {get; set;}
        public ICollection<UserFollowing> Followers {get; set;}

        
    }
}