using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class TOLNDCard
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public string Information { get; set; }
        public string RW { get; set; }
        public string TL { get; set; }
        public string FE { get; set; }
        public string Wind { get; set; }
        public string Visibility { get; set; }
        public string Cloud { get; set; }
        public string Temp { get; set; }
        public string QNH { get; set; }
        public string DewP { get; set; }
        public string WXCondition { get; set; }
        public string STAR { get; set; }
        public string APP { get; set; }
        public string MAS { get; set; }
        public string ActLandingWeight { get; set; }
        public string Flap { get; set; }
        public string StabTrim { get; set; }
        public string Verf { get; set; }
        public string FuelToAlternate { get; set; }
        public string TA { get; set; }
        public string ZFW { get; set; }
        public string TOFuel { get; set; }
        public string TOWeight { get; set; }
        public string CG { get; set; }
        public string V1 { get; set; }
        public string Vr { get; set; }
        public string V2 { get; set; }
        public string Type { get; set; }
        public string DateUpdate { get; set; }
        public string User { get; set; }
        public string LDA { get; set; }
        public string JLSignedBy { get; set; }
        public DateTime? JLDatePICApproved { get; set; }
        public string CTime { get; set; }
        public string AC { get; set; }
        public string AI { get; set; }
        public string NERP { get; set; }
        public string MERP { get; set; }
        public string ATEMP { get; set; }
        public string FERP { get; set; }
        public string RWINUSE { get; set; }
        public string VGA { get; set; }
        public string VFLAP { get; set; }
        public string VSLAT { get; set; }
        public string VCLEAN { get; set; }
    }
}
