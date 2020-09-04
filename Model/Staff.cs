using Dapper.Contrib.Extensions;

namespace AlphaSystem
{
  [Table("staff_list")]
  public class Staff
  {
    [Key]
    public int staff_id { get; set; }
    public int user_id { get; set; }
    public string first_name { get; set; }
    public string last_name { get; set; }
  }
}