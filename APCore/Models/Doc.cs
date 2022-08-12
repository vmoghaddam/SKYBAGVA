using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class Doc
    {
        public int FDPId { get; set; }
        public int FlightId { get; set; }
        public string Type { get; set; }
        public string Data { get; set; }
        public DateTime? Date { get; set; }
    }
}
