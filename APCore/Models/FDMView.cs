using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FDMView
    {
        public int? ToAirport { get; set; }
        public int? FromAirport { get; set; }
        public string ToAirportIATA { get; set; }
        public string FromAirportIATA { get; set; }
        public string AircraftType { get; set; }
        public string Register { get; set; }
        public string Context { get; set; }
        public double? Critical { get; set; }
        public DateTime? Date { get; set; }
        public double? Duration { get; set; }
        public string EventName { get; set; }
        public int? FlightId { get; set; }
        public int Id { get; set; }
        public double? Limit { get; set; }
        public double? Major { get; set; }
        public double? Minor { get; set; }
        public string P1 { get; set; }
        public string P2 { get; set; }
        public string PFLR { get; set; }
        public string Severity { get; set; }
        public string Phase { get; set; }
        public string StateName { get; set; }
        public DateTime? TDDatetime { get; set; }
        public DateTime? TODatetime { get; set; }
        public string Type { get; set; }
        public string Units { get; set; }
        public double? Value { get; set; }
        public string ValueName { get; set; }
    }
}
