using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class MBStabTrim
    {
        public int ID { get; set; }
        public int? MAC { get; set; }
        public decimal? FlapFifteen { get; set; }
        public decimal? FlapFive { get; set; }
        public int? RegisterID { get; set; }
    }
}
