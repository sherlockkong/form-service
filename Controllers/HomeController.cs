using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using forms.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace forms.Controllers
{
	public class HomeController : ControllerBase
	{
		private IQueryService _queryService;

		public HomeController(
			IConfiguration configuration,
			IQueryService queryService
			) : base(configuration)
		{
			_queryService = queryService;
		}

		[HttpGet("{formId?}")]
		public IActionResult Index(string formId, [FromQuery]string theme)
		{
			if(!string.IsNullOrEmpty(formId))
			{
				var form = _queryService.GetForm(formId);
				if(form == null) return Redirect("notfound");
			}

			ViewBag.formId = formId ?? "";
			ViewBag.theme = theme ?? "red";

			return View();
		}

		[HttpGet("/fillform/{formId}/{formDataId?}")]
		public IActionResult FillForm(string formId, string formDataId, [FromQuery]string theme)
		{
			if (!string.IsNullOrEmpty(formId))
			{
				var form = _queryService.GetForm(formId);
				if (form == null) return Redirect("/notfound");
			}

			if (!string.IsNullOrEmpty(formDataId))
			{
				var data = _queryService.GetFormData(formDataId, false);
				if (data == null) return Redirect("/notfound");
			}

			ViewBag.formId = formId;
			ViewBag.formDataId = formDataId;
			ViewBag.theme = theme ?? "red";

			return View();
		}

		[HttpGet("/error")]
		public IActionResult Error()
		{
			return View();
		}

		[HttpGet("/notfound")]
		public IActionResult PageNotFound()
		{
			return View();
		}
	}
}
