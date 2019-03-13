using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database.Models;

namespace forms.ViewModels
{
	public class FormDataViewModel
	{
		public FormDataViewModel() { }
		public FormDataViewModel(FormData formData)
		{
			this.FormDataId = formData.FormDataId;
			this.Ip = formData.Ip;
			this.UserAgent = formData.UserAgent;
			this.CreatedBy = formData.CreatedBy;
			this.Created = formData.Created;
			this.UpdatedBy = formData.UpdatedBy;
			this.Updated = formData.Updated;
			this.FormId = formData.FormId;

			if (formData.FieldDataList != null && formData.FieldDataList.Any())
			{
				this.FieldDataList = formData.FieldDataList
						.Select(x => new FieldDataViewModel(x)).ToList();
			}

			if (formData.Histories != null && formData.Histories.Any())
			{
				this.Histories = formData.Histories
						.Select(x => new FormDataHistoryViewModel(x)).ToList();
			}
		}

		public string FormDataId { get; set; }
		public string Ip { get; set; }
		public string UserAgent { get; set; }
		public string CreatedBy { get; set; }
		public DateTime Created { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime Updated { get; set; }
		public string FormId { get; set; }

		public List<FieldDataViewModel> FieldDataList { get; set; }
		public List<FormDataHistoryViewModel> Histories { get; set; }
	}
}