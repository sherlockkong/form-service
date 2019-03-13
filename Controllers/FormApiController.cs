using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using forms.Services;
using forms.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace forms.Controllers
{
	// TODO: Add view model validation.
	[Route("api/v1/form")]
	public class FormApiController : ControllerBase
	{
		private readonly IMutationService _mutationService;
		private readonly IQueryService _queryService;

		public FormApiController(
			IMutationService mutationService,
			IQueryService queryService,
			IConfiguration configuration) :base (configuration)
		{
			_mutationService = mutationService;
			_queryService = queryService;
		}

		[HttpPost]
		public IActionResult AddForm([FromBody]FormViewModel model)
		{
			var form = _mutationService.AddForm(model);

			if (form == null) return this.ErrorResult("AddFormError");

			return Ok(form);
		}

		[HttpGet("{id}")]
		public IActionResult GetForm(string id)
		{
			var form = _queryService.GetForm(id);

			if (form == null) return this.ErrorResult("GetForm");

			return Ok(form);
		}

		[HttpGet("/api/v1/forms/{ids}")]
		public IActionResult GetForms(string ids)
		{
			var form = _queryService.GetForms(ids.Split(';').ToList());

			if (form == null) return this.ErrorResult("GetForm");

			return Ok(form);
		}

		[HttpPut]
		public IActionResult UpdateForm([FromBody]FormViewModel model)
		{
			var form = _mutationService.UpdateForm(model);

			if (form == null) return this.ErrorResult("UpdateForm");

			return Ok(form);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteForm(string id)
		{
			var success = _mutationService.RemoveForm(id);

			if (!success) return this.ErrorResult("RemoveForm");

			return Ok(new { });
		}

		// ------------------------------------------------------------------- //

		[HttpPost("{id}/data")]
		public IActionResult AddFormData(string id, [FromBody]FormDataViewModel model)
		{
			var ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();
			var userAgent = Request.Headers["User-Agent"].ToString();
			var formData = _mutationService.AddFormData(UserId, id, ip, userAgent, model.FieldDataList);

			if (formData == null) return this.ErrorResult("AddFormDataError");

			return Ok(formData);
		}

		[HttpGet("data/{id}")]
		public IActionResult GetFormData(string id)
		{
			var formData = _queryService.GetFormData(id, false);

			if (formData == null) return this.ErrorResult("GetFormDataError");

			return Ok(formData);
		}

		[HttpGet("{id}/datalist")]
		public IActionResult GetFormDataList(string id, [FromQuery]int? skip, [FromQuery]int? limit)
		{
			var dataList = _queryService.GetFormDataList(id, skip ?? 0, limit ?? 10, out var totalCount);
			Response.Headers.Add("total-count", totalCount.ToString());

			if (dataList == null) return this.ErrorResult("GetFormDataList");

			return Ok(dataList);
		}

		[HttpGet("{formId}/field/{fieldId}/datalist")]
		public IActionResult GetFieldDataList(string formId, string fieldId)
		{
			var dataList = _queryService.GetAllFieldDataOfOneField(formId, fieldId);

			if (dataList == null) return this.ErrorResult("GetFieldDataList");

			return Ok(dataList);
		}

		[HttpPut("data/{id}")]
		public IActionResult UpdateFormData(string id, [FromBody]FormDataViewModel model)
		{
			var ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();
			var userAgent = Request.Headers["User-Agent"].ToString();
			var formData = _mutationService.UpdateFormData(UserId, id, ip, userAgent, model.FieldDataList);

			if (formData == null) return this.ErrorResult("UpdateFormDataError");

			return Ok(formData);
		}

		[HttpDelete("data/{id}")]
		public IActionResult RemoveFormData(string id)
		{
			var success = _mutationService.RemoveFormData(id);

			if (!success) return this.ErrorResult("RemoveFormDataError");

			return Ok(new { });
		}
	}
}
