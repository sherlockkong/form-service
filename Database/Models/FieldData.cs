using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace forms.Database.Models
{
	public class FieldData
	{
		public string FieldDataId { get; set; }
		[Required]
		public string FieldId { get; set; }
		[Required]
		public string FormId { get; set; }
		[Required]
		public string Data { get; set; }

		[Required]
		public string FormDataId { get; set; }
		public virtual FormData FormData { get; set; }
	}
}