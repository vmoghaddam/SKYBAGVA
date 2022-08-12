using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewPersonDocumentFileX
    {
        public int PersonId { get; set; }
        public int Id { get; set; }
        public int? DocumentTypeId { get; set; }
        public int? FileTypeId { get; set; }
        public string FileUrl { get; set; }
        public string Title { get; set; }
        public string Remark { get; set; }
        public string DocumentType { get; set; }
        public string SysUrl { get; set; }
        public string FileType { get; set; }
        public int PersonDocumentId { get; set; }
    }
}
