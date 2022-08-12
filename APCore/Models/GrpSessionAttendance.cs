using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class GrpSessionAttendance
    {
        public int? PersonId { get; set; }
        public int? CourseId { get; set; }
        public string SessionKey { get; set; }
        public int? Attendance { get; set; }
        public DateTime? SessionStart { get; set; }
        public DateTime? SessionEnd { get; set; }
        public int? TotalSession { get; set; }
        public decimal? AttendancePercent { get; set; }
    }
}
