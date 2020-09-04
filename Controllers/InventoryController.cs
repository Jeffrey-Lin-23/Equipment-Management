using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

namespace AlphaSystem.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class InventoryController : ControllerBase
  {
    private readonly ILogger<InventoryController> _logger;
    private readonly string maxDb = "Server=localhost;Database=max_devices;Uid=root;Password=Cf222222;";
    private readonly string devicesQueryHead = @"
    SELECT
      device_id, type, brand, original_feature, order_date, deliver_date, 
      order_website, order_reason, price, currency, invoice_no, sl3.first_name AS approved_by, 
      location_no, locate_staff, device_ip, access_type, stock_amount, memo, device_name, device_number,
      sl1.first_name AS order_staff, sl2.first_name AS for_staff
    FROM
        device_main main
            Left JOIN
        staff_list sl1 ON main.order_staff = sl1.staff_id
    Left JOIN
        staff_list sl2 ON main.for_staff = sl2.staff_id
          Left JOIN
        staff_list sl3 ON main.approved_by = sl3.staff_id
        ";
    private readonly string devicesQueryEnd = "ORDER BY main.device_id;";
    private readonly string historyQuery = @"
    SELECT history_id, action, description, device_id, action_date, sl.first_name AS operator
    FROM device_history dh
	    Left join 
    staff_list sl ON dh.operator = sl.staff_id
    Where device_id = @id
    Order By history_id;
    ";

    public InventoryController(ILogger<InventoryController> logger)
    {
      _logger = logger;
    }

    [HttpGet("devices")]
    public IEnumerable<DeviceDTO> GetDevices()
    {
      using var connection = new MySqlConnection(maxDb);
      var data = connection.Query<DeviceDTO>(devicesQueryHead + devicesQueryEnd);
      return data;
    }

    [HttpGet("history/{device_id}")]
    public IEnumerable<HistoryDTO> GetHistory(int device_id)
    {
      using var connection = new MySqlConnection(maxDb);
      var data = connection.Query<HistoryDTO>(historyQuery, new { id = device_id });
      return data;
    }

    [HttpGet("staff")]
    public IEnumerable<Staff> GetStaff()
    {
      using var connection = new MySqlConnection(maxDb);
      var data = connection.GetAll<Staff>();
      return data;
    }

    [HttpGet("device/{id}")]
    public DeviceDTO GetDevice(int id)
    {
      using var connection = new MySqlConnection(maxDb);
      var data = connection.QueryFirst<DeviceDTO>(devicesQueryHead + " WHERE device_id = @id " + devicesQueryEnd, new { id = id });
      return data;
    }

    [HttpPost("add")]
    public void Add([FromBody] Device device)
    {
      using var connection = new MySqlConnection(maxDb);
      connection.Insert(device);
    }

    [HttpPost("addhistory")]
    public void AddHistory([FromBody] History history)
    {
      using var connection = new MySqlConnection(maxDb);
      connection.Insert(history);
    }

    [HttpDelete("delete")]
    public void Delete([FromBody] DeviceDTO deviceDTO)
    {
      using var connection = new MySqlConnection(maxDb);
      connection.Delete(deviceDTO);
    }

    [HttpPut("put")]
    public void Put([FromBody] Device device)
    {
      using var connection = new MySqlConnection(maxDb);
      connection.Update(device);
    }

    [HttpPut("puthistory")]
    public void putHistory([FromBody] History history)
    {
      using var connection = new MySqlConnection(maxDb);
      connection.Update(history);
    }
  }
}
