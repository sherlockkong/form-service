using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database.Models;

namespace forms.ViewModels
{
	public class FieldDataViewModel
	{
		public FieldDataViewModel() { }
		public FieldDataViewModel(FieldData fieldData)
		{
			this.FieldId = fieldData.FieldId;
			this.Data = fieldData.Data;
		}

		public string FieldId { get; set; }
		public string Data { get; set; }

		public FieldData ToDbModel(string formId, string formDataId)
		{
			return new FieldData
			{
				FieldDataId = Guid.NewGuid().ToString(),
				FieldId = this.FieldId,
				Data = this.Data,
				FormId = formId,
				FormDataId = formDataId,
			};
		}
	}
}