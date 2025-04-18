# 📘 Multi-language Dictionary App

A simple, responsive dictionary application built with **React** and **Vite**, allowing users to browse keywords and their translations, and administrators to manage and reorder entries.

---

## 🚀 Features

- 🔍 Public view for browsing the dictionary
- 🔐 Admin login to manage keywords and translations
- ➕ Add new keywords with translations
- ✏️ Edit existing translations
- 📦 Drag & Drop to reorder keywords (using `react-dnd`)
- 💾 Persistent data with `localStorage`
- 🌐 Supports **Persian** and **Spanish** and **French** translations

---

## 📂 Pages

### `/`

Public user page — all users can:

- View the list of keywords
- See translations in either **Persian** or **Spanish** or **French**
- Switch between languages using a dropdown

---

### `/login`

Login page to access admin dashboard.

> ✅ **Username**: `admin`  
> ✅ **Password**: `admin`

---

### `/admin`

Admin dashboard where authenticated users can:

- Add new keywords with translations
- Edit translation **for the currently selected language**
- Reorder keywords via drag-and-drop
- All changes are saved to `localStorage` instantly

---

## 🛠️ Tech Stack

- **React + Vite** for lightning-fast development
- **React Context** to share dictionary state between components (avoids prop drilling)
- **React DnD** for intuitive drag-and-drop functionality
- **Module CSS** for scoped and maintainable styles
- **localStorage** for data persistence across sessions

---

## 📦 Dictionary Structure

We use an **array of keyword objects** instead of an object map, to preserve order:

```js
[
  {
    keyword: 'hi',
    persian: 'سلام',
    spanish: 'hola'
  },
  {
    keyword: 'book',
    persian: 'کتاب',
    spanish: ''
  },
  ...
]
```
