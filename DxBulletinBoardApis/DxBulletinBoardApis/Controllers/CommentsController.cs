using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DxBulletinBoardApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : Controller
    {
        private readonly IConfiguration _config;
        public CommentsController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("/comments")]
        public async Task<ActionResult<Comments>> GetAllPostComments(int postid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var postcom = await connection.QueryAsync<Comments>($"select * from Comments where postid={postid} order by commtime desc");

            return Ok(postcom);

        }
        [HttpGet("/userComment")]
        public async Task<ActionResult<Comments>> GetCommentsFromUser(string uid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var postcom = await connection.QueryAsync<Comments>($"select * from Comments where uid='{uid}'");

            return Ok(postcom);

        }
        /*[HttpPost()]
        public async Task<ActionResult<List<Comments>>> CreateComment(Comments comms)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                await connection.ExecuteAsync("insert into comments values(@postid,@uid,@commdata,getDate())", comms);
            return Ok(await SelectAllComments(connection));

        }*/
        [HttpPost("/postComments")]
        public async Task<ActionResult<List<Comments>>> CreateComments(Comments[] comms)
        {
            
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var comm in comms)
            {
                await connection.ExecuteAsync("insert into comments values(@postid,@uid,@commdata,getDate())", comm);

            }
            return Ok(await SelectAllComments(connection));

        }

        [HttpPut]
        public async Task<ActionResult<List<Comments>>> UpdateComments(Comments[] comms)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach(var com in comms)
            {
            await connection.ExecuteAsync($"update comments set commdata='{com.commdata}' where commid='{com.commid}' and uid='{com.uid}' and postid = {com.postid}");

            }
            return Ok(await SelectAllComments(connection));

        }
        //single delete
       /* [HttpDelete("{commid}")]
        public async Task<ActionResult<List<Comments>>> DeleteComments(int commid, string uid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync($"delete from comments where commid = {commid} and uid = '{uid}'");
            return Ok(await SelectAllComments(connection));

        }*/
        [HttpDelete("/delete")]
        public async Task<ActionResult<List<Comments>>> DeleteMultipleComments(Mcomm[] comms)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach(var comm in comms)
            {
            await connection.ExecuteAsync($"delete from comments where commid = {comm.commid} and uid = '{comm.uid}'");

            }
            return Ok(await SelectAllComments(connection));

        }

        private static async Task<IEnumerable<Comments>> SelectAllComments(SqlConnection connection)
        {
            return await connection.QueryAsync<Comments>("select * from comments order by commtime");
        }
    }
}
