using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class MonthGPG
    {
        public int? Year { get; set; }
        public int? Month { get; set; }
        public string MonthName { get; set; }
        public string YearMonthName { get; set; }
    }
}
