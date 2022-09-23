using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewMB
    {
        public decimal? CARGO { get; set; }
        public int FlightId { get; set; }
        public int? CPT1 { get; set; }
        public int? CPT2 { get; set; }
        public int? CPT3 { get; set; }
        public int? CPT4 { get; set; }
        public int? Cabin { get; set; }
        public decimal? DLI { get; set; }
        public decimal? DOI { get; set; }
        public int? DOW { get; set; }
        public int? FM { get; set; }
        public decimal? FPFuel { get; set; }
        public decimal? FPTripFuel { get; set; }
        public int? FSO { get; set; }
        public string FlightNumber { get; set; }
        public decimal? LILNW { get; set; }
        public decimal? LITOW { get; set; }
        public decimal? LIZFW { get; set; }
        public decimal? LNW { get; set; }
        public decimal? MACLNW { get; set; }
        public decimal? MACTOW { get; set; }
        public decimal? MACZFW { get; set; }
        public int? MAXLNW { get; set; }
        public int? MAXTOW { get; set; }
        public int? MAXZFW { get; set; }
        public int? OASec { get; set; }
        public int? OBSec { get; set; }
        public int? OCSec { get; set; }
        public int? ODSec { get; set; }
        public int? PaxAdult { get; set; }
        public int? PaxChild { get; set; }
        public int? PaxInfant { get; set; }
        public int? Pilot { get; set; }
        public decimal? TOW { get; set; }
        public int? TTL { get; set; }
        public decimal? ZFW { get; set; }
        public string FromAirport { get; set; }
        public string ToAirport { get; set; }
        public string Register { get; set; }
        public int? RegisterID { get; set; }
        public string PantryCode { get; set; }
    }
}
