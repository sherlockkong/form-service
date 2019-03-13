using System;
using forms.Database.Models;

namespace forms.ViewModels
{
	public class FormHistoryViewModel
	{
		public FormHistoryViewModel() { }
		public FormHistoryViewModel(FormHistory formHistory)
		{
			this.FormHistoryId = formHistory.FormHistoryId;
			this.Fields = formHistory.Fields;
			this.Updated = formHistory.Updated;
		}

		public string FormHistoryId { get; set; }
		public string Fields { get; set; }
		public DateTime Updated { get; set; }
	}
}