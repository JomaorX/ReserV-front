# ReserV-front

<p align="center">
<img src="https://raw.githubusercontent.com/JomaorX/ReserV-front/refs/heads/main/public/reserV-LogoM%20-%20mediano.png" alt="ReserV logo">
</p>

---

Frontend de **ReserV**, una plataforma de reservas para peluquerías, desarrollada con **Angular** y **Tailwind CSS**.

---

## 🚀 Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas:

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v15 o superior)

Instala Angular CLI globalmente si aún no lo tienes:

npm install -g @angular/cli

---

## ⚙️ Instalación

1. Clona el repositorio:

git clone https://github.com/JomaorX/ReserV-front.git
cd ReserV-front

2. Instala las dependencias:

npm install

3. Inicia el servidor de desarrollo:

ng serve

4. Abre tu navegador en http://localhost:4200

---

## 🧱 Estructura del Proyecto

src/
├── app/
│   ├── components/            # Componentes reutilizables
│   ├── pages/                 # Vistas principales
│   ├── services/              # Comunicación con el backend
│   ├── app-routing.module.ts  # Configuración de rutas
├── assets/                    # Recursos estáticos (imágenes, fuentes, etc.)
├── styles.css                 # Estilos globales (con Tailwind CSS)

---

## 🛠️ Comandos Útiles

### Generar Componentes

ng generate component pages/login

### Construir el Proyecto

ng build

Los archivos de producción se generarán en la carpeta dist/.

---

## 📚 Recursos

- Angular CLI: https://angular.io/cli
- Tailwind CSS: https://tailwindcss.com/

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar:

1. Haz un fork del repositorio.
2. Crea una rama nueva para tu funcionalidad o corrección:

git checkout -b nombre-de-tu-rama

3. Realiza tus cambios y haz commit:

git commit -m "Agrega una nueva funcionalidad"

4. Sube tu rama al repositorio remoto:

git push origin nombre-de-tu-rama

5. Abre un Pull Request describiendo los cambios que has realizado.

---

Gracias por tu interés en mejorar **ReserV** 💇‍♀️✨
