# To-Do List App

Aplicación web para llevar el control de tareas y metas personales, con frontend en React y backend en Node.js/Express.

## Estructura del Proyecto

El proyecto está organizado en dos partes principales:

- **frontend**: Aplicación React con Redux Toolkit para gestión de estado
- **backend**: API REST con Express que proporciona endpoints para tareas y metas

## Instalación

1. Clonar el repositorio:
```
git clone <url-del-repositorio>
```

2. Navegar al directorio del proyecto:
```
cd todo-list-full
```

3. Instalar todas las dependencias (frontend y backend):
```
npm run install
```

## Ejecutar la Aplicación
```
npm run dev
```

### Ejecutar solo el Frontend
```
npm run dev:frontend
```

### Ejecutar solo el Backend
```
npm run dev:backend
```

## API Endpoints

El backend proporciona los siguientes endpoints:

- `GET /getTasks` - Obtener lista de tareas
- `POST /addTask` - Agregar nueva tarea
- `DELETE /removeTask/:id` - Eliminar tarea
- `GET /getGoals` - Obtener lista de metas
- `POST /addGoal` - Agregar nueva meta
- `DELETE /removeGoal/:id` - Eliminar meta

> `Authorization: todo-list-api-key`