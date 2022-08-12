using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class AppFTL
    {
        public DateTime CDate { get; set; }
        public int CrewId { get; set; }
        public double? Duty7 { get; set; }
        public double? Duty7Remain { get; set; }
        public double? Duty14 { get; set; }
        public double? Duty14Remain { get; set; }
        public double? Duty28 { get; set; }
        public double? Duty28Remain { get; set; }
        public double? Flight28 { get; set; }
        public double? Flight28Remain { get; set; }
        public double? FlightYear { get; set; }
        public double? FlightYearRemain { get; set; }
        public double? FlightCYear { get; set; }
        public double? FlightCYearRemain { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string NID { get; set; }
        public string Mobile { get; set; }
        public string ScheduleName { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public int IsCockpit { get; set; }
    }
}
