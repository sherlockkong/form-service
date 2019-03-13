using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database.Models;

namespace forms.ViewModels
{
	public class FieldViewModel
	{
		public FieldViewModel() { }
		public FieldViewModel(Field field)
		{
			this.FieldId = field.FieldId;
			this.Index = field.Index;
			this.Type = field.Type;
			this.Detail = field.Detail;
		}

		public string FieldId { get; set; }
		public int Index { get; set; }
		public string Type { get; set; }
		public string Detail { get; set; }

		public Field ToDbModel(string formId)
		{
			return new Field
			{
				FieldId = Guid.NewGuid().ToString(),
				Index = this.Index,
				Type = this.Type,
				Detail = this.Detail,
				FormId = formId,
			};
		}
	}
}