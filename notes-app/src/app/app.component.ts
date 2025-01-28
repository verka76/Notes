import { Component, OnInit } from '@angular/core';
import { Note, Tag, Reminder } from '../../note.model';
import { NoteService } from '../../note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from '../../custom-date.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDatePipe]
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  reminders: Reminder[] = [];
  newNote: Note = { id: 0, title: '', content: '', date: '', time: '', created_at: new Date().toISOString(), tags: [] };
  editingNote: Note | null = null;
  originalNote: Note | null = null;  
  tags: Tag[] = [];
  showForm = false;
  showTagForm = false;
  newTagName: string = '';

  titleRequired: boolean = false;
  contentRequired: boolean = false;
  dateRequired: boolean = false;
  timeRequired: boolean = false;
  tagsRequired: boolean = false;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadTags();
    this.loadReminders();
  }

  loadNotes(): void {
    this.noteService.getNotes().then(data => {
      this.notes = data;
    });
  }

  loadTags(): void {
    this.noteService.getTags().then(tags => {
      this.tags = tags;
    });
  }

  loadReminders(): void {
    this.noteService.getReminders().then(data => {
      this.reminders = data;
      console.log(this.reminders);
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.resetForm();
  }

  addNote(): void {
    this.titleRequired = !this.newNote.title;
    this.contentRequired = !this.newNote.content;
    this.dateRequired = !this.newNote.date;
    this.timeRequired = !this.newNote.time;
    this.tagsRequired = this.newNote.tags.length === 0;

    if (!this.titleRequired && !this.contentRequired && !this.dateRequired && !this.timeRequired && !this.tagsRequired) {
      this.noteService.createNote(this.newNote)
        .then(note => {
          this.notes.push(note);
          this.resetForm();
          this.showForm = false;
        })
        .catch(error => {
          console.error('Ошибка при создании заметки:', error);
        });
    }
  }

  editNote(note: Note): void {
    this.editingNote = note;
    this.originalNote = { ...note };  
    this.newNote = { ...note };
    this.showForm = true;
  }

  updateNote(): void {
    this.titleRequired = !this.newNote.title;
    this.contentRequired = !this.newNote.content;
    this.dateRequired = !this.newNote.date;
    this.timeRequired = !this.newNote.time;
    this.tagsRequired = this.newNote.tags.length === 0;


    if (JSON.stringify(this.originalNote) === JSON.stringify(this.newNote)) {
      this.resetEditing();
      return;  
    }

    if (!this.titleRequired && !this.contentRequired && !this.dateRequired && !this.timeRequired && !this.tagsRequired && this.editingNote) {
      const updatedNote: Note = {
        ...this.editingNote,
        ...this.newNote
      };

 
      updatedNote.tags = this.newNote.tags;

      this.noteService.updateNote(updatedNote)
        .then(updatedNote => {
          const index = this.notes.findIndex(n => n.id === updatedNote.id);
          if (index !== -1) {
            this.notes[index] = updatedNote;
          }
          this.resetEditing();
        })
        .catch(error => {
          console.error('Ошибка при обновлении заметки:', error);
        });
    }
  }

  deleteNote(note: Note): void {
    this.noteService.deleteNote(note.id)
      .then(() => {
        this.notes = this.notes.filter(n => n.id !== note.id);
      })
      .catch(error => {
        console.error('Ошибка при удалении заметки:', error);
      });
  }

  resetEditing(): void {
    this.editingNote = null;
    this.originalNote = null;  
    this.resetForm();
    this.showForm = false;
  }

  resetForm(): void {
    this.newNote = { id: 0, title: '', content: '', date: '', time: '', created_at: new Date().toISOString(), tags: [] };
    this.titleRequired = false;
    this.contentRequired = false;
    this.dateRequired = false;
    this.timeRequired = false;
    this.tagsRequired = false;
  }

  cancelEditing(): void {
    this.resetEditing();
  }

  addTag(): void {
    if (this.newTagName) {
      this.noteService.createTag({ name: this.newTagName })
        .then(tag => {
          this.tags.push(tag);
          this.newTagName = '';
          this.showTagForm = false;
        });
    }
  }
}
