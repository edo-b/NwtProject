using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NwtProjectServer.Models.ViewModels
{
    public partial class PinViewModel
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime PostedOn { get; set; }
        public int NumberOfLikes { get; set; }
        public UserViewModel CreatedBy { get; set; }
        public List<CommentViewModel> Comments { get; set; }
    }

    public partial class PinViewModel
    {
        public static PinViewModel CreateObjectFromDatabaseObject(Pin pin)
        {
            var newPin = new PinViewModel();

            newPin.Id = pin.Id;
            newPin.ImageUrl = pin.ImageUrl;
            newPin.Title = pin.Title;
            newPin.Text = pin.Text;
            newPin.PostedOn = pin.PostedOn;
            newPin.NumberOfLikes = pin.NumberOfLikes;
            newPin.CreatedBy = UserViewModel.CreateObjectFromDatabaseObject(pin.CreatedBy);
            newPin.Comments = pin.Comments.Select(x => CommentViewModel.CreateObjectFromDatabaseObject(x)).ToList();

            return newPin;
        }
    }
}
