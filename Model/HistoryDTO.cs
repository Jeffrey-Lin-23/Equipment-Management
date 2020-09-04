using Dapper.Contrib.Extensions;

namespace AlphaSystem
{
  [Table("device_history")]
  public class HistoryDTO
  {
    [Key]
    public int History_id { get; set; }
    public string Action_date { get; set; }
    public string Action { get; set; }
    public string Description { get; set; }
    public int Device_id { get; set; }
    public string Operator { get; set; }
  }
}