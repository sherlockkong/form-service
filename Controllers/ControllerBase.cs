using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace forms.Controllers
{
	[ControllerExceptionFilter]
	[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
	public class ControllerBase : Controller
	{
		private readonly IConfiguration _configuration;
		public ControllerBase([FromServices]IConfiguration configuration)
		{
			_configuration = configuration;
		}

		protected string UserId { get; private set; } = "fake";
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var allowAnonymous = _configuration.GetValue<bool>("AllowAnonymous");
			try
			{
				if (!context.HttpContext.Request.Cookies.TryGetValue("id_token", out var token) && !allowAnonymous) throw new Exception("401");

				if (!string.IsNullOrEmpty(token))
				{
					var handler = new JwtSecurityTokenHandler();
					var validationParameters = new TokenValidationParameters
					{
						ValidateAudience = false,
						ValidateIssuer = false,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]))
					};
					handler.ValidateToken(token, validationParameters, out var jwt);
					UserId = (jwt as JwtSecurityToken).Claims.FirstOrDefault(c => c.Type == "id").Value;
				}
				else throw new Exception("");
			}
			catch
			{
				if (!allowAnonymous) throw new Exception("401");
			}

			base.OnActionExecuting(context);
		}
		protected JsonResult ErrorResult(string errorCode)
		{
			return new JsonResult(new { error = new ErrorMessage(errorCode) });
		}
	}

	public class ControllerExceptionFilterAttribute : ExceptionFilterAttribute
	{
		public override void OnException(ExceptionContext context)
		{
			Log.Error(context.Exception?.Message);
			if (context.Exception?.Message == "401") context.Result = new UnauthorizedResult();
			else context.Result = new JsonResult(new { error = new ErrorMessage("Unknown") });
		}
	}

	public class ErrorMessage
	{
		public ErrorMessage() { }
		public ErrorMessage(string code)
		{
			Code = code;
		}

		public string Code { get; set; }
	}
}
