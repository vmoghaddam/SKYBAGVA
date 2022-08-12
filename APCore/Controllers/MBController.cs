using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APCore.Services;
using Microsoft.AspNetCore.Mvc;
using APCore.Objects;


namespace APCore.Controllers
{
    [ApiController]
    public class MBController : ControllerBase
    {
        private IMBService _mbService;
        public MBController(IMBService mbService)
        {
            _mbService = mbService;
        }

        [HttpPost]
        [Route("api/save/loadsheet/{flightId}")]
        public async Task<IActionResult> MassBalance(dynamic dto, int flightId)
        {
            var result = _mbService.MassBalance(dto, flightId);
            return Ok(result);
        }


        [HttpGet]
        [Route("api/get/limitation/{registerId}")]
        public async Task<IActionResult> GetLimitation(int registerId) 
        {
            var result = _mbService.GetLimitation(registerId);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/get/loadsheet/{flightId}")]
        public async Task<IActionResult> getLoadsheet(int flightId) 
        {
            var result = _mbService.GetLoadsheet(flightId);
            return Ok(result);
        }



    }
}
