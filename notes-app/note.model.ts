export interface Note {
  id: number;            // Уникальный идентификатор заметки
  title: string;        // Заголовок заметки
  content: string;      // Содержимое заметки
  date?: string;        // Дата 
  time?: string;        // Время
  created_at: string;   // Дата создания заметки
  tags: string[];       // Массив тегов, связанных с заметкой
}

export interface Tag {
  id: number;           // Уникальный идентификатор тега
  name: string;         // Название тега
}

export interface Reminder {
  id: number;               // Уникальный идентификатор напоминания
  description: string;      // Описание напоминания
  reminder_date: string;    // Дата и время напоминания 
}

