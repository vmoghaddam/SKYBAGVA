using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class MBAircraftIndex
    {
        public int ID { get; set; }
        public decimal? OASec { get; set; }
        public decimal? OBSec { get; set; }
        public decimal? OCSec { get; set; }
        public decimal? ODSec { get; set; }
        public decimal? CPT1 { get; set; }
        public decimal? CPT2 { get; set; }
        public decimal? CPT3 { get; set; }
        public decimal? CPT4 { get; set; }
        public int? RegisterId { get; set; }
    }
}
