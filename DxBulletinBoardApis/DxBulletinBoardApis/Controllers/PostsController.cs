using System.Data.SqlClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Security.Cryptography;

namespace DxBulletinBoardApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IConfiguration _config;
        public PostsController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public async Task<ActionResult<List<UserPosts>>> GetAllPosts()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            IEnumerable<UserPosts> posts = await SelectAllPosts(connection);
            return Ok(posts);

        }

        [HttpGet("/post/{postId}")]
        public async Task<ActionResult<UserPosts>> GetPost(int postId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var post = await connection.QueryFirstAsync<UserPosts>($"select * from userPosts where postId={postId}");

            return Ok(post);

        }
        [HttpGet("/post/{UID}/all")]
        public async Task<ActionResult<UserPosts>> GetUserPosts(string UID)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var post = await connection.QueryAsync<UserPosts>($"select * from userPosts where UID='{UID}'");

            return Ok(post);

        }
        [HttpGet("/category")]
        public async Task<ActionResult<List<UserPosts>>> GetDistinctCategories()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var postCat = await connection.QueryAsync<UserPosts>($"select distinct category from userPosts");
            return Ok(postCat);

        }
        [HttpGet("{category}")]
        public async Task<ActionResult<List<UserPosts>>> GetPostsByCategory(string category)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var postCat = await connection.QueryAsync<UserPosts>($"select * from userPosts where category='{category}'");
            return Ok(postCat);
                
        }
/*        [HttpPost]
        public async Task<ActionResult<List<UserPosts>>> CreatePosts(UserPosts post)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("insert into userPosts values(@UID,@authorName,@category,@postDetails,getDate())", post);
            return Ok(await SelectAllPosts(connection));

        }*/
        [HttpPost("/posts")]
        public async Task<ActionResult<List<UserPosts>>> CreateMultiplePosts(UserPosts[] posts)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var post in posts)
            {
                await connection.ExecuteAsync("insert into userPosts values(@UID,@authorName,@posttopic,@category,@postDetails,getDate(),@likes,@views,@photourl)", post);
               // return Ok(await SelectAllPosts(connection));
            }
            return Ok(await SelectAllPosts(connection));

        }
        [HttpPut]
        public async Task<ActionResult<List<UserPosts>>> UpdatePosts(UserPosts post, int postId,string UID)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync($"update userPosts set UID = @UID,authorName=@authorName,posttopic=@posttopic,category=@category,postDetails=@postDetails,postTime=getDate(),likes=@likes,photourl=@photourl where  postId = {postId} and UID = '{UID}'", post);
            return Ok(await SelectAllPosts(connection));

        }
        [HttpPut("/multiple")]
        public async Task<ActionResult<List<UserPosts>>> UpdateMultiplePosts(UserPosts[] posts)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var post in posts)
            {
                await connection.ExecuteAsync($"update userPosts set posttopic=@posttopic,category=@category,postDetails=@postDetails,postTime=getDate(),likes=@likes,photourl=@photourl where  postId = {post.postId} and UID = '{post.UID}'", post);
            }
            return Ok(await SelectAllPosts(connection));

        }
        [HttpDelete("{postId}")]
        public async Task<ActionResult<List<UserPosts>>> DeletePosts(int postId, string UID)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync($"delete from userPosts where postId = {postId} and UID = '{UID}'");
            return Ok(await SelectAllPosts(connection));

        }
        [HttpDelete("/multiple")]
        public async Task<ActionResult<List<UserPosts>>> DeleteMultiplePosts(MPosts[] posts)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var post in posts)
            {
                await connection.ExecuteAsync($"delete from userPosts where postId = {post.postId} and UID = '{post.UID}'");
            }
            return Ok(await SelectAllPosts(connection));

        }
            [HttpPost("/like/{postId}")]
            public async Task<ActionResult<int>> IncrementLikes(int postId)
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                var count = await connection.ExecuteScalarAsync<int>($"UPDATE userPosts SET likes = likes + 1 OUTPUT INSERTED.likes WHERE postId = {postId}");
                return count;
            }
            [HttpPost("/dislike/{postId}")]
            public async Task<ActionResult<int>> DecrementLikes(int postId)
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                var count = await connection.ExecuteScalarAsync<int>($"UPDATE userPosts SET likes = likes - 1 OUTPUT INSERTED.likes WHERE postId = {postId}");
                return count;
            }
            [HttpPost("/view/{postId}")]
            public async Task<ActionResult<int>> UpdateViews(int postId)
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                var count = await connection.ExecuteScalarAsync<int>($"UPDATE userPosts SET views = views + 1 OUTPUT INSERTED.views WHERE postId = {postId}");
                return count;
            }
             [HttpGet("/likestatus")]
                public async Task<ActionResult<int>> GetUserLikeStatus(int postId,string uid)
                {
                    using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                    var count = await connection.ExecuteScalarAsync<int>($"select yes_no from isLiked where postId={postId} and uid = '{uid}';");
                    return count;
                }


        private static async Task<IEnumerable<UserPosts>> SelectAllPosts(SqlConnection connection)
        {
            return await connection.QueryAsync<UserPosts>("select * from userPosts order by postTime desc");
        }
    }
}
