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
using System.Web.Http.Cors;
using NwtProjectServer.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web;

namespace NwtProjectServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class PinsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        protected UserManager<ApplicationUser> UserManager { get; set; }

        public PinsController()
        {
            this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.db));
        }

        // GET: api/Pins
        public List<PinViewModel> GetPins()
        {
            var pins = db.Pins.ToList();
            return pins.Select(x => PinViewModel.CreateObjectFromDatabaseObject(x)).ToList();
        }

        // GET: api/Pins/5
        [ResponseType(typeof(Pin))]
        public IHttpActionResult GetPin(int id)
        {
            Pin pin = db.Pins.Find(id);
            if (pin == null)
            {
                return NotFound();
            }

            return Ok(pin);
        }

        // PUT: api/Pins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPin(int id, Pin pin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pin.Id)
            {
                return BadRequest();
            }

            db.Entry(pin).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PinExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Pins
        [ResponseType(typeof(Pin))]
        [HttpPost]
        public IHttpActionResult PostPin(CreatePinViewModel model)
        {
            if (String.IsNullOrEmpty(model.Title))
            {
                return BadRequest(ModelState);
            }

            var newPin = new Pin();
            var currentUser = db.Users.Find(User.Identity.GetUserId());

            newPin.Title = model.Title;
            newPin.CreatedBy = currentUser;
            newPin.NumberOfLikes = 0;
            newPin.PostedOn = DateTime.Now;
            newPin.Text = model.Text;
            if(String.IsNullOrEmpty(model.PictureDataUri))
            {
                newPin.ImageUrl = "https://www.arbeidslys.no/templates/newyork/images/no_image.png";
            }
            else
            {
                newPin.ImageUrl = model.PictureDataUri;
            }

            db.Pins.Add(newPin);
            db.SaveChanges();

            return Ok(PinViewModel.CreateObjectFromDatabaseObject(newPin));
        }

        // DELETE: api/Pins/5
        [ResponseType(typeof(Pin))]
        public IHttpActionResult DeletePin(int id)
        {
            Pin pin = db.Pins.Find(id);
            if (pin == null)
            {
                return NotFound();
            }

            if(pin.Comments != null)
            {
                for(var i = 0; i < pin.Comments.Count; i++)
                {
                    db.Comments.Remove(pin.Comments.ElementAt(i));
                }
            }

            db.Pins.Remove(pin);
            db.SaveChanges();

            return Ok(pin);
        }

        [HttpGet]
        public List<PinViewModel> MyPins()
        {
            var currentUser = db.Users.Find(User.Identity.GetUserId());

            if(currentUser != null)
            {
                var query = from pin in db.Pins
                            where pin.CreatedBy.Id == currentUser.Id
                            select pin;
                var pins = query.ToList();
                if (pins != null)
                {
                    return pins.Select(x => PinViewModel.CreateObjectFromDatabaseObject(x)).ToList();
                }
            }

            return null;
        }

        [HttpGet]
        public List<PinViewModel> PinsOfUser(string id)
        {
            if(id == null)
            {
                return null;
            }
            var query = from pin in db.Pins
                        where pin.CreatedBy.Id == id
                        select pin;
            var pins = query.ToList();
            if (pins != null)
            {
                return pins.Select(x => PinViewModel.CreateObjectFromDatabaseObject(x)).ToList();
            }

            return null;
        }

        [HttpPost]
        [ResponseType(typeof(void))]
        public IHttpActionResult LikePin(int id)
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            var dbPin = db.Pins.Find(id);
            if(dbPin == null)
            {
                return NotFound();
            }
            if(user == null || dbPin.UsersThatLikedThisPin.Contains(user))
            {
                return BadRequest();
            }
            dbPin.UsersThatLikedThisPin.Add(user);
            dbPin.NumberOfLikes++;
            db.Entry(dbPin).State = EntityState.Modified;
            db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [ResponseType(typeof(void))]
        public IHttpActionResult UnlikePin(int id)
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            var dbPin = db.Pins.Find(id);
            if (dbPin == null)
            {
                return NotFound();
            }
            if (user == null || !dbPin.UsersThatLikedThisPin.Contains(user))
            {
                return BadRequest();
            }
            dbPin.UsersThatLikedThisPin.Remove(user);
            dbPin.NumberOfLikes--;
            db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteComment(int id)
        {
            var dbComment = db.Comments.Find(id);
            if (dbComment == null)
            {
                return NotFound();
            }
            db.Comments.Remove(dbComment);
            db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult CommentPin(Comment comment)
        {
            var Id = comment.Id;
            var Text = comment.Text;
            var dbPin = db.Pins.Find(Id);
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (dbPin == null)
            {
                return NotFound();
            }
            if(String.IsNullOrEmpty(Text) || user == null)
            {
                return BadRequest(); 
            }
            var newComment = new Comment { Text = Text, CreatedBy = user };
            dbPin.Comments.Add(newComment);
            db.SaveChanges();

            return Ok(CommentViewModel.CreateObjectFromDatabaseObject(newComment));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PinExists(int id)
        {
            return db.Pins.Count(e => e.Id == id) > 0;
        }
    }
}