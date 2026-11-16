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
  "section": "Home | Header | Events | Community | Projects | CFS"
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
| `event_name` | `string` | `'/events'`, `'/community'`, `'/cfs'`, `'/projects'`, `'/apis'` |
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

### `click_publish_community`
Clic en el botón "Publicar una comunidad" en `/community`.

```json
{
  "event": "click_publish_community",
  "event_name": "Publicar una comunidad",
  "event_link": "https://github.com/lperezp/peruanos.dev/issues/new?template=community.yml",
  "section": "Community"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | `'Publicar una comunidad'` |
| `event_link` | `string` | URL del issue template en GitHub |
| `section` | `string` | `'Community'` |

**Fuente:** [app/community/page.tsx](../app/community/page.tsx)

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

### `click_publish_project`
Clic en el botón "Publicar un proyecto" en `/projects`.

```json
{
  "event": "click_publish_project",
  "event_name": "Publicar un proyecto",
  "event_link": "https://github.com/lperezp/peruanos.dev/issues/new?template=project.yml",
  "section": "Projects"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | `'Publicar un proyecto'` |
| `event_link` | `string` | URL del issue template en GitHub |
| `section` | `string` | `'Projects'` |

**Fuente:** [app/projects/page.tsx](../app/projects/page.tsx)

---

### 🎤 Call for Speakers (sección /cfs)

---

### `click_apply_cfs`
Clic en el botón "Postular como Speaker" de una convocatoria.

```json
{
  "event": "click_apply_cfs",
  "event_name": "DevFest Lima 2026 - Call for Speakers",
  "event_link": "https://sessionize.com/devfestlima2026",
  "section": "CFS"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Título de la convocatoria |
| `event_link` | `string` | URL de postulación |
| `section` | `string` | `'CFS'` |

**Fuente:** [app/components/cfs/CfsCard.tsx](../app/components/cfs/CfsCard.tsx)

---

### `click_share_cfs`
Clic en el botón "Compartir" de una convocatoria.

```json
{
  "event": "click_share_cfs",
  "event_name": "DevFest Lima 2026 - Call for Speakers",
  "event_link": "https://sessionize.com/devfestlima2026",
  "section": "CFS"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | Título de la convocatoria |
| `event_link` | `string` | URL de la convocatoria |
| `section` | `string` | `'CFS'` |

**Fuente:** [app/components/cfs/CfsCard.tsx](../app/components/cfs/CfsCard.tsx) → [app/components/ui/ShareButton.tsx](../app/components/ui/ShareButton.tsx)

---

### `click_publish_cfs`
Clic en el botón "Publicar un Call for Speakers" en `/cfs`.

```json
{
  "event": "click_publish_cfs",
  "event_name": "Publicar un Call for Speakers",
  "event_link": "https://github.com/lperezp/peruanos.dev/issues/new?template=cfs.yml",
  "section": "CFS"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | `'Publicar un Call for Speakers'` |
| `event_link` | `string` | URL del issue template en GitHub |
| `section` | `string` | `'CFS'` |

**Fuente:** [app/cfs/page.tsx](../app/cfs/page.tsx)

---

### 🏠 Home (/)

---

### `click_publish_event`
Clic en el botón "Publicar un evento" (en Home o en `/events`).

```json
{
  "event": "click_publish_event",
  "event_name": "Publicar un evento",
  "event_link": "https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml",
  "section": "Home | Events"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | `'Publicar evento'` (Home) o `'Publicar un evento'` (Events) |
| `event_link` | `string` | URL del issue template en GitHub |
| `section` | `string` | `'Home'` \| `'Events'` |

**Fuentes:**
- [app/page.tsx](../app/page.tsx)
- [app/events/page.tsx](../app/events/page.tsx)

---

### `click_contribute_repo`
Clic en el botón "Ir al repositorio" de la sección "¿Cómo contribuir?" en Home.

```json
{
  "event": "click_contribute_repo",
  "event_name": "Ir al repositorio",
  "event_link": "https://github.com/lperezp/peruanos.dev",
  "section": "Home"
}
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event_name` | `string` | `'Ir al repositorio'` |
| `event_link` | `string` | URL del repositorio en GitHub |
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
| `click_share_event` | Events / EventModal | título del evento | URL del evento | — |
| `filter_events` | Events | valor del filtro | — | `city` \| `topic` \| `type` \| `search` |
| `view_community` | Community | nombre de comunidad | — | — |
| `click_visit_community` | Community / Home | nombre de comunidad | URL del sitio | — |
| `click_community_social` | Community | nombre de comunidad | URL de red social | — |
| `click_community_email` | Community | nombre de comunidad | `mailto:` | — |
| `filter_communities` | Community | valor del filtro | — | `city` \| `topic` \| `search` |
| `click_publish_community` | Community | `'Publicar una comunidad'` | URL del issue | — |
| `click_view_project` | Projects | nombre del repo | URL de GitHub | — |
| `click_publish_project` | Projects | `'Publicar un proyecto'` | URL del issue | — |
| `click_apply_cfs` | CFS | título del CFS | URL de postulación | — |
| `click_share_cfs` | CFS | título del CFS | URL del CFS | — |
| `click_publish_cfs` | CFS | `'Publicar un Call for Speakers'` | URL del issue | — |
| `click_publish_event` | Home / Events | `'Publicar evento'` / `'Publicar un evento'` | URL del issue | — |
| `click_contribute_repo` | Home | `'Ir al repositorio'` | URL del repo | — |
