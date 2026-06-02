using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Client
{
    public int ClientId { get; set; }
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    [Range(18, 100)]
    public int Age { get; set; }
    [Required]
    public string Address { get; set; } = string.Empty;
    [Required]
    [Phone]
    public string Phone { get; set; } = string.Empty;
    public string AccountNumber { get; set; } = string.Empty;
    public double Balance { get; set; } = 0.0;
}