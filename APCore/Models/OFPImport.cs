﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class OFPImport
    {
        public OFPImport()
        {
            OFPImportItems = new HashSet<OFPImportItem>();
            OFPImportProps = new HashSet<OFPImportProp>();
        }

        public int Id { get; set; }
        public string FileName { get; set; }
        public string FlightNo { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime? DateFlight { get; set; }
        public DateTime? DateCreate { get; set; }
        public string Text { get; set; }
        public string User { get; set; }
        public string TextOutput { get; set; }
        public int? FlightId { get; set; }
        public string DateUpdate { get; set; }
        public DateTime? DateConfirmed { get; set; }
        public string UserConfirmed { get; set; }
        public int? PICId { get; set; }
        public DateTime? JLDatePICApproved { get; set; }
        public string JLSignedBy { get; set; }
        public string PIC { get; set; }
        public decimal? FPFuel { get; set; }
        public decimal? FPTripFuel { get; set; }
        public decimal? MCI { get; set; }
        public decimal? FLL { get; set; }
        public decimal? DOW { get; set; }
        public string Source { get; set; }
        public string JPlan { get; set; }
        public string JAPlan1 { get; set; }
        public string JAPlan2 { get; set; }
        public string JFuel { get; set; }

        public virtual FlightInformation Flight { get; set; }
        public virtual ICollection<OFPImportItem> OFPImportItems { get; set; }
        public virtual ICollection<OFPImportProp> OFPImportProps { get; set; }
    }
}
