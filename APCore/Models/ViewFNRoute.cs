using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewFNRoute
    {
        public string FlightNumber { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public int? FromAirport { get; set; }
        public int? ToAirport { get; set; }
    }
}
