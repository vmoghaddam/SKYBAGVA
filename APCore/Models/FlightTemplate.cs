using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FlightTemplate
    {
        public int Id { get; set; }
        public string FlightNumber { get; set; }
        public int? ChartererId { get; set; }
        public int? OriginId { get; set; }
        public int? DestinationId { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string Code { get; set; }
    }
}
