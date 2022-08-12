using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FlightUploadHistory
    {
        public int Id { get; set; }
        public DateTime? DateCreate { get; set; }
        public string FileName { get; set; }
        public string URL { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string Key { get; set; }
    }
}
