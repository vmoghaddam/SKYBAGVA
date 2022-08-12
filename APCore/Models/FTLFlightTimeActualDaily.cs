using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FTLFlightTimeActualDaily
    {
        public DateTime? STDDay { get; set; }
        public int? CrewId { get; set; }
        public int? ScheduledFlightTime { get; set; }
        public int? FlightTime { get; set; }
    }
}
