using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class DelayXMLItem
    {
        public int Id { get; set; }
        public string XmlId { get; set; }
        public int? FlightId { get; set; }
        public int? HH { get; set; }
        public int? MM { get; set; }
        public string Code { get; set; }
        public int? CodeId { get; set; }
        public string Description { get; set; }
        public string Remark { get; set; }
    }
}
