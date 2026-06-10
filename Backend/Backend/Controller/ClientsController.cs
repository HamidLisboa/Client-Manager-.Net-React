using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientsController(AppDbContext context)
    {
        _context = context;
    }
    [NonAction]
    public string GenerateAccountNumber()
    {
        return DateTime.UtcNow.Ticks.ToString() + new Random().Next(1000, 9999).ToString();
    }
    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody] Client client)
    {
        try
        {
            client.AccountNumber = GenerateAccountNumber();
            client.Balance = 0;
            _context.Client.Add(client);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetClient", new { id = client.ClientId }, client);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetClients()
    {
        try
        {
            var clients = await _context.Client.ToListAsync();
            return Ok(clients);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [HttpGet("{id}", Name = "GetClient")]
    public async Task<IActionResult> GetClient(int id)
    {
        try
        {
            var client = await _context.Client.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClient(int id, [FromBody] Client client)
    {
        try
        {
            var existingClient = await _context.Client.FindAsync(id);
            if (existingClient == null)
            {
                return NotFound();
            }
            existingClient.FirstName = client.FirstName;
            existingClient.LastName = client.LastName;
            existingClient.Email = client.Email;
            existingClient.Age = client.Age;
            existingClient.Address = client.Address;
            existingClient.Phone = client.Phone;
            existingClient.AccountNumber = client.AccountNumber;
            existingClient.Balance = client.Balance;
            await _context.SaveChangesAsync();
            return Ok(existingClient);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(int id)
    {
        try
        {
            var client = await _context.Client.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Client.Remove(client);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


}
