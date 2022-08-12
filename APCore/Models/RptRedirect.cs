using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class RptRedirect
    {
        public int Id { get; set; }
        public int FDPId { get; set; }
        public int? CrewId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public int FlightId { get; set; }
        public string FlightNumber { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public DateTime? STDDayLocal { get; set; }
        public DateTime? STDDay { get; set; }
        public DateTime? BlockOff { get; set; }
        public DateTime? BlockOn { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? TakeOff { get; set; }
        public DateTime? Landing { get; set; }
        public DateTime? DateFDP { get; set; }
        public int? PYear { get; set; }
        public string PMonthName { get; set; }
        public int? PMonth { get; set; }
        public string PDate { get; set; }
        public string PeriodFixTime { get; set; }
    }
}
