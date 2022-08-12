﻿using APCore.Services;
using APCore.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APCore.Models;
using Microsoft.AspNet.OData;

namespace APCore.Controllers
{
    [ApiController]
    public class FlightBagController : ControllerBase
    {

        private readonly IFlightBagService _flightBagService;

        public FlightBagController(IFlightBagService flightBagService)
        {
            _flightBagService = flightBagService;
        }


        [HttpPost]
        [Route("api/dr/save")]
        public async Task<IActionResult> saveDispatchRelease(DSPReleaseViewModel DSPRelease)
        {

            var result = await _flightBagService.SaveRelease(DSPRelease);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }


        [HttpPost]
        [Route("api/EFBBirsStrike/save")]
        public async Task<IActionResult> saveEFBBirdStrike(EFBBirdStrikeViewModel EFBBirdStrike)
        {
            var result = await _flightBagService.SaveEFBBirdStrike(EFBBirdStrike);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }

        [HttpPost]
        [Route("api/EFBOccurrence/save")]
        public async Task<IActionResult> SaveEFBOccurrence(EFBOccurrenceViewModel EFBOccurrence)
        {
            var result = await _flightBagService.SaveEFBOccurrence(EFBOccurrence);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }


        [HttpPost]
        [Route("api/voyage/save")]
        public async Task<IActionResult> saveEFBVoyageReport(EFBVoyageReportViewModel voyage)
        {

            var result = await _flightBagService.SaveEFBVoyageReport(voyage);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }

        [HttpPost]
        [Route("api/asr/save")]
        public async Task<IActionResult> saveEFBASR(EFBASRViewModel EFBASR)
        {
            var result = await _flightBagService.SaveEFBASR(EFBASR);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }

        [HttpPost]
        [Route("api/tocard/save")]
        public async Task<IActionResult> saveTOCard(TOLNDCardViewModel dto)
        {
            var result = await _flightBagService.SaveTOCard(dto);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }


        [HttpGet]
        [EnableQuery()]
        [Route("api/voyage/query")]

        public ActionResult<IQueryable<ViewEFBVoyageReportsAll>> GetVoyageReportsAll()
        {
            return _flightBagService.GetEFBVoyageReportsAll();
        }

        [HttpGet]
        [EnableQuery()]
        [Route("api/voyage/total/query")]

        public ActionResult<IQueryable<ViewEFBVoyageReport >> GetVoyageReportTotal()
        {
            return _flightBagService.GetEFBVoyageReports ();
        }


        [HttpGet]
        [Route("api/getEFBBirdStrikeCAOs")]
        public ActionResult<IQueryable<EFBBirdStrikeCAO>> GetEFBBirdstrikeCAOs()
        {
            return _flightBagService.GetEFBBirdStrikeCAOs();
        }

        [HttpGet]
        [Route("api/getEFBDSPReleases")]
        public ActionResult<IQueryable<ViewEFBDSPRelease>> GetEFBDSPReleases()
        {
            return _flightBagService.GetEFBDSPReleases();
        }


        [HttpGet]
        [Route("api/voyage/flight/{flightId}")]
        public async Task<IActionResult> GetVoyageReportByFlightId(int flightId)
        {
            var result = await _flightBagService.GetEFBVoyageReportByFlightId(flightId);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/dr/flight/{flightId}")]
        public async Task<IActionResult> GetDRByFlightId(int flightId)
        {
            var result = await _flightBagService.GetDRByFlightId(flightId);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/voyage/flight2/{flightId}")]
        public async Task<IActionResult> GetVoyageReportByFlightId2(int flightId)
        {
            //var result = await _flightBagService.GetEFBVoyageReportByFlightId(flightId);
            return Ok(flightId);
        }

        [HttpGet]
        [Route("api/voyage/{Id}")]
        public async Task<IActionResult> GetVoyageReportById(int Id)
        {
            var result = await _flightBagService.GetEFBVoyageReportById(Id);
            return Ok(result);
        }
        [HttpGet]
        [EnableQuery()]
        [Route("api/asr/query")]
        public ActionResult<IQueryable<ViewEFBASR>> GetEFBASRs()
        {
            return _flightBagService.GetEFBASRs();
        }

        //[HttpGet]
        //[EnableQuery()]
        //[Route("api/tocard/query")]
        //public ActionResult<IQueryable<ViewTOLNDCard>> GetTOCards()
        //{
        //    return _flightBagService.GetViewTOLNDCards();
        //}


        [HttpGet]
        [Route("api/asr/view/flight/{flightId}")]
        public async Task<IActionResult> GetASRViewByFlightId(int flightId)
        {
            var result = await _flightBagService.GetEFBASRByFlightId(flightId);
            return Ok(result);
        }
        [HttpGet]
        [Route("api/tocard/view/flight/{flightId}/{type}")]
        public async Task<IActionResult> GetTOLNDCardViewByFlightId(int flightId,string type)
        {
            var result = await _flightBagService.GetTOLNDCardByFlightId(flightId,type);
            return Ok(result);
        }

        [HttpPost]
        [Route("api/asr/flights")]
        public async Task<IActionResult> PostGetEFBASRs(SimpleDto dto)
        {
             
            var result = await _flightBagService.GetEFBASRsByFlightIds(dto.ids);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }
        [HttpPost]
        [Route("api/tocard/flights")]
        public async Task<IActionResult> PostGetTOLNDCards(SimpleDto dto)
        {

            var result = await _flightBagService.GetTOLNDCardsByFlightIds(dto.ids);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }
        [HttpPost]
        [Route("api/vr/flights")]
        public async Task<IActionResult> PostGetEFBVRs(SimpleDto dto)
        {

            var result = await _flightBagService.GetEFBVRsByFlightIds(dto.ids);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }
        [HttpPost]
        [Route("api/dr/flights")]
        public async Task<IActionResult> PostGetDRs(SimpleDto dto)
        {

            var result = await _flightBagService.GetDRsByFlightIds(dto.ids);
            if (!result.IsSuccess)
                return NotFound(result.Errors);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/asr/flight/{flightId}")]
        public async Task<IActionResult> GetASRByFlightId(int flightId)
        {
            var result = await _flightBagService.GetEFBASRByFlightId(flightId);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/tocard/flight/{flightId}/{type}")]
        public async Task<IActionResult> GetTOLNDCardByFlightId(int flightId,string type)
        {
            var result = await _flightBagService.GetTOLNDCardByFlightId(flightId,type);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/getASRById/{Id}")]
        public async Task<IActionResult> GetASRById(int Id)
        {
            var result = await _flightBagService.GetEFBASRById(Id);
            return Ok(result);
        }
        [HttpGet]
        [Route("api/tocard/{Id}")]
        public async Task<IActionResult> GetTOLNDCardById(int Id)
        {
            var result = await _flightBagService.GetTOLNDCardById(Id);
            return Ok(result);
        }
        [HttpGet]
        [Route("api/getBirdStrikeCAOByFlightId/{flightId}")]
        public async Task<IActionResult> GetEFBBirdStrikeCAOByFlightId(int flightId)
        {
            var result = await _flightBagService.GetEFBBirdStrikeCAOByFlightId(flightId);
            return Ok(result);
        }
    }
}
