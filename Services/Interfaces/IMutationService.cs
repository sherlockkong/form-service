using System.Collections.Generic;
using forms.ViewModels;

namespace forms.Services
{
	public interface IMutationService
	{
		FormViewModel AddForm(FormViewModel form);
		FormViewModel UpdateForm(FormViewModel form);
		bool RemoveForm(string formId);
		FormDataViewModel AddFormData(string userId, string formId, string ip, string userAgent, List<FieldDataViewModel> dataList);
		FormDataViewModel UpdateFormData(string userId, string formDataId, string ip, string userAgent, List<FieldDataViewModel> dataList);
		bool RemoveFormData(string formDataId);
	}
}