namespace NotesAppBackend.Models
{
    public class Reminder
    {
        public int Id { get; set; }                
        public string? Description { get; set; }      
        public DateTime ReminderDate { get; set; }   
        public DateTime CreatedAt { get; set; }        
    }
}