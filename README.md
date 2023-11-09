<h1 align="center">Учебный проект: "Mesto" (frontend)</h1>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#project-installation">Эксплуатация проекта</a></li>
      <li><a href="#project-functionality">Функциональность проекта</a></li>
      <li><a href="#project-enhancement">Планы по улучшению</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Учебный проект Mesto - прототип социальной сети, схожей с instagram. Реализовано приложение при помощи фреймворка React. В данной версии проекта есть авторизация при помощи JWT и cookie

Проект доступен по ссылке:
<br>
frontend - https://woobotgjr.mesto.nomoredomainsrocks.ru/"
<br>
backend - https://api.woobotgjr.mesto.nomoredomainsrocks.ru/"
<br>
Ссылка на макеты:
https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1 
https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1 
https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1 
https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript-9-sprint?node-id=0%3A1

<i>Проект был проверен опытными ревьюерами согласно чеклисту</i>

<a name="project-installation"><h2>2. Эксплуатация проекта</h2></a>

1. git clone https://github.com/WoobotGJR/react-mesto-auth - клонировать репозиторий
2. npm i` - установить зависимости (dependencies)
3. npm run start` - запустить приложение
4. npm run build - создать build приложения

<a name="functionality"><h2>3. Функциональность проекта</h2></a>

- Регистрация и авторизация пользователя (JWT-token). Сохранение данных при помощи localStorage
- Добавление карточек на страницу. Удаление карточек, добавленных пользователем. Возможность лайка / дизлайка.
- Валидация данных пользователя и выведение ошибок в случае неверного ввода

<a name="enhancement"><h2>4. Планы по улучшению</h2></a>

- Уменьшение количества рендеров приложения
- Рефакторинг вёрстки при помощи SCSS или фреймворков для CSS
- Добавление строгой типизации кода при помощи TypeScript
