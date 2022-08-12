using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FDM
    {
        public int Id { get; set; }
        public string Severity { get; set; }
        public string EventName { get; set; }
        public double? Value { get; set; }
        public double? Minor { get; set; }
        public double? Major { get; set; }
        public double? Critical { get; set; }
        public double? Duration { get; set; }
        public DateTime? TDDatetime { get; set; }
        public string P1 { get; set; }
        public string P2 { get; set; }
        public string Phase { get; set; }
        public string StateName { get; set; }
        public string Context { get; set; }
        public string TORunway { get; set; }
        public string TDRunway { get; set; }
        public string Type { get; set; }
        public DateTime? TODatetime { get; set; }
        public string Units { get; set; }
        public string ValueName { get; set; }
        public int? FlightId { get; set; }
        public string PFLR { get; set; }
        public double? Limit { get; set; }
        public DateTime? Date { get; set; }
        public string FileName { get; set; }

        public virtual FlightInformation Flight { get; set; }
    }
}
