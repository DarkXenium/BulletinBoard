using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace DxBulletinBoardApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IConfiguration _config;
        public UsersController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("/registeredUsers")]
        public async Task<ActionResult<Users>> GetAllUsers()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var userReg = await connection.QueryAsync<Users>($"select * from users");

            return Ok(userReg);

        }
        [HttpPost("/register")]
        public async Task<ActionResult<List<Users>>> Registration(Users users)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                await connection.ExecuteAsync("insert into users values(@uid,@uemail,@uname,@phoneno,@password)", users);

            return Ok(await SelectAllUsers(connection));

        }
        [HttpDelete("/deleteUsers")]
        public async Task<ActionResult<List<Users>>> DeleteComments(string email,string password)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync($"delete from users where uemail = '{email}' and password='{password}'");
            return Ok(await SelectAllUsers(connection));

        }
        /*[HttpPost("/login")]
        public async Task<ActionResult<List<Users>>> UserLogin(MUsers musers)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var count = await connection.ExecuteScalarAsync<int>($"SELECT COUNT(*) FROM users WHERE uemail = '{musers.uemail}' AND password = '{musers.password}'");
            if (count==1)
            {
                return Ok("valid");
            }
            else
            {
                return Ok("invalid");
            }

        }*/
        [HttpPost("/login")]
        public async Task<ActionResult<LoginResponse>> UserLogin(MUsers musers)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var count = await connection.ExecuteScalarAsync<int>($"SELECT COUNT(*) FROM users WHERE uemail = '{musers.uemail}' AND password = '{musers.password}'");
            if (count == 1)
            {
                // Return the uemail and password along with the "valid" status
                return Ok(new LoginResponse { Email = musers.uemail, Password = musers.password, Status = "valid", });
            }
            else
            {
                return Ok(new LoginResponse { Status = "invalid" });
            }
        }
               

        [HttpGet("/user")]
        public async Task<ActionResult<List<Users>>> SingleUser(string email)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var user = await connection.QueryAsync<Users>($"select * from users where uemail = '{email}'");
            return Ok(user);
        }
            private static async Task<IEnumerable<Users>> SelectAllUsers(SqlConnection connection)
        {
            return await connection.QueryAsync<Users>("select * from users");
        }
    }
}
