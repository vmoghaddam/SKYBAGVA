using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class DelayXML
    {
        public string Id { get; set; }
        public int? FlightId { get; set; }
        public string Delay { get; set; }
        public string Remark { get; set; }
    }
}
