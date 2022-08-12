﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class HelperMSN
    {
        public int ID { get; set; }
        public int? AC_ModelID { get; set; }
        public int? TypeId { get; set; }
        public string Type { get; set; }
        public int? TotalSeat { get; set; }
        public int? MSN { get; set; }
        public string Register { get; set; }
        public int? MaxWeightTO { get; set; }
        public int? MaxWeightLND { get; set; }
        public string MaxWeighUnit { get; set; }
    }
}
