using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class AppCrewTime
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public string YearMonthName { get; set; }
        public int CrewId { get; set; }
        public string Name { get; set; }
        public string ScheduleName { get; set; }
        public int Flights { get; set; }
        public int BlockTime { get; set; }
        public int FlightTime { get; set; }
        public DateTime? RefDate { get; set; }
    }
}
