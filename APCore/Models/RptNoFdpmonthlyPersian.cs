﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class RptNoFDPMonthlyPersian
    {
        public int? PYear { get; set; }
        public string PeriodFixTime { get; set; }
        public string DutyTypeTitle { get; set; }
        public int DutyType { get; set; }
        public int? CrewId { get; set; }
        public string Name { get; set; }
        public string ScheduleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Duration { get; set; }
        public int? FX { get; set; }
        public int? Count { get; set; }
        public string JobGroup { get; set; }
        public int? GroupId { get; set; }
        public string JobGroupCode { get; set; }
        public string JobGroupRoot { get; set; }
        public int? RankOrder { get; set; }
    }
}
