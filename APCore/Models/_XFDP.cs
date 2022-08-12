using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class _XFDP
    {
        public int Id { get; set; }
        public string FDP { get; set; }
        public DateTime? DateFDP { get; set; }
        public int? FirstFlightId { get; set; }
        public int? LastFlightId { get; set; }
        public string Key { get; set; }
        public DateTime? InitStart { get; set; }
        public DateTime? InitEnd { get; set; }
        public string InitFlts { get; set; }
        public string InitRoute { get; set; }
        public int? InitFromIATA { get; set; }
        public int? InitToIATA { get; set; }
        public DateTime? InitRestTo { get; set; }
        public string InitNo { get; set; }
        public string InitKey { get; set; }
        public string InitFlights { get; set; }
        public bool? IsTemp { get; set; }
        public string InitRank { get; set; }
        public string InitGroup { get; set; }
        public int? InitIndex { get; set; }
        public int? InitHomeBase { get; set; }
        public string InitSchedule { get; set; }
        public int? CrewId { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int? GroupId { get; set; }
        public int? TempId { get; set; }
        public int? FDPId { get; set; }
        public string UPD { get; set; }
        public int? InitPos { get; set; }
    }
}
