# peruanos.dev

Directorio centralizado de eventos, comunidades y proyectos open source de la comunidad tech peruana.

## Sobre el proyecto

peruanos.dev es una plataforma que reúne información sobre:

- **Eventos**: Meetups, conferencias, talleres y charlas de tecnología en Perú
- **Comunidades**: Grupos y organizaciones tech peruanas
- **Proyectos Open Source**: Proyectos de código abierto creados por desarrolladores peruanos

## Características

- Búsqueda y filtrado por ciudad, categoría y tags
- Información actualizada de eventos próximos
- Directorio de comunidades activas
- Showcase de proyectos open source peruanos
- Modo claro/oscuro
- Diseño responsive
- Sitemap y structured data

## Comenzar

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Contribuir

Hay dos formas de contribuir al proyecto:

### Para todos (sin conocimientos técnicos)

Usa nuestros formularios de GitHub Issues para agregar contenido:

- [Agregar un evento](../../issues/new?template=event.yml)
- [Agregar una comunidad](../../issues/new?template=community.yml)
- [Agregar un proyecto](../../issues/new?template=project.yml)

### Para desarrolladores

Si quieres contribuir código, corregir bugs o mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz tus cambios y commits
4. Push a tu fork: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

Lee la [guía de contribución](CONTRIBUTING.md) completa para más detalles.

## Estructura del Proyecto

```
app/
├── components/         # Componentes React
├── context/           # Context API (Theme)
├── data/              # Datos de eventos, comunidades, proyectos
├── hooks/             # Custom hooks
├── lib/               # Utilidades
├── models/            # Interfaces TypeScript
├── community/         # Página de comunidades
├── events/            # Página de eventos
└── projects/          # Página de proyectos
```

## Comandos Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Crea build de producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
```

## Licencia

Este proyecto está abierto a la comunidad. Si tienes sugerencias sobre licenciamiento, por favor abre un Issue.

## Comunidad

¿Tienes preguntas o sugerencias? Abre un [Issue](../../issues/new) o únete a la conversación.
