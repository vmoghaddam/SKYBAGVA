using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class TableBlockTime
    {
        public int Id { get; set; }
        public int? CrewId { get; set; }
        public double? BlockTime { get; set; }
        public DateTime? CDate { get; set; }
        public int? FDPId { get; set; }

        public virtual FDP FDP { get; set; }
    }
}
