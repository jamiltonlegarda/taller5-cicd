# Scrum y Trunk-Based Development (TBD)

Plantilla de trabajo para que el equipo acuerde cómo planifica, desarrolla e integra cambios de forma frecuente y segura.

## Principios

- Mantener una única rama principal, siempre en estado integrable.
- Integrar cambios pequeños y frecuentes para reducir conflictos y detectar problemas pronto.
- Trabajar en ramas de vida corta; evitar ramas de larga duración y lotes grandes de cambios.
- Usar Feature Toggles para integrar código incompleto sin exponer funcionalidad no habilitada.
- Automatizar las pruebas y validaciones para obtener retroalimentación rápida.
- Compartir la responsabilidad por la calidad, el producto y la estabilidad de la rama principal.

## Roles

- **Product Owner:** prioriza el Product Backlog, aclara el valor esperado y valida los criterios de aceptación.
- **Developers:** convierten las historias en incrementos terminados; diseñan, implementan, prueban y los integran a la rama principal.
- **Scrum Master:** facilita los eventos de Scrum, ayuda a eliminar impedimentos y promueve el cumplimiento de los acuerdos de trabajo.
- **Revisor o responsable de integración:** cuando el equipo lo requiera, facilita la revisión o el soporte de integración sin crear una cola prolongada de cambios.

## Reglas de Oro

- Mantener los cambios pequeños, revisables y enfocados en una historia o tarea.
- Integrar a la rama principal al menos una vez al día; no acumular trabajo en ramas de larga vida.
- Mantener la rama principal verde: si una validación falla, atenderla antes de continuar integrando cambios.
- Proteger funcionalidades incompletas o riesgosas con Feature Toggles; definir quién puede activarlos y cómo retirarlos.
- Hacer revisión colaborativa y oportuna; la revisión no debe convertirse en un bloqueo prolongado.
- Comunicar de inmediato los bloqueos, conflictos y riesgos que afecten la entrega.
- Acordar explícitamente cualquier excepción al flujo de integración y darle seguimiento hasta cerrarla.

## Definition of Done (DoD) - Fase 1 Final

### DoD Técnico

- [ ] Cumple todos sus criterios de aceptación verificables.
- [ ] El código fue revisado según el acuerdo del equipo y está integrado en la rama principal.
- [ ] Las pruebas automatizadas pertinentes pasan y las nuevas pruebas necesarias están incluidas.
- [ ] El pipeline de CI pasa sin errores (tests + lint + build).
- [ ] La funcionalidad incompleta o no habilitada está protegida por el Feature Toggle definido.
- [ ] La documentación y las notas operativas se actualizaron cuando corresponde.
- [ ] No quedan defectos conocidos que impidan usar el incremento de forma segura.
- [ ] Imagen Docker en GHCR (si aplica).

### DoD de Negocio

- [ ] Acceptance Criteria cumplidos.
- [ ] Se puede validar en el entorno de destino.
- [ ] PO conoce el estado del Toggle (si aplica).

### DoD de Despliegue

- [ ] Desplegado automáticamente en Render.
- [ ] Health check pasando.
- [ ] Logs / monitoreo básico verificado.
- [ ] Toggle en el estado acordado.

## Definition of Ready (DoR)

Una historia está lista para entrar al trabajo cuando:

- [ ] Está redactada con el formato: Como [tipo de usuario], quiero [capacidad], para [beneficio].
- [ ] Sus criterios de aceptación son claros y verificables.
- [ ] Está dividida en un incremento integrable en un día o menos.
- [ ] El Feature Toggle está identificado o se indica por qué no aplica.
- [ ] No tiene dependencias bloqueantes sin resolver.
- [ ] La estrategia de pruebas automatizadas indica qué probar y dónde.
- [ ] El equipo entiende el alcance y puede estimar el trabajo.

## Acuerdos de Planificación (Taller 4)

**Pregunta de cierre:** ¿Qué cambia en nuestra próxima Planning?

**Respuesta del equipo:** El DoR estricto y el primer ítem integrable el Día 1.

### Acciones concretas

1. Aplicar el DoR estricto a cada historia antes de incorporarla al Sprint.
2. Redactar el Sprint Goal en formato TBD, indicando qué se despliega y qué queda detrás de un Feature Toggle.
3. Reservar el 30% de la capacidad del equipo para revisión de PRs y CI.

## Acuerdos de Cierre (Taller 5)

**Pregunta:** A partir de mañana, ¿qué cambia en mi forma de trabajar gracias a este pipeline?

**Respuesta del equipo:**

- Ya no tenemos miedo de mergear a `main`; el CI y el Feature Toggle nos protegen.
- Cualquier funcionalidad incompleta debe nacer detrás de un Toggle en ConfigCat.
- El auto-deploy en Render elimina la carga manual y los errores de despliegue.

**Acciones de seguimiento:**

1. Monitorear los próximos 5 despliegues automáticos en Render.
2. Crear toggles para las próximas 2 historias del backlog.
3. Revisar el nuevo DoD en la próxima Retrospective.

## Política de Liberación Segura (Feature Toggles - Taller 6)

- Ninguna funcionalidad se libera al 100% de los usuarios de forma inmediata.
- Flujo de liberación estándar: Equipo interno -> 5% de usuarios -> 20% de usuarios -> 100%.
- Criterio de Rollback: Se desactivará el toggle si la tasa de errores del flujo principal supera el 0.5% o si el health check falla.
- Regla de oro: La presión comercial no anula la necesidad de un pipeline estable y métricas claras.
- Limpieza: Todo toggle debe ser eliminado del código en un máximo de 30 días tras su liberación total.

## Formato Oficial de Sprint Review (CD - Taller 6)

1. Presentación del problema de usuario y la solución técnica.
2. Demostración en producción (Render) mostrando el estado real con el Toggle en OFF.
3. Activación temporal del Toggle solo para el equipo, demostrando el flujo completo.
4. Validación del valor por parte del PO.
5. Comunicación transparente sobre el estado de liberación (interno vs público).

## Formato Oficial de Sprint Retrospective (Taller 6)

La retrospectiva debe analizar obligatoriamente:

1. **Salud del Pipeline:** Fallos de CI, rollbacks, tiempos de deploy.
2. **Disciplina TBD:** Frecuencia de integración, vida de las ramas, limpieza de toggles.
3. **Flujo de Valor:** Lead time y disponibilidad de métricas.

_Regla estricta: Se seleccionan máximo 3 acciones concretas y asignables para el siguiente sprint._

## Acuerdos de Cierre (Taller 6)

**Pregunta:** En una frase, ¿qué cambia en nuestro próximo Review y Retro después de este taller?

**Respuesta del equipo:** El Review se enfocará en demostrar valor real en producción usando toggles y el estado del pipeline; la Retro medirá la salud técnica y la disciplina TBD, priorizando la estabilidad sobre la presión comercial.
