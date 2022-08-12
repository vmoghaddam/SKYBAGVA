﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APCore.ViewModels
{
    public class SimpleDto {
        public List<int> ids { get;set; }
    }
    public class EFBASRViewModel
    {
        
        public int FlightId { get; set; }
        public int? EventTypeId { get; set; }
        //public DateTime? OccurrenceDate { get; set; }
        public string OccurrenceDate { get; set; }
        public bool? IsDay { get; set; }
        public string SQUAWK { get; set; }
        public decimal? FuelJettisoned { get; set; }
        public decimal? Altitude { get; set; }
        public double? Speed { get; set; }
        public double? MachNo { get; set; }
        public decimal? ACWeight { get; set; }
        public string TechLogPageNO { get; set; }
        public string TechLogItemNO { get; set; }
        public int? FlightPhaseId { get; set; }
        public string LOCAirport { get; set; }
        public string LOCStand { get; set; }
        public string LOCRunway { get; set; }
        public string LOCGEOLongtitude { get; set; }
        public string LOCGEOAltitude { get; set; }
        public int? METId { get; set; }
        public string ActualWX { get; set; }
        public int? SigxWXId { get; set; }
        public int? RunwayConditionId { get; set; }
        public string ACConfigAP { get; set; }
        public string ACConfigATHR { get; set; }
        public string ACConfigGear { get; set; }
        public string ACConfigFlap { get; set; }
        public string ACConfigSlat { get; set; }
        public string ACConfigSpoilers { get; set; }
        public string Summary { get; set; }
        public string Result { get; set; }
        public string OthersInfo { get; set; }
        public int? AATRiskId { get; set; }
        public bool? AATIsActionTaken { get; set; }
        public string AATReportedToATC { get; set; }
        public string AATATCInstruction { get; set; }
        public string AATFrequency { get; set; }
        public decimal? AATHeading { get; set; }
        public string AATClearedAltitude { get; set; }
        public string AATMinVerticalSep { get; set; }
        public string AATMinHorizontalSep { get; set; }
        public int? AATTCASAlertId { get; set; }
        public string AATTypeRA { get; set; }
        public bool? AATIsRAFollowed { get; set; }
        public string AATVerticalDeviation { get; set; }
        public string AATOtherACType { get; set; }
        public string AATMarkingColour { get; set; }
        public string AATCallSign { get; set; }
        public string AATLighting { get; set; }
        public decimal? WTHeading { get; set; }
        public int? WTTurningId { get; set; }
        public int? WTGlideSlopePosId { get; set; }
        public int? WTExtendedCenterlinePosId { get; set; }
        public int? WTAttitudeChangeId { get; set; }
        public decimal? WTAttitudeChangeDeg { get; set; }
        public bool? WTIsBuffet { get; set; }
        public bool? WTIsStickShaker { get; set; }
        public string WTSuspect { get; set; }
        public string WTDescribeVA { get; set; }
        public string WTPrecedingAC { get; set; }
        public bool? WTIsAware { get; set; }
        public string BSBirdType { get; set; }
        public int? BSNrSeenId { get; set; }
        public int? BSNrStruckId { get; set; }
        public int? BSTimeId { get; set; }
        public DateTime? PICDate { get; set; }


        public int? DayNightStatusId { get; set; }
        public int? IncidentTypeId { get; set; }
        public int? AATXAbove { get; set; }
        public int? AATYAbove { get; set; }
        public int? AATXAstern { get; set; }
        public int? AATYAstern { get; set; }
        public int? AATHorizontalPlane { get; set; }
        public string BSImpactDec { get; set; }
        public bool? IsSecurityEvent{ get; set; }
        public bool? IsAirproxATC { get; set; }
        public bool? IsTCASRA { get; set; }
        public bool? IsWakeTur { get; set; }
        public bool? IsBirdStrike { get; set; }
        public bool? IsOthers { get; set; }
        public int? SigxWXTypeId { get; set; }
        public double? BSHeading { get; set; }
        public int? BSTurningId { get; set; }
        public string User { get; set; }
        public int Id { get; set; }
    }

    public class TOLNDCardViewModel
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public string Information { get; set; }
        public string RW { get; set; }
        public string TL { get; set; }
        public string FE { get; set; }
        public string Wind { get; set; }
        public string Visibility { get; set; }
        public string Cloud { get; set; }
        public string Temp { get; set; }
        public string QNH { get; set; }
        public string DewP { get; set; }
        public string WXCondition { get; set; }
        public string STAR { get; set; }
        public string APP { get; set; }
        public string MAS { get; set; }
        public string ActLandingWeight { get; set; }
        public string Flap { get; set; }
        public string StabTrim { get; set; }
        public string Verf { get; set; }
        public string FuelToAlternate { get; set; }
        public string TA { get; set; }
        public string ZFW { get; set; }
        public string TOFuel { get; set; }
        public string TOWeight { get; set; }
        public string CG { get; set; }
        public string V1 { get; set; }
        public string Vr { get; set; }
        public string V2 { get; set; }
        public string Type { get; set; }
        public string DateUpdate { get; set; }
        public string User { get; set; }
    }
}
