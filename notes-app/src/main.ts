import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Импортируем корневой компонент
import { AppModule } from '../app.module'; // Убедитесь, что этот путь корректен
import { appConfig } from './app/app.config'; // Импорт конфигурации, если необходимо
import { importProvidersFrom } from '@angular/core';

// Производим инициализацию приложения
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(AppModule) // Импортируем провайдеры из AppModule
  ]
})
  .catch((err) => console.error(err));
