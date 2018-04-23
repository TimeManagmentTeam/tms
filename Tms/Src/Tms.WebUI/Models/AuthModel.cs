using System.ComponentModel.DataAnnotations;

namespace Tms.WebUI.Models
{
    public class AuthModel
    {
        [Required]
        [DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }
        [Required]
        public string PassHash { get; set; }
    }
}
