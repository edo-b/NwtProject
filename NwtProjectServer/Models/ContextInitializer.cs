using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NwtProjectServer.Models
{
    public class ContextInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            if (!context.Comments.Any())
            {
                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new UserManager<ApplicationUser>(userStore);
                var dummyComments = new List<Comment>
                {
                    new Comment { Text = "This is my not so long comment!" },
                    new Comment { Text = "This some comment text!" },
                    new Comment { Text = "Test comment!" },
                    new Comment { Text = "Test comment Test comment!" },
                    new Comment { Text = "Some dummy textttt toi awjo!" },
                    new Comment { Text = "Comment text for test purposes!" },
                    new Comment { Text = "This is my comment!" },
                    new Comment { Text = "This is my short comment!" },
                    new Comment { Text = "Adding annother test comment!" },
                    new Comment { Text = "Dummy comment dummy comment!" },
                    new Comment { Text = "Comment!" }
                };
                var dummyPins = new List<Pin>
                {
                    new Pin { Title = "Test title 1", Text = "Test text 1", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 3, PostedOn = new DateTime(2017, 2, 18) },
                    new Pin { Title = "Test title 2", Text = "Test text 2", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 1, PostedOn = new DateTime(2017, 1, 20) },
                    new Pin { Title = "Test title 3", Text = "Test text 3", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 2) },
                    new Pin { Title = "Test title 4", Text = "Test text 4", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 12) },
                    new Pin { Title = "Test title 5", Text = "Test text 5", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 14) },
                    new Pin { Title = "Test title 6", Text = "Test text 6", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 14) },
                    new Pin { Title = "Test title 7", Text = "Test text 7", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 13) },
                    new Pin { Title = "Test title 8", Text = "Test text 8", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 22) },
                    new Pin { Title = "Test title 9", Text = "Test text 9", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 1, 27) },
                    new Pin { Title = "Test title 10", Text = "Test text 10", ImageUrl = "https://www.w3schools.com/css/trolltunga.jpg", NumberOfLikes = 0, PostedOn = new DateTime(2017, 2, 6) },
                };
                var dummyUsers = new List<ApplicationUser>
                {
                    new ApplicationUser { UserName = "test@example.com", Email = "test@example.com", FirstName = "Test", LastName = "User", ProfileImageUrl = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg" },
                    new ApplicationUser { UserName = "test1@example.com", Email = "test1@example.com", FirstName = "Test", LastName = "User 1", ProfileImageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" },
                    new ApplicationUser { UserName = "test2@example.com", Email = "test2@example.com", FirstName = "Test", LastName = "User 2", ProfileImageUrl = "http://www.ccusersforum.org/images/user.png" },
                    new ApplicationUser { UserName = "test3@example.com", Email = "test3@example.com", FirstName = "Test", LastName = "User 3", ProfileImageUrl = "http://icons.iconarchive.com/icons/hopstarter/scrap/256/User-icon.png" },
                    new ApplicationUser { UserName = "test4@example.com", Email = "test4@example.com", FirstName = "Test", LastName = "User 4", ProfileImageUrl = "http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/256/blue-user-icon.png" },
                    new ApplicationUser { UserName = "test5@example.com", Email = "test5@example.com", FirstName = "Test", LastName = "User 5", ProfileImageUrl = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-39025.jpg" },
                    new ApplicationUser { UserName = "test6@example.com", Email = "test6@example.com", FirstName = "Test", LastName = "User 6", ProfileImageUrl = "http://downloadicons.net/sites/default/files/user-icon-45917.png" },
                    new ApplicationUser { UserName = "test7@example.com", Email = "test7@example.com", FirstName = "Test", LastName = "User 7", ProfileImageUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/User-info.svg/1024px-User-info.svg.png" },
                    new ApplicationUser { UserName = "test8@example.com", Email = "test8@example.com", FirstName = "Test", LastName = "User 8", ProfileImageUrl = "http://colorvisiontesting.com/images/plate%20with%205.jpg" },
                    new ApplicationUser { UserName = "test9@example.com", Email = "test9@example.com", FirstName = "Test", LastName = "User 9", ProfileImageUrl = "https://www.sencha.com/wp-content/uploads/2016/02/icon-sencha-test-studio.png" },
                };
                dummyUsers.ForEach(x => userManager.Create(x, "test"));//svima je sifra test
                dummyPins.ForEach(x => x.Comments = new List<Comment>());

                dummyComments[0].CreatedBy = dummyUsers[0];
                dummyComments[1].CreatedBy = dummyUsers[1];
                dummyComments[2].CreatedBy = dummyUsers[2];
                dummyComments[3].CreatedBy = dummyUsers[3];
                dummyComments[4].CreatedBy = dummyUsers[4];
                dummyComments[5].CreatedBy = dummyUsers[5];
                dummyComments[6].CreatedBy = dummyUsers[6];
                dummyComments[7].CreatedBy = dummyUsers[7];
                dummyComments[8].CreatedBy = dummyUsers[8];
                dummyComments[9].CreatedBy = dummyUsers[9];
                dummyComments[10].CreatedBy = dummyUsers[3];

                dummyPins[0].CreatedBy = dummyUsers[0];
                dummyPins[1].CreatedBy = dummyUsers[0];
                dummyPins[2].CreatedBy = dummyUsers[0];
                dummyPins[3].CreatedBy = dummyUsers[0];
                dummyPins[4].CreatedBy = dummyUsers[1];
                dummyPins[5].CreatedBy = dummyUsers[2];
                dummyPins[6].CreatedBy = dummyUsers[3];
                dummyPins[7].CreatedBy = dummyUsers[4];
                dummyPins[8].CreatedBy = dummyUsers[5];
                dummyPins[9].CreatedBy = dummyUsers[6];

                dummyPins[0].Comments.Add(dummyComments[0]);
                dummyPins[0].Comments.Add(dummyComments[1]);
                dummyPins[0].Comments.Add(dummyComments[2]);
                dummyPins[1].Comments.Add(dummyComments[3]);
                dummyPins[2].Comments.Add(dummyComments[4]);
                dummyPins[2].Comments.Add(dummyComments[5]);
                dummyPins[3].Comments.Add(dummyComments[6]);
                dummyPins[4].Comments.Add(dummyComments[7]);
                dummyPins[6].Comments.Add(dummyComments[8]);
                dummyPins[6].Comments.Add(dummyComments[9]);
                dummyPins[7].Comments.Add(dummyComments[10]);

                context.Comments.AddRange(dummyComments);
                context.Pins.AddRange(dummyPins);
                dummyUsers.ForEach(x => context.Users.Add(x));

                context.SaveChanges();
            }
        }
    }
}
