﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class CourseTypeJobGroup
    {
        public int CourseTypeId { get; set; }
        public int JobGroupId { get; set; }
        public string Remark { get; set; }
        public bool? Mandatory { get; set; }
        public bool? NoRecurrent { get; set; }
        public int? Interval { get; set; }
        public int? IntervalUnit { get; set; }
        public int? Duration { get; set; }

        public virtual CourseType CourseType { get; set; }
        public virtual JobGroup JobGroup { get; set; }
    }
}
