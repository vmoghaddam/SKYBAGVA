﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewDelayAirportCategoryGrouped
    {
        public DateTime? STDDay { get; set; }
        public string MonthName { get; set; }
        public string DayName { get; set; }
        public string YearName { get; set; }
        public string PDate { get; set; }
        public string PYearName { get; set; }
        public string PMonthName { get; set; }
        public string PDayName { get; set; }
        public int? AirportId { get; set; }
        public string Airport { get; set; }
        public string Category { get; set; }
        public int? Delay { get; set; }
        public int? Count { get; set; }
    }
}
