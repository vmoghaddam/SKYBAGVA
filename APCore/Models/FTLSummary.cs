using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FTLSummary
    {
        public DateTime CDate { get; set; }
        public int CrewId { get; set; }
        public double? Duty7 { get; set; }
        public double? Duty14 { get; set; }
        public double? Duty28 { get; set; }
        public double? Flight28 { get; set; }
        public double? FlightYear { get; set; }
        public double? FlightCYear { get; set; }
    }
}
