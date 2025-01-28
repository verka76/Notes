import { Injectable } from '@angular/core';
import { Note, Tag, Reminder  } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:5000/api/notes';
  private tagApiUrl = 'http://localhost:5000/api/tags';
  private reminderApiUrl = 'http://localhost:5000/api/reminders';

  getNotes(): Promise<Note[]> {
    return fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => data as Note[]);
  }

  getTags(): Promise<Tag[]> {
    return fetch(this.tagApiUrl)
      .then(response => response.json())
      .then(data => data as Tag[]);
  }
  getReminders(): Promise<Reminder[]> {
    return fetch(this.reminderApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        return data as Reminder[];
      });
  }
  
  deleteNote(id: number): Promise<void> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }
    });
  }

  createNote(note: Note): Promise<Note> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then(data => data as Note);
  }

  updateNote(note: Note): Promise<Note> {
    return fetch(`${this.apiUrl}/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then(data => data as Note);
  }

  createTag(tag: { name: string }): Promise<Tag> {
    return fetch(this.tagApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tag)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then(data => data as Tag);
  }
}
