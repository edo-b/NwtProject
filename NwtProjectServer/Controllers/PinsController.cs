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

namespace NwtProjectServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class PinsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        /// <summary>
        /// User manager - attached to application DB context
        /// </summary>
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
        public IHttpActionResult PostPin(Pin pin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pins.Add(pin);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pin.Id }, pin);
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

            db.Pins.Remove(pin);
            db.SaveChanges();

            return Ok(pin);
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
            if(dbPin.UsersThatLikedThisPin.Contains(user))
            {
                return BadRequest();
            }
            dbPin.UsersThatLikedThisPin.Add(user);
            db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [ResponseType(typeof(void))]
        public IHttpActionResult UnikePin(int id)
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            var dbPin = db.Pins.Find(id);
            if (dbPin == null)
            {
                return NotFound();
            }
            if (!dbPin.UsersThatLikedThisPin.Contains(user))
            {
                return BadRequest();
            }
            dbPin.UsersThatLikedThisPin.Remove(user);
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
        [ResponseType(typeof(void))]
        public IHttpActionResult CommentPin(int id)
        {
            

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

        private bool PinExists(int id)
        {
            return db.Pins.Count(e => e.Id == id) > 0;
        }
    }
}