using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            // to create bad request with details use this 
            return BadRequest(new ProblemDetails{Title = "problem"});
        }

        [HttpGet("Unauthorized")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "error 1");
            ModelState.AddModelError("Problem2", "error 2");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("serveeeeeeeeeeeer");
        }
    }
}