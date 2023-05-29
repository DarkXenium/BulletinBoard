using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace DxBulletinBoardApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IsLikedController : Controller
    {
        private readonly IConfiguration _config;
        public IsLikedController(IConfiguration config)
        {
            _config = config;
        }
        [HttpPost("/didLike")]
        public async Task<ActionResult<int>> CheckLiked(string uid,int postid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var count = await connection.ExecuteScalarAsync<int>($"EXEC dbo.insertLikeStatus '{uid}',{postid},1;");
            return count;
        }

    }
}
