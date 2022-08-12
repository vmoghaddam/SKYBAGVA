using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FTLFlightTimeActual
    {
        public int FlightId { get; set; }
        public DateTime? STDDay { get; set; }
        public int? CrewId { get; set; }
        public int FDPItemId { get; set; }
        public int FDPId { get; set; }
        public int? ScheduledFlightTime { get; set; }
        public int? FlightTime { get; set; }
    }
}
