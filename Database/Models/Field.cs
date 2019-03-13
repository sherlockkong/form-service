using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace forms.Database.Models
{
	public class Field
	{
		public string FieldId { get; set; }
		[Required]
		public int Index { get; set; }
		[Required]
		public string Type { get; set; }
		[Required]
		public string Detail { get; set; }

		[Required]
		public string FormId { get; set; }
		public virtual Form Form { get; set; }
	}
}