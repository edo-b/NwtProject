using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using NwtProjectServer.Models;
using NwtProjectServer.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace NwtProjectServer.Controllers
{
    public class UsersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        protected UserManager<ApplicationUser> UserManager { get; set; }

        public UsersController()
        {
            this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.db));
        }

        [HttpGet]
        public List<UserViewModel> AllUsers()
        {
            var data = db.Users.ToList();
            return data.Select(x => UserViewModel.CreateObjectFromDatabaseObject(x)).ToList();
        }

        // GET: api/User/5
        [ResponseType(typeof(UserViewModel))]
        [HttpGet]
        public IHttpActionResult GetUser(string id)
        {
            ApplicationUser applicationUser = db.Users.Find(id);
            if (applicationUser == null)
            {
                return NotFound();
            }

            return Ok(UserViewModel.CreateObjectFromDatabaseObject(applicationUser));
        }

        [HttpGet]
        public List<UserViewModel> FollowedUsers()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if(user == null)
            {
                return null;
            }
            var data = user.FollowedUsers.ToList();
            return data.Select(x => UserViewModel.CreateObjectFromDatabaseObject(x)).ToList();
        }

        [HttpGet]
        public List<UserViewModel> UsersByString(string searchString)
        {
            var data = db.Users.Where(x => x.FirstName.Contains(searchString) || x.LastName.Contains(searchString)).ToList();
            return data.Select(x => UserViewModel.CreateObjectFromDatabaseObject(x)).ToList();
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult FollowUser(string id)
        {
            var currentUser = UserManager.FindById(User.Identity.GetUserId());
            var userToFollow = db.Users.Find(id);
            if(currentUser == null || userToFollow == null)
            {
                return BadRequest();
            }
            if (!currentUser.FollowedUsers.Contains(userToFollow))
            {
                currentUser.FollowedUsers.Add(userToFollow);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult UnfollowUser(string id)
        {
            var currentUser = UserManager.FindById(User.Identity.GetUserId());
            var userToUnfollow = db.Users.Find(id);
            if (currentUser == null || userToUnfollow == null)
            {
                return BadRequest();
            }
            if(currentUser.FollowedUsers.Contains(userToUnfollow))
            {
                currentUser.FollowedUsers.Remove(userToUnfollow);
                db.SaveChanges();
            }
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApplicationUserExists(string id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}