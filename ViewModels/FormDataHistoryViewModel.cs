using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database.Models;

namespace forms.ViewModels
{
	public class FormDataHistoryViewModel
	{
		public FormDataHistoryViewModel() { }
		public FormDataHistoryViewModel(FormDataHistory history)
		{
			this.FormDataHistoryId = history.FormDataHistoryId;
			this.FieldDataList = history.FieldDataList;
			this.Updated = history.Updated;
			this.Ip = history.Ip;
			this.UserAgent = history.UserAgent;
			this.UpdatedBy = history.UpdatedBy;
		}

		public string FormDataHistoryId { get; set; }
		public string Ip { get; set; }
		public string UserAgent { get; set; }
		public string FieldDataList { get; set; }
		public DateTime Updated { get; set; }
		public string UpdatedBy { get; set; }
	}
}