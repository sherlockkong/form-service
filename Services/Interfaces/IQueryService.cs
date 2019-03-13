using System.Collections.Generic;
using forms.ViewModels;

namespace forms.Services
{
	public interface IQueryService
	{
		FormViewModel GetForm(string formId, bool includeHistory = false, bool includeData = false);
		FormDataViewModel GetFormData(string formDataId, bool includeHistory);
		List<FormDataViewModel> GetFormDataList(string formId, int skip, int limit, out int totalCount);
		List<FormViewModel> GetForms(List<string> formIds);
		List<string> GetAllFieldDataOfOneField(string formId, string fieldId);
	}
}