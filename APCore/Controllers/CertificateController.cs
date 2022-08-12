using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using APCore.Models;
using APCore.Services;
using APCore.ViewModels;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APCore.Controllers
{
    
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private ICertificateService _certificateService;

        public CertificateController(ICertificateService certificateService)
        {

            _certificateService = certificateService;
        }
        [HttpGet]
        //[Authorize]
        [Route("api/crew/certificates/{id}")]
        public async Task<IActionResult> GetCrewCertificates(int id)
        {
            
            var result = await _certificateService.GetCrewCertificates(id);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }
        [HttpGet]
        //[Authorize]
        [Route("api/crew/profile/{id}")]
        public async Task<IActionResult> GetCrewProfile(int id)
        {

            var result = await _certificateService.GetCrewProfile(id);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }
        [HttpGet]
        //[Authorize]
        [Route("api/crew/certificates/grouped/{id}")]
        public async Task<IActionResult> GetCrewGroupedCertificates(int id)
        {

            var result = await _certificateService.GetCrewGroupedCertificates(id);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/expiring/certificates")]
        public async Task<IActionResult> GetExpiringCertificates()
        {

            var result = await _certificateService.GetExpiringCertificates();
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }



    }
}
