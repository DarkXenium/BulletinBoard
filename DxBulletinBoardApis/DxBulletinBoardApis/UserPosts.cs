namespace DxBulletinBoardApis
{
    public class UserPosts:MPosts
    {
        public string authorName { get; set; } = string.Empty;
        public string posttopic { get; set; } = string.Empty;
        public string category { get; set; } = string.Empty;
        public string postDetails { get; set; } = string.Empty;
        public string postTime { get; set; } = string.Empty;
        public int likes { get; set; }
        public int views { get; set; }
        public string photourl { get; set; } = string.Empty;


    }
    public class MPosts
    {
        public int postId { get; set; }
        public string UID { get; set; } = string.Empty;
    }
}
