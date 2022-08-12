﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class IdeaSessionItemTemp
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public DateTime? DateFromUtc { get; set; }
        public DateTime? DateToUtc { get; set; }
        public string Remark { get; set; }
        public int? FDPId { get; set; }

        public virtual IdeaSessionTemp Session { get; set; }
    }
}
