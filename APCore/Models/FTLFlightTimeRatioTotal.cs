using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FTLFlightTimeRatioTotal
    {
        public int? CrewId { get; set; }
        public int? ScheduledFlightTime { get; set; }
        public int? CNT { get; set; }
        public decimal? Ratio { get; set; }
    }
}
