using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewCourseTypeJobGroup
    {
        public string Title { get; set; }
        public string FullCode { get; set; }
        public int CourseTypeId { get; set; }
        public int Id { get; set; }
        public bool? Mandatory { get; set; }
        public bool? NoRecurrent { get; set; }
        public int? Interval { get; set; }
        public int? IntervalUnit { get; set; }
        public int? Duration { get; set; }
    }
}
