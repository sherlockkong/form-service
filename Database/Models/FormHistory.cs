using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace forms.Database.Models
{
	public class FormHistory
	{
		public string FormHistoryId { get; set; }
		[Required]
		public string Fields { get; set; }
		[Required]
		public DateTime Updated { get; set; }

		[Required]
		public string FormId { get; set; }
		public virtual Form Form { get; set; }
	}
}