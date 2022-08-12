using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewFMISFLT
    {
        public string Key { get; set; }
        public DateTime? DateUTC { get; set; }
        public int ID { get; set; }
        public string FlightNumber { get; set; }
        public int? FromAirportId { get; set; }
        public int? ToAirportId { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? OffBlock { get; set; }
        public DateTime? Takeoff { get; set; }
        public DateTime? Landing { get; set; }
        public DateTime? OnBlock { get; set; }
        public int? StatusId { get; set; }
        public int? RegisterID { get; set; }
        public string Reg { get; set; }
        public string Reg1 { get; set; }
        public string DepStn1 { get; set; }
        public string DepStn { get; set; }
        public string ArrStn1 { get; set; }
        public string ArrStn { get; set; }
        public DateTime? STD1 { get; set; }
        public DateTime? STA1 { get; set; }
        public DateTime? OffBlock1 { get; set; }
        public DateTime? OnBlock1 { get; set; }
        public DateTime? TakeOff1 { get; set; }
        public DateTime? Landing1 { get; set; }
        public string Status1 { get; set; }
        public int StatusId1 { get; set; }
    }
}
