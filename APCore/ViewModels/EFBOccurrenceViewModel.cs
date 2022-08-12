﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APCore.ViewModels
{
    public class EFBOccurrenceViewModel
    {
        public int Id { get; set; }
        public int? FlightId { get; set; }
        public int? ReporterId { get; set; }
        public int? OccurrenceTypeId { get; set; }
        public DateTime? OccurrenceDate { get; set; }
        public bool? IsDay { get; set; }
        public string Location { get; set; }
        public string Altitude { get; set; }
        public int? OperatorId { get; set; }
        public int? A_CFlightPhaseId { get; set; }
        public string A_CFlightPhaseRemark { get; set; }
        public string EquipmentType { get; set; }
        public string EquipmentAirportPlacard { get; set; }
        public string EquipmentCompany { get; set; }
        public string EquipmentDriverName { get; set; }
        public string EquipmentIdNO { get; set; }
        public string EquipmentContan { get; set; }
        public int? FatalInjuryCrewNr { get; set; }
        public int? FatalInjuryPassengerNr { get; set; }
        public int? FatalInjuryOtherNr { get; set; }
        public int? SeriousInjuryCrewNr { get; set; }
        public int? SeriousInjuryPassengerNr { get; set; }
        public int? SeriousInjuryOtherNr { get; set; }
        public int? MinorInjuryCrewNr { get; set; }
        public int? MinorInjuryPassengerNr { get; set; }
        public int? MinorInjuryOtherNr { get; set; }
        public int? NoneInjuryCrewNr { get; set; }
        public int? NoneInjuryPassengerNr { get; set; }
        public int? NoneInjuryOtherNr { get; set; }
        public int? DamageId { get; set; }
        public string DamageDetail { get; set; }
        public string PriorEventWX { get; set; }
        public string EventTimeWX { get; set; }
        public string ForcastWX { get; set; }
        public bool? IsExplosivesGoods { get; set; }
        public bool? IsRadioActiveGoods { get; set; }
        public string OtherDangerousGood { get; set; }
        public string EventDescription { get; set; }
    }
}
