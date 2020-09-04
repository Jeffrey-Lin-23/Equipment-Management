using Dapper.Contrib.Extensions;

namespace AlphaSystem
{
  [Table("device_main")]
  public class DeviceDTO
  {
    [Key]
    public int Device_id { get; set; }
    public string Device_number { get; set; }
    public string Device_name { get; set; }
    public string Type { get; set; }
    public string Brand { get; set; }
    public string Original_feature { get; set; }
    public string Order_date { get; set; }
    public string Deliver_date { get; set; }
    public string Order_website { get; set; }
    public string Order_reason { get; set; }
    public int Price { get; set; }
    public string Currency { get; set; }
    public string For_staff { get; set; }
    public string Invoice_no { get; set; }
    public string Approved_by { get; set; }
    public string Location_no { get; set; }
    public string Locate_staff { get; set; }
    public string Device_ip { get; set; }
    public string Access_type { get; set; }
    public string Stock_amount { get; set; }
    public string Memo { get; set; }
    public string Order_staff { get; set; }
  }
}