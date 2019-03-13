using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace forms.Database.Models
{
	public class FormDataHistory
	{
		public string FormDataHistoryId { get; set; }
		[Required]
		public string Ip { get; set; }
		[Required]
		public string UserAgent { get; set; }
		[Required]
		public string FieldDataList { get; set; }
		[Required]
		public DateTime Updated { get; set; }
		[Required]
		public string UpdatedBy { get; set; }

		[Required]
		public string FormDataId { get; set; }
		public virtual FormData FormData { get; set; }
	}
}