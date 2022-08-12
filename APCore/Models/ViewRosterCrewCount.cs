using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewRosterCrewCount
    {
        public int Id { get; set; }
        public DateTime? DateLocal { get; set; }
        public string FltNo { get; set; }
        public string Route { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public string Register { get; set; }
        public int? CockpitCount { get; set; }
        public int? CabinCount { get; set; }
    }
}
