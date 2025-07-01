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
/
├── shell/ # Contenedor principal
├── auth/ # Microfrontend de autenticación
├── dash/ # Microfrontend principal
├── package.json # Scripts comunes
└── README.md

⚙️ Instalación

Cada microfrontend funciona de manera independiente, por lo que es necesario instalar sus dependencias de forma individual.

1. **Instalar dependencias en cada módulo:**
-cd shell
--npm install
-cd ..
-cd auth
--npm install
-cd ..
-cd dash
--npm install

2. **Ejecucion**
en / ejecutar npm run start:all

