namespace DxBulletinBoardApis
{
    public class Comments: Mcomm
    {
        public int postid { get; set; }
        
        public string commdata { get; set; } = string.Empty;
        public string commtime { get; set; } = string.Empty;

    }
    public class Mcomm {
        public int commid { get; set; }
        public string uid { get; set; } = string.Empty;

    }



}
