using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace forms.Database.Models
{
	public class FormData
	{
		public string FormDataId { get; set; }

		[Required]
		public string Ip { get; set; }
		[Required]
		public string UserAgent { get; set; }
		[Required]
		public string CreatedBy { get; set; }
		[Required]
		public DateTime Created { get; set; }
		[Required]
		public string UpdatedBy { get; set; }
		[Required]
		public DateTime Updated { get; set; }

		[Required]
		public string FormId { get; set; }
		public virtual Form Form { get; set; }

		public virtual ICollection<FieldData> FieldDataList { get; set; }
		public virtual ICollection<FormDataHistory> Histories { get; set; }
	}
}