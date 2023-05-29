namespace DxBulletinBoardApis
{
    public class Users :MUsers
    {
        public int id { get; set; }

        public string uname { get; set; } = string.Empty;
        public string phoneno { get; set; } = string.Empty;
        public string uid { get; set; } = string.Empty;
       


    }
    public class MUsers
    {
        public string uemail { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string status { get; set; } = string.Empty;
    }
    public class LoginResponse
    {
        public string Status { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
