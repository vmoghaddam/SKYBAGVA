using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class Report_Flight
    {
        public string Date { get; set; }
        public string FltNo { get; set; }
        public string DepStn { get; set; }
        public string ArrStn { get; set; }
        public string ACReg { get; set; }
        public string Status { get; set; }
        public string PaxADL { get; set; }
        public string PaxCHD { get; set; }
        public string PaxINF { get; set; }
        public string TotalPax { get; set; }
        public string PAXStation { get; set; }
        public string Bag { get; set; }
        public string Cargo { get; set; }
        public string TotalWeight { get; set; }
        public string STD { get; set; }
        public string STA { get; set; }
        public string TakeOff { get; set; }
        public string Landing { get; set; }
        public string FlightTime { get; set; }
        public string OffBlock { get; set; }
        public string OnBlock { get; set; }
        public string BlockTime { get; set; }
        public string DelayAmount { get; set; }
        public string DelayReason { get; set; }
        public string FuelUpLift { get; set; }
        public string FuelTrip { get; set; }
        public string Distance { get; set; }
        public string StationIncome { get; set; }
        public string StationIncomeCurrency { get; set; }
        public string Change { get; set; }
        public string FixTimeCommercial { get; set; }
        public string FixTimeStandard { get; set; }
        public string STC { get; set; }
        public string CHarterer { get; set; }
    }
}
