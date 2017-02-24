using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NwtProjectServer.Models.ViewModels
{
    public partial class UserViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImageUrl { get; set; }
        public bool DoesCurrentUserFollowThisUser { get; set; }
    }

    public partial class UserViewModel
    {
        public static UserViewModel CreateObjectFromDatabaseObject(ApplicationUser user)
        {
            var newUser = new UserViewModel();
            newUser.Id = user.Id;
            newUser.FirstName = user.FirstName;
            newUser.LastName = user.LastName;
            newUser.ProfileImageUrl = user.ProfileImageUrl;
            if(System.Web.HttpContext.Current.User.Identity.IsAuthenticated)
            {
                // Check if followed
                newUser.DoesCurrentUserFollowThisUser = false;
            }
            else
            {
                newUser.DoesCurrentUserFollowThisUser = false;
            }

            return newUser;
        }
    }
}
