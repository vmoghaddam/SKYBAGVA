using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class CateringItemCode
    {
        public CateringItemCode()
        {
            CateringItems = new HashSet<CateringItem>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }

        public virtual ICollection<CateringItem> CateringItems { get; set; }
    }
}
