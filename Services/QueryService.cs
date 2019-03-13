using System;
using System.Collections.Generic;
using System.Linq;
using forms.Database;
using forms.Database.Models;
using forms.ViewModels;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace forms.Services
{
	public class FormQueryService : IQueryService
	{
		private readonly FormsDbContext _dbContext;

		public FormQueryService(FormsDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public FormViewModel GetForm(string formId, bool includeHistory = false, bool includeData = false)
		{
			try
			{
				Form form = null;
				if (includeHistory)
				{
					if (includeData) form = _dbContext.Forms
						.Include(f => f.Fields)
						.Include(f => f.Histories)
						.Include(f => f.FormDataList)
						.FirstOrDefault(f => f.FormId == formId);
					else form = _dbContext.Forms
						.Include(f => f.Fields)
						.Include(f => f.Histories)
						.FirstOrDefault(f => f.FormId == formId);
				}
				else
				{
					if (includeData) form = _dbContext.Forms
						.Include(f => f.Fields)
						.Include(f => f.FormDataList)
						.FirstOrDefault(f => f.FormId == formId);
					else form = _dbContext.Forms
						.Include(f => f.Fields)
						.FirstOrDefault(f => f.FormId == formId);
				}

				if (form == null)
				{
					Log.Error($"Can not find form {formId}");
					return null;
				}

				return new FormViewModel(form);
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		public FormDataViewModel GetFormData(string formDataId, bool includeHistory)
		{
			try
			{
				FormData formData = null;
				if (includeHistory) formData = _dbContext.FormData
					.Include(sd => sd.FieldDataList)
					.Include(sd => sd.Histories)
					.FirstOrDefault(sd => sd.FormDataId == formDataId);
				else formData = _dbContext.FormData
					.Include(sd => sd.FieldDataList)
					.FirstOrDefault(sd => sd.FormDataId == formDataId);

				if (formData == null)
				{
					Log.Error($"Can not find form data {formDataId}");
					return null;
				}

				return new FormDataViewModel(formData);
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		public List<FormDataViewModel> GetFormDataList(string formId, int skip, int limit, out int totalCount)
		{
			try
			{
				totalCount = 0;
				var form = _dbContext.Forms.Find(formId);
				if (form == null)
				{
					Log.Error($"Can not find form {formId}");
					return null;
				}

				totalCount = _dbContext.FormData.Where(x => x.FormId == formId).Count();

				return _dbContext.FormData
						.Include(x => x.FieldDataList)
						.Where(x => x.FormId == formId)
						.OrderBy(x => x.Updated)
						.Skip(skip)
						.Take(limit)
						.Select(x => new FormDataViewModel(x))
						.ToList();
			}
			catch (Exception e)
			{
				LogException(e);
				totalCount = 0;
				return null;
			}
		}

		public List<FormViewModel> GetForms(List<string> formIds)
		{
			try
			{
				return _dbContext.Forms
						.Include(x => x.Fields)
						.Where(x => formIds.Contains(x.FormId))
						.Select(x => new FormViewModel(x))
						.ToList();
			}
			catch (Exception e)
			{
				LogException(e);
				return null;
			}
		}

		public List<string> GetAllFieldDataOfOneField(string formId, string fieldId)
		{
			try
			{
				return _dbContext.FieldData
						.Where(x => x.FormId == formId && x.FieldId == fieldId)
						.Select(x => x.Data)
						.ToList();
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
	}
}