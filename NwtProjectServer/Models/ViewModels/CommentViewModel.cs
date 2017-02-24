using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NwtProjectServer.Models.ViewModels
{
    public partial class CommentViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public UserViewModel CreatedBy { get; set; }
    }

    public partial class CommentViewModel
    {
        public static CommentViewModel CreateObjectFromDatabaseObject(Comment comment)
        {
            var newComment = new CommentViewModel();
            newComment.Id = comment.Id;
            newComment.Text = comment.Text;
            newComment.CreatedBy = UserViewModel.CreateObjectFromDatabaseObject(comment.CreatedBy);

            return newComment;
        }
    }
}
