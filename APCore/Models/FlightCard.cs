using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FlightCard
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public int? FlightId { get; set; }
        public string Reg { get; set; }
        public string Route { get; set; }
        public string FltNo { get; set; }
        public DateTime? DateCreate { get; set; }
    }
}
