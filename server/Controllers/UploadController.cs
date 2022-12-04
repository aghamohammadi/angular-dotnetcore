
using angular_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;


namespace angular_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly ILogger<UploadController> _logger;
        private readonly IOptions<SiteConfig> _siteConfig;

        public UploadController(ILogger<UploadController> logger,IOptions<SiteConfig> siteConfig)
        {
            _logger = logger;
            _siteConfig = siteConfig;

        }


        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                if(formCollection==null || formCollection.Files.Count<=0)
                    return BadRequest();

                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{(new Random().Next(100000, 1000000))}{Path.GetExtension(file.FileName)}";
                    var fullPath = Path.Combine(pathToSave, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    return StatusCode(200,new {url = $"{_siteConfig.Value.SiteUrl}/Resources/Images/{fileName}"});
                    // return Ok(new {status=200, url=$"{_siteConfig.Value.SiteUrl}/Resources/Images/{fileName}" });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        public IActionResult Index()
        {
            return Ok(new { status =200 });
        }

        
    }
}