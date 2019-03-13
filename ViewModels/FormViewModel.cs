using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database.Models;
using Newtonsoft.Json;

namespace forms.ViewModels
{
	public class FormViewModel
	{
		public FormViewModel() { }
		public FormViewModel(Form form)
		{
			this.FormId = form.FormId;
			this.Header = form.Header;
			this.Name = form.Name;
			this.Webhook = form.Webhook;
			this.Description = form.Description;
			this.Settings = form.Settings;
			this.FieldsCount = form.FieldsCount;
			this.Created = form.Created;
			this.Updated = form.Updated;

			if (form.Fields != null && form.Fields.Any())
			{
				this.Fields = form.Fields.OrderBy(f => f.Index).Select(x => new FieldViewModel(x)).ToList();
			}

			if (form.Histories != null && form.Histories.Any())
			{
				this.Histories = form.Histories.Select(x => new FormHistoryViewModel(x)).ToList();
			}

			if (form.FormDataList != null && form.FormDataList.Any())
			{
				this.DataList = form.FormDataList.Select(x => new FormDataViewModel(x)).ToList();
			}
		}

		public string FormId { get; set; }
		public string Header { get; set; }
		public string Name { get; set; }
		public string Webhook { get; set; }
		public string Description { get; set; }
		public string Settings { get; set; }
		public int FieldsCount { get; set; }
		public DateTime Created { get; set; }
		public DateTime Updated { get; set; }

		public List<FieldViewModel> Fields { get; set; }
		public List<FormHistoryViewModel> Histories { get; set; }
		public List<FormDataViewModel> DataList { get; set; }

		public Form ToDbModel()
		{
			var now = DateTime.UtcNow;
			var form = new Form
			{
				FormId = Guid.NewGuid().ToString(),
				Header = this.Header ?? "",
				Name = this.Name ?? "",
				Webhook = this.Webhook ?? "",
				Description = this.Description ?? "",
				Settings = this.Settings ?? "",
				FieldsCount = this.Fields == null ? 0 : this.Fields.Count,
				Created = now,
				Updated = now,
			};
			form.Fields = this.Fields?.Select(x => x.ToDbModel(form.FormId)).ToList();
			form.Histories = new List<FormHistory>
			{
				new FormHistory {
					FormHistoryId = Guid.NewGuid().ToString(),
					FormId = form.FormId,
					Updated = now,
					Fields = JsonConvert.SerializeObject(this.Fields),
				}
			};

			return form;
		}
	}
}