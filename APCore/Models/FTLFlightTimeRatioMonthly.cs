using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FTLFlightTimeRatioMonthly
    {
        public int CrewId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int? ScheduledFlightTime { get; set; }
        public int? CNT { get; set; }
        public decimal? Ratio { get; set; }
    }
}
