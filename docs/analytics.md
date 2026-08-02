# Eventos de Analytics — peruanos.dev

Este documento cataloga todos los eventos de GA4 y Vercel Analytics implementados en el proyecto.

## Infraestructura

| Herramienta | Implementación |
|---|---|
| **Google Analytics 4 (GA4)** | Función `trackEvent` en [app/lib/analytics.ts](../app/lib/analytics.ts), que llama a `window.gtag('event', ...)` |
| **Vercel Analytics** | Componente `<Analytics />` en `app/layout.tsx` — registra page views automáticamente |

---

## Estructura estándar de parámetros

Todos los eventos siguen esta estructura base:

```json
{
  "event": "nombre_del_evento",
  "event_name": "Título o identificador del ítem",
  "event_link": "https://url-asociada.com",
  "section": "Home | Header | Events | Community | Projects"
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Nombre del ítem rastreado (título de evento, comunidad, destino, etc.) |
| `event_link` | `string` | URL asociada a la acción (cuando aplica) |
| `section` | `string` | Sección del sitio donde se origina el disparo |

Los eventos de filtros incluyen además `filter_type` para identificar qué dimensión se filtró.

---

## Eventos personalizados GA4

### 🌐 Header (global)

---

### `navigate_menu`
Clic en un enlace del menú de navegación (escritorio y móvil).

```json
{
  "event": "navigate_menu",
  "event_name": "/events",
  "section": "Header"
}
```

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `event_name` | `string` | `'/events'`, `'/community'`, `'/projects'`, `'/apis'` |
| `section` | `string` | `'Header'` |

**Fuente:** [app/components/layout/Header.tsx](../app/components/layout/Header.tsx)

---

### `toggle_theme`
Cambio entre tema claro y oscuro.

```json
{
  "event": "toggle_theme",
  "event_name": "dark",
  "section": "Header"
}
```

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `event_name` | `string` | `'light'`, `'dark'` |
| `section` | `string` | `'Header'` |

**Fuente:** [app/components/layout/Header.tsx](../app/components/layout/Header.tsx)

---

### 🗓️ Eventos (sección /events)

---

### `view_event`
El usuario abre el panel lateral de detalles de un evento.

```json
{
  "event": "view_event",
  "event_name": "Conferencia abc",
  "section": "Events"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Título del evento |
| `section` | `string` | `'Events'` |

**Fuente:** [app/components/events/EventSideModal.tsx](../app/components/events/EventSideModal.tsx)

---

### `click_register_event`
Clic en el botón de registro/página de un evento.

```json
{
  "event": "click_register_event",
  "event_name": "Conferencia abc",
  "event_link": "https://lu.ma/abc",
  "section": "Events | Home"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Título del evento |
| `event_link` | `string` | URL de registro |
| `section` | `string` | `'Events'` (listado/panel lateral), `'Home'` (tarjeta en home) |

**Fuentes:**
- [app/components/events/EventCard.tsx](../app/components/events/EventCard.tsx) — listado, `section: 'Events'`
- [app/components/events/EventSideModal.tsx](../app/components/events/EventSideModal.tsx) — panel lateral, `section: 'Events'`

---

### `click_share_event`
Clic en el botón "Compartir" de una tarjeta de evento.

```json
{
  "event": "click_share_event",
  "event_name": "Conferencia abc",
  "event_link": "https://lu.ma/abc",
  "section": "Events"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Título del evento |
| `event_link` | `string` | URL del evento |
| `section` | `string` | `'Events'` |

**Fuente:** [app/components/events/EventCard.tsx](../app/components/events/EventCard.tsx) → [app/components/ui/ShareButton.tsx](../app/components/ui/ShareButton.tsx)

---

### `filter_events`
El usuario aplica un filtro en la página de eventos.

```json
{
  "event": "filter_events",
  "event_name": "Lima",
  "filter_type": "city",
  "section": "Events"
}
```

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `event_name` | `string` | Valor del filtro aplicado |
| `filter_type` | `string` | `'city'`, `'topic'`, `'type'`, `'search'` |
| `section` | `string` | `'Events'` |

> El filtro `'search'` se dispara con debounce de 500 ms.

**Fuente:** [app/hooks/useEventFilters.ts](../app/hooks/useEventFilters.ts)

---

### 🏘️ Comunidades (sección /community)

---

### `view_community`
El usuario abre el panel lateral de detalles de una comunidad.

```json
{
  "event": "view_community",
  "event_name": "GDG Lima",
  "section": "Community"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Nombre de la comunidad |
| `section` | `string` | `'Community'` |

**Fuente:** [app/components/communities/CommunitySideModal.tsx](../app/components/communities/CommunitySideModal.tsx)

---

### `click_visit_community`
Clic en el enlace al sitio web de una comunidad.

```json
{
  "event": "click_visit_community",
  "event_name": "GDG Lima",
  "event_link": "https://gdg.community/lima",
  "section": "Community | Home"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Nombre de la comunidad |
| `event_link` | `string` | URL del sitio web de la comunidad |
| `section` | `string` | `'Community'` (listado/panel lateral), `'Home'` (tarjeta en home) |

**Fuentes:**
- [app/components/communities/CommunitySideModal.tsx](../app/components/communities/CommunitySideModal.tsx) — `section: 'Community'`
- [app/components/communities/CommunityCard.tsx](../app/components/communities/CommunityCard.tsx) — `section: 'Community'`
- [app/components/communities/CommunityCardHome.tsx](../app/components/communities/CommunityCardHome.tsx) — `section: 'Home'`

---

### `click_community_social`
Clic en un enlace de red social dentro del panel lateral de una comunidad.

```json
{
  "event": "click_community_social",
  "event_name": "GDG Lima",
  "event_link": "https://twitter.com/gdglima",
  "section": "Community"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Nombre de la comunidad |
| `event_link` | `string` | URL de la red social |
| `section` | `string` | `'Community'` |

**Fuente:** [app/components/communities/CommunitySideModal.tsx](../app/components/communities/CommunitySideModal.tsx)

---

### `click_community_email`
Clic en el correo electrónico de una comunidad.

```json
{
  "event": "click_community_email",
  "event_name": "GDG Lima",
  "event_link": "mailto:hola@gdglima.com",
  "section": "Community"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Nombre de la comunidad |
| `event_link` | `string` | `mailto:` del correo |
| `section` | `string` | `'Community'` |

**Fuente:** [app/components/communities/CommunitySideModal.tsx](../app/components/communities/CommunitySideModal.tsx)

---

### `filter_communities`
El usuario aplica un filtro en la página de comunidades.

```json
{
  "event": "filter_communities",
  "event_name": "Arequipa",
  "filter_type": "city",
  "section": "Community"
}
```

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `event_name` | `string` | Valor del filtro aplicado |
| `filter_type` | `string` | `'city'`, `'topic'`, `'search'` |
| `section` | `string` | `'Community'` |

> El filtro `'search'` se dispara con debounce de 500 ms.

**Fuente:** [app/hooks/useCommunityFilters.ts](../app/hooks/useCommunityFilters.ts)

---

### 🛠️ Proyectos (sección /projects)

---

### `click_view_project`
Clic en "Ver en GitHub" de una tarjeta de proyecto.

```json
{
  "event": "click_view_project",
  "event_name": "peruanos.dev",
  "event_link": "https://github.com/lperezp/peruanos.dev",
  "section": "Projects"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Nombre del repositorio |
| `event_link` | `string` | URL del repositorio en GitHub |
| `section` | `string` | `'Projects'` |

**Fuente:** [app/components/projects/ProjectCard.tsx](../app/components/projects/ProjectCard.tsx)

---

### 🏠 Home (/)

---

### `click_publish_event`
Clic en el botón "Publicar un evento" del hero de la home.

```json
{
  "event": "click_publish_event",
  "event_name": "Publicar evento",
  "event_link": "https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml",
  "section": "Home"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | `'Publicar evento'` |
| `event_link` | `string` | URL del issue template en GitHub |
| `section` | `string` | `'Home'` |

**Fuente:** [app/page.tsx](../app/page.tsx)

---

## Resumen de eventos

| Evento | Sección | `event_name` | `event_link` | `filter_type` |
|---|---|---|---|---|
| `navigate_menu` | Header | destino (`/events`, etc.) | — | — |
| `toggle_theme` | Header | `'light'` \| `'dark'` | — | — |
| `view_event` | Events | título del evento | — | — |
| `click_register_event` | Events / Home | título del evento | URL de registro | — |
| `click_share_event` | Events | título del evento | URL del evento | — |
| `filter_events` | Events | valor del filtro | — | `city` \| `topic` \| `type` \| `search` |
| `view_community` | Community | nombre de comunidad | — | — |
| `click_visit_community` | Community / Home | nombre de comunidad | URL del sitio | — |
| `click_community_social` | Community | nombre de comunidad | URL de red social | — |
| `click_community_email` | Community | nombre de comunidad | `mailto:` | — |
| `filter_communities` | Community | valor del filtro | — | `city` \| `topic` \| `search` |
| `click_view_project` | Projects | nombre del repo | URL de GitHub | — |
| `click_publish_event` | Home | `'Publicar evento'` | URL del issue | — |


---

## Eventos personalizados GA4

### Navegación

#### `navigate_menu`
Disparado al hacer clic en un enlace del menú de navegación (escritorio y móvil).

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `destination` | `string` | `'/events'`, `'/community'`, `'/projects'`, `'/apis'` |

**Fuente:** `app/components/layout/Header.tsx`

---

#### `toggle_theme`
Disparado al cambiar entre tema claro y oscuro.

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `new_theme` | `string` | `'light'`, `'dark'` |

**Fuente:** `app/components/layout/Header.tsx`

---

### Eventos (sección /events)

#### `view_event`
Disparado cuando el usuario abre el panel lateral de detalles de un evento.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_title` | `string` | Título del evento |
| `event_type` | `string` | Tipo del evento (ej. `'Meetup'`, `'Conferencia'`) |

**Fuente:** `app/components/events/EventSideModal.tsx`

---

#### `click_register_event`
Disparado al hacer clic en el botón de registro/página de un evento.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_title` | `string` | Título del evento |
| `event_type` | `string` | Tipo del evento |

**Fuentes:**
- `app/components/events/EventCard.tsx` (listado)
- `app/components/events/EventCardHome.tsx` (home)
- `app/components/events/EventSideModal.tsx` (panel lateral)

---

#### `click_share_event`
Disparado al hacer clic en el botón "Compartir" de una tarjeta de evento.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_title` | `string` | Título del evento |
| `event_type` | `string` | Tipo del evento |

**Fuente:** `app/components/events/EventCard.tsx` → `app/components/ui/ShareButton.tsx`

---

#### `filter_events`
Disparado al aplicar cualquier filtro en la página de eventos.

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `filter_type` | `string` | `'city'`, `'topic'`, `'type'`, `'search'` |
| `value` | `string` | Valor del filtro aplicado |

> El filtro `'search'` se dispara con un debounce de 500 ms.

**Fuente:** `app/hooks/useEventFilters.ts`

---

### Comunidades (sección /community)

#### `view_community`
Disparado cuando el usuario abre el panel lateral de detalles de una comunidad.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `community_name` | `string` | Nombre de la comunidad |
| `community_city` | `string` | Ciudad de la comunidad |

**Fuente:** `app/components/communities/CommunitySideModal.tsx`

---

#### `click_visit_community`
Disparado al hacer clic en el enlace al sitio web de una comunidad.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `community_name` | `string` | Nombre de la comunidad |
| `community_city` | `string` | Ciudad de la comunidad |

**Fuentes:**
- `app/components/communities/CommunitySideModal.tsx` (panel lateral)
- `app/components/communities/CommunityCard.tsx` (listado)
- `app/components/communities/CommunityCardHome.tsx` (home)

---

#### `click_community_social`
Disparado al hacer clic en una red social dentro del panel lateral de una comunidad.

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `community_name` | `string` | Nombre de la comunidad |
| `social_network` | `string` | `'github'`, `'twitter'`, `'linkedin'`, `'discord'`, `'facebook'`, `'youtube'`, `'instagram'` |

**Fuente:** `app/components/communities/CommunitySideModal.tsx`

---

#### `click_community_email`
Disparado al hacer clic en el correo electrónico de una comunidad.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `community_name` | `string` | Nombre de la comunidad |

**Fuente:** `app/components/communities/CommunitySideModal.tsx`

---

#### `filter_communities`
Disparado al aplicar cualquier filtro en la página de comunidades.

| Parámetro | Tipo | Valores posibles |
|---|---|---|
| `filter_type` | `string` | `'city'`, `'topic'`, `'search'` |
| `value` | `string` | Valor del filtro aplicado |

> El filtro `'search'` se dispara con un debounce de 500 ms.

**Fuente:** `app/hooks/useCommunityFilters.ts`

---

### Proyectos (sección /projects)

#### `click_view_project`
Disparado al hacer clic en "Ver en GitHub" de una tarjeta de proyecto.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `project_name` | `string` | Nombre del repositorio |
| `project_language` | `string` | Lenguaje principal del repositorio |

**Fuente:** `app/components/projects/ProjectCard.tsx`

---

### Home (/)

#### `click_publish_event`
Disparado al hacer clic en el botón "Publicar un evento" del hero de la home.

> No envía parámetros adicionales.

**Fuente:** `app/page.tsx`

---

## Resumen de eventos

| Evento | Sección | Parámetros |
|---|---|---|
| `navigate_menu` | Global | `destination` |
| `toggle_theme` | Global | `new_theme` |
| `view_event` | Eventos | `event_title`, `event_type` |
| `click_register_event` | Eventos | `event_title`, `event_type` |
| `click_share_event` | Eventos | `event_title`, `event_type` |
| `filter_events` | Eventos | `filter_type`, `value` |
| `view_community` | Comunidades | `community_name`, `community_city` |
| `click_visit_community` | Comunidades | `community_name`, `community_city` |
| `click_community_social` | Comunidades | `community_name`, `social_network` |
| `click_community_email` | Comunidades | `community_name` |
| `filter_communities` | Comunidades | `filter_type`, `value` |
| `click_view_project` | Proyectos | `project_name`, `project_language` |
| `click_publish_event` | Home | — |
