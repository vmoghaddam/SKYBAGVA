using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APCore.Models;
using APCore.Objects;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace APCore.Services
{


    public interface IMBService
    {
        public Task<DataResponse> MassBalance(dynamic dto, int flightId);
        public Task<DataResponse> GetLimitation(int registerId);
        public Task<DataResponse> GetLoadsheet(int flightId);

    }

    public class MBService : IMBService
    {


        private readonly ppa_cspnContext _context;

        public MBService(ppa_cspnContext context)
        {
            _context = context;
            _context.ChangeTracker.LazyLoadingEnabled = false;
        }




        public async Task<DataResponse> MassBalance(dynamic dto, int flightId)
        {

            var entity = _context.FlightInformations.SingleOrDefault(q => q.ID == flightId);

            if (entity == null)
                return new DataResponse() { IsSuccess = false, Data = "There is no flight" };





            var pantries = _context.MBPantryIndices.Where(q => q.RegisterID == entity.RegisterID).ToList();
            var indexs = _context.MBAircraftIndices.FirstOrDefault(q => q.RegisterId == entity.RegisterID);
            var fuelIndexs = _context.MBFuelIndices.Where(q => q.RegisterID == entity.RegisterID).ToList();
            var stabTrims = _context.MBStabTrims.Where(q => q.RegisterID == entity.RegisterID).ToList();

            for (int i = 0; i < pantries.Count(); i++)
            {
                if (pantries[i].CockpitCrew == Convert.ToInt32(dto.Pilot) && pantries[i].CabinCrew == Convert.ToInt32(dto.Cabin) && pantries[i].PantryCode == Convert.ToString(dto.PantryCode))
                {
                    entity.DOW = pantries[i].DOW;
                    entity.DOI = pantries[i].DOI;
                    break;
                }
            }

            entity.CARGO = dto.CARGO;
            entity.PantryCode = dto.PantryCode;
            entity.CPT1 = dto.CPT1;
            entity.CPT2 = dto.CPT2;
            entity.CPT3 = dto.CPT3;
            entity.CPT4 = dto.CPT4;
            entity.OASec = dto.OASec;
            entity.OBSec = dto.OBSec;
            entity.OCSec = dto.OCSec;
            entity.ODSec = dto.ODSec;
            entity.FSO = dto.FSO;
            entity.FM = dto.FM;
            entity.MAXTOW = dto.MAXTOW;
            entity.PaxAdult = dto.PaxAdult;
            entity.PaxChild = dto.PaxChild;
            entity.PaxInfant = dto.PaxInfant;
            entity.Pilot = dto.Pilot;
            entity.Cabin = dto.Cabin;
            entity.TTL = ((dto.PaxAdult + dto.FM + dto.FSO) * 84) + (dto.PaxChild * 35) + entity.CARGO;
            entity.ZFW = entity.TTL + entity.DOW;
            entity.TOW = entity.ZFW + entity.FPFuel;
            entity.LNW = entity.TOW - entity.FPTripFuel;

            var cabinIndex = (dto.OASec * indexs.OASec + dto.OBSec * indexs.OBSec + dto.OCSec * indexs.OCSec + dto.ODSec * indexs.ODSec) * 84;
            var cargoIndex = dto.CPT1 * indexs.CPT1 + dto.CPT2 * indexs.CPT2 + dto.CPT3 * indexs.CPT3 + dto.CPT4 * indexs.CPT4;
            entity.LIZFW = cabinIndex + cargoIndex + entity.DOI;


            var ldgFuel = entity.FPFuel - entity.FPTripFuel;
            decimal? TOFuelIndex = 0;
            decimal? LDGFuelIndex = 0;
            for (int i = 0; i <= fuelIndexs.Count(); i++)
            {
                if (entity.FPFuel < fuelIndexs[i].Weight)
                {
                    TOFuelIndex = (entity.FPFuel - fuelIndexs[i - 1].Weight) * (fuelIndexs[i].Index - fuelIndexs[i - 1].Index) / (fuelIndexs[i].Weight - fuelIndexs[i - 1].Weight) + fuelIndexs[i - 1].Index;
                    break;
                }

            }

            entity.LITOW = entity.LIZFW + TOFuelIndex;

            for (int i = 0; i <= fuelIndexs.Count(); i++)
            {
                if (ldgFuel < fuelIndexs[i].Weight)
                {
                    LDGFuelIndex = (ldgFuel - fuelIndexs[i - 1].Weight) * (fuelIndexs[i].Index - fuelIndexs[i - 1].Index) / (fuelIndexs[i].Weight - fuelIndexs[i - 1].Weight) + fuelIndexs[i - 1].Index;
                    break;
                }

            }

            entity.LILNW = entity.LIZFW + LDGFuelIndex;


            entity.MACZFW = (30000 * (entity.LIZFW - 40) / entity.ZFW + 648.5m - 625.6m) / (134.5m / 100);
            entity.MACTOW = (30000 * (entity.LITOW - 40) / entity.TOW + 648.5m - 625.6m) / (134.5m / 100);
            entity.MACLNW = (30000 * (entity.LILNW - 40) / entity.LNW + 648.5m - 625.6m) / (134.5m / 100);
            entity.DLI = (30000 * (entity.DOI - 40) / entity.DOW + 648.5m - 625.6m) / (134.5m / 100);




            for (int i = 0; i <= stabTrims.Count(); i++)
            {
                if (entity.MACTOW < stabTrims[i].MAC)
                {
                    entity.StabTrimFive = (entity.MACTOW - stabTrims[i - 1].MAC) * (stabTrims[i].FlapFive - stabTrims[i - 1].FlapFive) / (stabTrims[i].MAC - stabTrims[i - 1].MAC) + stabTrims[i - 1].FlapFive;
                    entity.StabTrimFifteen = (entity.MACTOW - stabTrims[i - 1].MAC) * (stabTrims[i].FlapFifteen - stabTrims[i - 1].FlapFifteen) / (stabTrims[i].MAC - stabTrims[i - 1].MAC) + stabTrims[i - 1].FlapFifteen;
                    break;
                }

            }


            var saveResult = await _context.SaveAsync();
            var result = _context.ViewMBs.SingleOrDefault(q => q.FlightId == flightId);
            if (saveResult.Succeed)
                return new DataResponse() { IsSuccess = true, Data = result };
            else
                return new DataResponse() { IsSuccess = false };

        }


        public async Task<DataResponse> GetLimitation(int registerId)
        {
            var result = _context.Ac_MSNs.SingleOrDefault(q => q.ID == registerId);
            return new DataResponse() { IsSuccess = true, Data = result };
        }

        public async Task<DataResponse> GetLoadsheet(int flightId)
        {
            var entity = _context.ViewMBs.SingleOrDefault(q => q.FlightId == flightId);
            return new DataResponse() { IsSuccess = true, Data = entity };

        }

    }
}
