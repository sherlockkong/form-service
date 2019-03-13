using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace forms.Database.Models
{
	public class Form
	{
		public string FormId { get; set; }
		[Required]
		public string Header { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Webhook { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public string Settings { get; set; }
		[Required]
		public int FieldsCount { get; set; }

		public DateTime Created { get; set; }
		[Required]
		public DateTime Updated { get; set; }

		public virtual ICollection<Field> Fields { get; set; }
		public virtual ICollection<FormData> FormDataList { get; set; }
		public virtual ICollection<FormHistory> Histories { get; set; }
	}
}