using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class MBPantryIndex
    {
        public int ID { get; set; }
        public int? RegisterID { get; set; }
        public string PantryCode { get; set; }
        public int? CockpitCrew { get; set; }
        public int? CabinCrew { get; set; }
        public int? DOW { get; set; }
        public decimal? DOI { get; set; }
    }
}
