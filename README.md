# Plataforma de Microfrontends en React

Este proyecto implementa una arquitectura de **microfrontends** en **React** utilizando **Webpack Module Federation**. Está compuesto por tres aplicaciones independientes que se integran dinámicamente en un contenedor principal.

## 🚀 Componentes

- **shell**: Contenedor principal que orquesta los microfrontends y provee el contexto global de la aplicación.
- **auth**: Módulo encargado de autenticación y registro de usuarios.
- **dash**: Módulo principal que gestiona funcionalidades como cotización, registro y seguimiento de envíos.

## 🏗️ Tecnologías

- **Framework:** React
- **Arquitectura:** Microfrontends (Webpack Module Federation)
- **Estado Global:** Context API (compartido desde `shell`)
- **UI:** Material-UI
- **Seguridad:** Manejo de autenticación con JWT
- **Pruebas:** Jest / React Testing Library

## 📂 Estructura del proyecto

```
/
├── shell/        # Contenedor principal
├── auth/         # Microfrontend de autenticación
├── dash/         # Microfrontend principal
├── package.json  # Scripts comunes
└── README.md
```

## ⚙️ Instalación

Cada microfrontend funciona de manera independiente, por lo que es necesario instalar sus dependencias de forma individual:

1. **Instalar dependencias en cada módulo:**

   ```bash
   cd shell
   npm install
   ```

   ```bash
   cd ../auth
   npm install
   ```

   ```bash
   cd ../dash
   npm install
   ```

2. **Volver a la raíz del proyecto:**

   ```bash
   cd ..
   ```

3. **Ejecución**

   Desde la raíz, puedes iniciar todos los microfrontends en paralelo con:

   ```bash
   npm run start:all
   ```

