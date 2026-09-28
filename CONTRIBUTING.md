# Guía de Contribución

¡Gracias por tu interés en contribuir a peruanos.dev! Este proyecto es mantenido por la comunidad y todas las contribuciones son bienvenidas.

## Tabla de Contenidos

- [Formas de Contribuir](#formas-de-contribuir)
- [Agregar Contenido (Issues)](#agregar-contenido-issues)
- [Contribuciones Técnicas (Pull Requests)](#contribuciones-técnicas-pull-requests)
- [Proceso de Revisión](#proceso-de-revisión)
- [Código de Conducta](#código-de-conducta)

## Formas de Contribuir

Hay dos formas principales de contribuir a peruanos.dev:

### 1. Agregar Contenido (Recomendado para todos)

Si quieres agregar eventos, comunidades o proyectos, la forma más fácil es **crear un Issue** usando nuestros formularios interactivos. No necesitas conocimientos técnicos de Git o GitHub.

### 2. Contribuciones Técnicas (Para desarrolladores)

Si quieres mejorar el código, agregar features o corregir bugs, puedes crear un **Pull Request** directamente.

---

## Agregar Contenido (Issues)

### Para Usuarios No Técnicos

Esta es la forma más fácil de contribuir. Solo necesitas una cuenta de GitHub.

#### Agregar un Evento

1. Ve a la [página de Issues](https://github.com/lperezp/peruanos.dev/issues/new/choose)
2. Selecciona "Agregar Evento"
3. Completa el formulario con la información del evento:
   - Título, descripción, fecha y hora
   - Ubicación y ciudad
   - Tipo (Presencial, Virtual, Híbrido)
   - URL de registro
   - Tags relevantes
4. Envía el issue

#### Agregar una Comunidad

1. Ve a la [página de Issues](https://github.com/lperezp/peruanos.dev/issues/new/choose)
2. Selecciona "Agregar Comunidad"
3. Completa el formulario con la información de la comunidad:
   - Nombre y descripción
   - Logo y ciudad
   - Información de contacto (email, website, redes sociales)
   - Temas principales
4. Envía el issue

#### Agregar un Proyecto Open Source

1. Ve a la [página de Issues](https://github.com/lperezp/peruanos.dev/issues/new/choose)
2. Selecciona "Agregar Proyecto Open Source"
3. Completa el formulario con la información del proyecto:
   - Owner y nombre del repositorio
   - URL completa del repositorio
   - Por qué debería incluirse
   - Tecnologías principales
4. Envía el issue

#### Agregar una Startup

1. Ve a la [página de Issues](https://github.com/lperezp/peruanos.dev/issues/new/choose)
2. Selecciona "Agregar Startup"
3. Completa el formulario con la información de la startup:
   - Nombre, descripción y sitio web
   - Logo e industria(s)
   - Etapa (Bootstrapped, Seed, Series A, Series B+)
   - Estado de contratación (Hiring) y link a vacantes
   - Ubicación y redes sociales
4. Envía el issue

**Nota:** Una vez enviado el issue, un mantenedor del proyecto revisará la información y agregará el contenido al sitio web.

---

## Contribuciones Técnicas (Pull Requests)

### Para Desarrolladores

Si tienes conocimientos técnicos y quieres contribuir código directamente:

### 1. Configuración Inicial

```bash
# Hacer fork del repositorio en GitHub

# Clonar tu fork
git clone https://github.com/TU-USUARIO/peruanos.dev.git
cd peruanos.dev

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### 2. Crear una Rama

```bash
git checkout -b tipo/descripcion-breve
```

Tipos de rama:
- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `style/` - Cambios de UI/UX
- `refactor/` - Refactorización de código

Ejemplo: `feature/add-event-filters`

### 3. Hacer Cambios

#### Agregar un Evento Directamente

Edita el archivo [`app/data/events.ts`](app/data/events.ts):

```typescript
{
  title: "Nombre del Evento",
  description: "Descripción del evento",
  date: "2026-02-15",
  time: "19:00",
  location: "Dirección o URL",
  city: "Lima",
  type: "Presencial", // o "Virtual" o "Híbrido"
  image_url: "https://...", // opcional
  registration_url: "https://eventbrite.com/...",
  tags: ["javascript", "react"],
  organizer: "React Peru" // opcional
}
```

#### Agregar una Comunidad Directamente

Edita el archivo [`app/data/communities.ts`](app/data/communities.ts):

```typescript
{
  name: "Nombre de la Comunidad",
  description: "Descripción breve",
  logo_url: "https://...",
  city: "Lima",
  topics: ["react", "javascript"],
  contact: {
    email: "contacto@ejemplo.com",
    website: "https://ejemplo.com",
    socialMedia: {
      github: "https://github.com/...",
      twitter: "https://twitter.com/...",
      linkedin: "https://linkedin.com/...",
      discord: "https://discord.gg/..."
    }
  }
}
```

#### Agregar un Proyecto Directamente

Edita el archivo [`app/data/projects.ts`](app/data/projects.ts):

```typescript
{
  owner: "username",
  repo: "awesome-project"
}
```

**Nota:** La información del proyecto se obtiene automáticamente de la API de GitHub.

#### Agregar una Startup Directamente

Edita el archivo [`app/data/startups.ts`](app/data/startups.ts):

```typescript
{
  id: "nombre-startup",
  name: "Nombre de la Startup",
  description: "Descripción breve de la startup y su producto",
  logo: "https://...",
  website: "https://...",
  industry: ["Fintech", "SaaS"],
  stage: "Series A", // "Bootstrapped" | "Seed" | "Series A" | "Series B+"
  hiring: true,
  careersUrl: "https://.../careers", // opcional
  location: "Lima, Perú", // o "Remoto"
  socials: {
    linkedin: "https://linkedin.com/company/...",
    twitter: "https://twitter.com/...",
    github: "https://github.com/..."
  }
}
```

### 4. Verificar los Cambios

```bash
# Ejecutar el proyecto localmente
npm run dev

# Verificar que compile sin errores
npm run build

# Ejecutar linter
npm run lint
```

### 5. Commit y Push

```bash
git add .
git commit -m "feat: agregar evento React Workshop 2026"
git push origin nombre-de-tu-rama
```

Formato de commits (convencional):
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato/estilo
- `refactor:` - Refactorización
- `test:` - Agregar tests
- `chore:` - Tareas de mantenimiento

### 6. Crear Pull Request

1. Ve a tu fork en GitHub
2. Haz clic en "Compare & pull request"
3. Completa la plantilla de PR con:
   - Descripción clara de los cambios
   - Tipo de cambio
   - Cómo se ha probado
   - Screenshots (si aplica)
4. Envía el PR

---

## Proceso de Revisión

1. **Envío:** Creas un Issue o PR
2. **Revisión:** Un mantenedor revisa tu contribución
3. **Feedback:** Puede solicitarse cambios o aclaraciones
4. **Aprobación:** Una vez aprobado, se fusiona o implementa
5. **Publicación:** Los cambios se despliegan automáticamente

## Código de Conducta

### Nuestros Valores

- **Respeto:** Tratamos a todos con respeto y dignidad
- **Inclusión:** Valoramos la diversidad y fomentamos la participación de todos
- **Colaboración:** Trabajamos juntos para construir una mejor comunidad
- **Calidad:** Nos esforzamos por mantener altos estándares

### Comportamiento Esperado

- Usa lenguaje acogedor e inclusivo
- Respeta diferentes puntos de vista
- Acepta críticas constructivas con gracia
- Enfócate en lo que es mejor para la comunidad

### Comportamiento Inaceptable

- Lenguaje o imágenes sexualizadas
- Comentarios insultantes o despectivos
- Acoso público o privado
- Publicar información privada de otros sin permiso
- Cualquier conducta que razonablemente se considere inapropiada

---

## ¿Necesitas Ayuda?

Si tienes preguntas o necesitas ayuda:

- Crea un [Issue con preguntas](https://github.com/lperezp/peruanos.dev/issues/new)
- Revisa [Issues existentes](https://github.com/lperezp/peruanos.dev/issues)
- Contacta a los mantenedores

---
