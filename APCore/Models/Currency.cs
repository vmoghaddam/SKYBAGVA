﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class Currency
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public string Symbol { get; set; }
    }
}
