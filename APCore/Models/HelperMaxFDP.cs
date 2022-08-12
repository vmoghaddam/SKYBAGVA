using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class HelperMaxFDP
    {
        public int Id { get; set; }
        public double? MaxFDP { get; set; }
        public double? FDPReductionByStandBy { get; set; }
        public double? MaxFDPExtended { get; set; }
    }
}
