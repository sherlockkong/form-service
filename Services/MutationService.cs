using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database;
using forms.Database.Models;
using forms.ViewModels;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Serilog;

namespace forms.Services
{
	// TODO: Add view model validation for all mutations

	public class FormMutationService : IMutationService
	{
		private readonly FormsDbContext _dbContext;

		public FormMutationService(FormsDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public FormViewModel AddForm(FormViewModel form)
		{
			try
			{
				var dbForm = form.ToDbModel();
				_dbContext.Forms.Add(dbForm);
				_dbContext.SaveChanges();

				// Detach histories before to view model.
				dbForm.Histories = null;
				return new FormViewModel(dbForm);
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		public FormViewModel UpdateForm(FormViewModel form)
		{
			try
			{
				var dbForm = _dbContext.Forms
					.Include(f => f.Fields)
					.FirstOrDefault(f => f.FormId == form.FormId);

				if (dbForm == null)
				{
					Log.Error($"Can not find form {form.FormId}");
					return null;
				}

				var now = DateTime.UtcNow;
				dbForm.Header = form.Header;
				dbForm.Name = form.Name;
				dbForm.Description = form.Description;
				dbForm.Settings = form.Settings;
				dbForm.FieldsCount = form.FieldsCount;
				dbForm.Updated = now;
				var oldFieldIds = dbForm.Fields.Select(x => x.FieldId).ToList();
				var newFields = new List<Field>();
				form.Fields.ForEach(x =>
				{
					var oldField = dbForm.Fields.FirstOrDefault(f => f.FieldId == x.FieldId);
					if (oldField != null)
					{
						oldField.Index = x.Index;
						oldField.Type = x.Type;
						oldField.Detail = x.Detail;
						newFields.Add(oldField);
					}
					else newFields.Add(x.ToDbModel(dbForm.FormId));
				});
				dbForm.Fields = newFields;

				var history = new FormHistory
				{
					FormHistoryId = Guid.NewGuid().ToString(),
					FormId = form.FormId,
					Updated = now,
					Fields = JsonConvert.SerializeObject(form.Fields),
				};
				_dbContext.FormHistories.Add(history);

				_dbContext.SaveChanges();

				// Detach histories before to view model.
				dbForm.Histories = null;
				return new FormViewModel(dbForm);
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		public FormDataViewModel AddFormData(string userId, string formId, string ip, string userAgent, List<FieldDataViewModel> dataList)
		{
			try
			{
				var form = _dbContext.Forms.Find(formId);
				if (form == null)
				{
					Log.Error($"Can not find form {formId}");
					return null;
				}

				var now = DateTime.UtcNow;
				var formData = new FormData
				{
					FormDataId = Guid.NewGuid().ToString(),
					FormId = formId,
					Created = now,
					CreatedBy = userId,
					Updated = now,
					UpdatedBy = userId,
					Ip = ip,
					UserAgent = userAgent,
				};
				formData.Histories = new List<FormDataHistory>{
					new FormDataHistory
					{
						FormDataHistoryId = Guid.NewGuid().ToString(),
						FormDataId = formData.FormDataId,
						FieldDataList = JsonConvert.SerializeObject(dataList),
						Ip = ip,
						UserAgent = userAgent,
						Updated = now,
						UpdatedBy = userId,
					}
				};
				formData.FieldDataList = dataList.Select(x => x.ToDbModel(formId, formData.FormDataId)).ToList();

				_dbContext.FormData.Add(formData);
				_dbContext.SaveChanges();

				// Detach histories before to view model.
				formData.Histories = null;
				return new FormDataViewModel(formData);
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		public FormDataViewModel UpdateFormData(string userId, string formDataId, string ip, string userAgent, List<FieldDataViewModel> dataList)
		{
			try
			{
				var formData = _dbContext.FormData
					.Include(x => x.FieldDataList)
					.FirstOrDefault(x => x.FormDataId == formDataId);

				if (formData == null)
				{
					Log.Error($"Can not find form data {formDataId}");
					return null;
				}

				var now = DateTime.UtcNow;
				formData.Ip = ip;
				formData.UserAgent = userAgent;
				formData.Updated = now;
				formData.UpdatedBy = userId;
				formData.FieldDataList = dataList.Select(x => x.ToDbModel(formData.FormId, formDataId)).ToList();

				var history = new FormDataHistory
				{
					FormDataHistoryId = Guid.NewGuid().ToString(),
					FormDataId = formData.FormDataId,
					FieldDataList = JsonConvert.SerializeObject(dataList),
					Ip = ip,
					UserAgent = userAgent,
					Updated = now,
					UpdatedBy = userId,
				};
				_dbContext.FormDataHistories.Add(history);

				_dbContext.SaveChanges();

				// Detach histories before to view model.
				formData.Histories = null;
				return new FormDataViewModel(formData);
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		private void LogException(Exception e)
		{
			Log.Error(e.Message);
			Log.Error(e.StackTrace);
		}

		public bool RemoveForm(string formId)
		{
			try
			{
				var form = _dbContext.Forms.Find(formId);
				if (form == null)
				{
					Log.Error($"Can not find form {formId}");
					return false;
				}

				_dbContext.Forms.Remove(form);
				_dbContext.SaveChanges();

				return true;
			}
			catch (Exception e)
			{
				LogException(e);
				return false;
			}
		}

		public bool RemoveFormData(string formDataId)
		{
			try
			{
				var formData = _dbContext.FormData.Find(formDataId);

				if (formData == null)
				{
					Log.Error($"Can not find form data {formDataId}");
					return false;
				}

				_dbContext.FormData.Remove(formData);
				_dbContext.SaveChanges();

				return true;
			}
			catch (Exception e)
			{
				LogException(e);
				return false;
			}
		}
	}
}