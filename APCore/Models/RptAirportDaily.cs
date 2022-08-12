using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class RptAirportDaily
    {
        public int ID { get; set; }
        public string Airline { get; set; }
        public string FlightNumber { get; set; }
        public string Register { get; set; }
        public string PDate { get; set; }
        public DateTime? STDDay { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public string PDateTakeOff { get; set; }
        public DateTime? TakeOff { get; set; }
        public DateTime? TakeOffLocal { get; set; }
        public DateTime? OffBlock { get; set; }
        public DateTime? OffBlockLocal { get; set; }
        public string PDateOffBlock { get; set; }
        public int? PaxChild { get; set; }
        public int? PaxInfant { get; set; }
        public int? PaxAdult { get; set; }
        public int? Freight { get; set; }
        public decimal? Uplift { get; set; }
        public decimal? UsedFuel { get; set; }
        public string Delays { get; set; }
    }
}
