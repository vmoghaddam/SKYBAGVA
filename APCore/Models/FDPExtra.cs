using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FDPExtra
    {
        public int Id { get; set; }
        public int FDPId { get; set; }
        public decimal? MaxFDP { get; set; }

        public virtual FDP FDP { get; set; }
    }
}
