# Evaluación 1 · API de la Copa Libertadores (Módulo 3)

API REST desarrollada con Node.js y Express que gestiona consultas en memoria sobre 16 clubes de la Copa Libertadores, sus países y títulos oficiales.

## 📹 Demostración en Video
- **Enlace:** [Link a YouTube aquí]

---

## 🚀 Cómo levantar el proyecto

1. Clonar el repositorio e ingresar a la carpeta:
```bash
git clone [https://github.com/VixoVixey/evaluacion-1-libertadores.git](https://github.com/VixoVixey/evaluacion-1-libertadores.git)
cd evaluacion-1-libertadores
```

2. Instalar dependencias:
```bash
yarn
```

3. Iniciar el servidor en modo desarrollo (--watch activo):
```
yarn dev
```

El servidor quedará disponible en http://localhost:3000.
📌 Endpoints Principales

    GET /api/clubes: Lista de los 16 clubes.

    GET /api/clubes/:id: Busca club por ID (ej. /api/clubes/9 -> 200, /api/clubes/99 -> 404).

    GET /api/clubes?pais=Chile: Búsqueda anidada por país (case-insensitive).

    GET /api/titulos/:club: Años de títulos del club (ej. /api/titulos/colo-colo -> [1991], /api/titulos/universidad de chile -> [] con 200).

    GET /api/titulos: Lista cronológica de todos los títulos (desafío extra).

    GET /api/estadisticas: Resumen total y desglose por país (desafío extra).