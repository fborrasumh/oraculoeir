# OráculoEIR

Qué bloques caerán en el EIR 2027 (sábado 23 de enero de 2027), estimado a partir de los exámenes EIR oficiales, con simulacros de preguntas oficiales y un generador de preguntas nuevas revisadas por varios agentes de IA. Aplicación web de un solo fichero.

**Usar la app:** https://fborrasumh.github.io/oraculoeir/
**Idiomas:** español (por defecto), inglés y portugués. Se cambia en el selector de la barra superior o con `?lang=en` / `?lang=pt` en la URL. Las preguntas del EIR se muestran siempre en español.

## Qué hace

1. **Predicción por bloque.** Cuenta cuántas preguntas ha tenido cada bloque (Comunitaria, Fundamentos, Salud Mental, Médico-quirúrgica por aparatos, etc.) en cada EIR, las convierte en proporción del examen y estima cuántas tendrá en 2027 sobre 200, con un intervalo del 80 %.
   - Método: media ponderada en la que los años recientes pesan más (semivida de 4 años), más la mitad de la tendencia lineal.
2. **Cuánto fiarse.** Validación a ciegas en los últimos EIR: cada uno se predice solo con los años anteriores y se compara con lo que salió, frente a dos referencias sencillas (repetir el año anterior y la media de todos los años).
3. **Simulacro probable.** Preguntas oficiales en la proporción que predice el modelo, con la respuesta de la plantilla definitiva. Puntúa como el EIR (+3 / −1 / 0) y tiene reloj opcional al ritmo del examen (270 minutos para 210 preguntas). Gratis y sin clave.
4. **Reto diario.** Diez preguntas oficiales, las mismas para todo el mundo cada día, con racha y resultado en emojis para compartir.
5. **Generador con agentes** (con la clave de IA de cada persona): un agente redacta, dos resuelven a ciegas con las opciones barajadas y el código comprueba el formato y que no sea copia del banco oficial. Solo se aceptan las preguntas en las que coinciden los tres. Exporta a Word, CSV y Moodle (GIFT).

## Lo que no hace (límites reales)

- **No predice preguntas concretas**, solo cuántas tendrá cada bloque.
- **El EIR no tiene asignaturas oficiales.** Los 26 bloques (`data/asignaturas.json`) son una clasificación propia, parecida a la de las academias. Cada pregunta la asigna `gpt-6-luna` (`scripts/eir_clasifica_ia.py`, secreto `OPENAI_API_KEY`) o, sin clave, palabras clave, que se equivocan en algunas preguntas.
- **Que tres agentes coincidan no garantiza que una pregunta generada sea correcta.** Las únicas respuestas con respaldo oficial son las de las preguntas oficiales.
- **Las preguntas con imagen y las anuladas no entran en los simulacros.**
- Herramienta independiente, sin relación con el Ministerio de Sanidad.

## Datos: cómo se traen los exámenes al repositorio

Mientras no exista `data/eir.json`, la app funciona en **modo demostración**: recuentos ficticios y 12 preguntas escritas para la demo, ambos marcados como tales.

El flujo **Actions → «Datos EIR» → Run workflow** (`.github/workflows/datos-eir.yml`):

1. `scripts/eir_fetch.py --api` abre el portal FSE con Chromium para obtener su token anónimo y pide a su API, convocatoria a convocatoria, el cuaderno de Enfermería (versión 0) y la hoja de respuestas definitiva. El código de la titulación Enfermería en la API se detecta solo: prueba varios y se queda con el que devuelve un cuaderno que dice «Enfermería». Si ninguno funciona, lanza el paso `sondear` y pásalo a mano con `--titulacion`.
2. `scripts/eir_externos.py` completa años antiguos con las URL de `data/fuentes_externas.json` (vacío de momento).
3. `scripts/eir_datos.py` extrae preguntas y opciones, lee la respuesta oficial, clasifica cada pregunta y escribe `data/eir.json` y `data/informe.md`.

**Revisa a mano al menos 20 preguntas por año contra el PDF antes de dar los datos por buenos.**

## Privacidad

- La predicción, los simulacros, el reto diario, la racha y la clave de IA se quedan en el navegador.
- El generador envía al proveedor elegido el bloque y unas preguntas oficiales de ejemplo, nunca datos de la persona.

## Desarrollo y pruebas

```bash
python3 scripts/i18n_fuente.py     # regenera src/i18n.js (diccionarios en/pt)
python3 build.py                   # monta index.html
node tests/test_nucleo.js          # predicción, validación, muestreo, puntuación, comprobaciones del generador
python3 tests/test_datos.py        # extracción de cuadernos y plantillas (textos de prueba)
python3 tests/smoke_test.py        # app completa en Chromium con IA simulada
```

## Autoría

- Fernando Borrás Rocher (Universidad Miguel Hernández de Elche) · ORCID [0000-0002-5519-4573](https://orcid.org/0000-0002-5519-4573)

Basada en OráculoMIR, adaptada al examen EIR.

Fuente de las preguntas oficiales: cuadernos de examen y plantillas definitivas de respuestas publicados por el Ministerio de Sanidad (portal de Formación Sanitaria Especializada).

## Cómo citar

Borrás Rocher, F. (2026). *OráculoEIR* (v1.0.0) [Software]. https://github.com/fborrasumh/oraculoeir (DOI en trámite)

## Licencia

Código: MIT. Véase [LICENSE](LICENSE). Las preguntas oficiales pertenecen a su fuente (Ministerio de Sanidad) y se reproducen citándola.
