# Управление заметками
Создание функционала для работы с заметками включает возможности просмотра, добавления, удаления и редактирования заметок, а также управление тегами и просмотр напоминаний.

## Технологии
- **Frontend:** Angular 
- **Backend:** : C# с использованием .NET Core
- **База данных:** PostgreSQL

## Установка и запуск

1. Склонируйте репозиторий;
2. Импортируйте базу данных `notes.sql`;
 <br>
В отдельном терминале запустите сервер Node.js, выполнив команду:

```
cd my-notes-app

node server.js
```
Для запуска .NET Core приложения выполните команду:
```
cd NotesAppBackend

dotnet run

```
Для запуска клиентского приложения на Angular выполните команду:
 
```
cd notes-app

npx ng serve

```
## Примечание
Перед запуском каждого из компонентов убедитесь, что все необходимые зависимости установлены, выполнивь команду: <br>
```
npm install

```
