using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace NwtProjectServer.Models.ViewModels
{
    public class CreatePinViewModel
    {
        public HttpPostedFile PictureFile { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
