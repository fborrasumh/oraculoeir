/* ══ Datos: el banco oficial (data/eir.json, lo genera la GitHub Action) o, si aún no existe, un DEMO marcado como ficticio ══ */
const ASIGS_BASE = [
  ['fundamentos', 'Fundamentos y Metodología enfermera'], ['comunitaria', 'Enfermería Comunitaria y Salud Pública'], ['epidemiologia', 'Epidemiología y Estadística'], ['investigacion', 'Investigación y Enfermería basada en la evidencia'],
  ['gestion', 'Gestión, Administración y Calidad'], ['legislacion', 'Legislación, Ética y Bioética'], ['farmaco', 'Farmacología'], ['nutricion', 'Nutrición y Dietética'],
  ['anatomia', 'Anatomía y Fisiología'], ['mq_cardio', 'Médico-quirúrgica: Cardiovascular'], ['mq_respiratorio', 'Médico-quirúrgica: Respiratorio'], ['mq_digestivo', 'Médico-quirúrgica: Digestivo'],
  ['mq_endocrino', 'Médico-quirúrgica: Endocrino y Metabolismo'], ['mq_nefro', 'Médico-quirúrgica: Nefrourología'], ['mq_neuro', 'Médico-quirúrgica: Neurología'], ['mq_hemato_onco', 'Médico-quirúrgica: Hematología y Oncología'],
  ['mq_locomotor', 'Médico-quirúrgica: Locomotor y Traumatología'], ['mq_infecciosas', 'Infecciosas y Prevención de infecciones'], ['quirofano', 'Quirófano y Cuidados perioperatorios'], ['urgencias', 'Urgencias, Cuidados críticos y RCP'],
  ['piel', 'Heridas, úlceras y cuidados de la piel'], ['obstetrica', 'Enfermería Obstétrico-Ginecológica'], ['pediatrica', 'Enfermería Pediátrica'], ['salud_mental', 'Enfermería de Salud Mental'],
  ['geriatrica', 'Enfermería Geriátrica'], ['paliativos', 'Cuidados paliativos y final de la vida'], ['otras', 'Sin clasificar']
].map(([id, nombre]) => ({id, nombre}));

/* DEMO · preguntas ESCRITAS PARA LA DEMOSTRACIÓN (no son preguntas oficiales del EIR); sirven para probar la app sin datos */
const DEMO_PREG = [
  ['fundamentos', 'Según la taxonomía NANDA-I, ¿qué elementos forman el enunciado de un diagnóstico enfermero real en el formato PES?', ['Problema, etiología y signos o síntomas.', 'Problema, intervención y resultado.', 'Valoración, diagnóstico y planificación.', 'Necesidad, objetivo y evaluación.'], 1],
  ['urgencias', 'En la reanimación cardiopulmonar básica de un adulto realizada por un solo reanimador, ¿qué relación entre compresiones torácicas y ventilaciones se recomienda?', ['15:2.', '30:2.', '5:1.', '30:1.'], 2],
  ['piel', '¿Qué escala se usa para valorar el riesgo de lesiones por presión, de forma que una puntuación más baja indica mayor riesgo?', ['Escala de Glasgow.', 'Escala de Braden.', 'Índice de Barthel.', 'Escala de Downton.'], 2],
  ['epidemiologia', 'En la evaluación de una prueba diagnóstica, ¿cómo se define la sensibilidad?', ['Proporción de sanos con resultado negativo.', 'Proporción de positivos que están realmente enfermos.', 'Proporción de enfermos con resultado positivo.', 'Proporción de negativos que están realmente sanos.'], 3],
  ['obstetrica', 'Gestante de 34 semanas con preeclampsia con criterios de gravedad. Además del control de la tensión arterial, ¿qué fármaco se administra para prevenir la eclampsia?', ['Sulfato de magnesio.', 'Furosemida.', 'Diazepam en perfusión continua.', 'Ácido acetilsalicílico a dosis altas.'], 1],
  ['geriatrica', '¿Qué índice valora la capacidad de una persona mayor para las actividades básicas de la vida diaria, como comer, bañarse, vestirse o controlar esfínteres?', ['Índice de Barthel.', 'Índice de Lawton y Brody.', 'Cuestionario de Pfeiffer.', 'Escala de Norton.'], 1],
  ['salud_mental', 'Paciente con trastorno bipolar estable en tratamiento con litio. ¿Cuál de estos fármacos tiende a elevar la litemia y obliga a vigilar los niveles?', ['Hidroclorotiazida.', 'Paracetamol.', 'Omeprazol.', 'Levotiroxina.'], 1],
  ['mq_infecciosas', 'Según la Organización Mundial de la Salud, ¿cuántos momentos para la higiene de manos se definen en la atención al paciente?', ['Tres.', 'Cinco.', 'Siete.', 'Diez.'], 2],
  ['farmaco', 'Hay que administrar 500 mg de un fármaco que se presenta en solución de 250 mg por cada 5 ml. ¿Qué volumen se administra?', ['2 ml.', '5 ml.', '10 ml.', '20 ml.'], 3],
  ['mq_endocrino', 'Paciente con diabetes, consciente y capaz de tragar, con una glucemia capilar de 55 mg/dl. ¿Cuál es la actuación inicial?', ['Dar 15-20 g de hidratos de carbono de absorción rápida por vía oral y repetir la glucemia a los 15 minutos.', 'Administrar glucagón intramuscular de forma inmediata.', 'Administrar insulina rápida subcutánea.', 'Esperar una hora y repetir la glucemia antes de actuar.'], 1],
  ['legislacion', 'Según la legislación española de autonomía del paciente, ¿qué documento permite a una persona dejar por escrito los cuidados que desea recibir si en el futuro no puede expresar su voluntad?', ['El parte de lesiones.', 'El documento de instrucciones previas.', 'El certificado médico oficial.', 'La hoja de reclamaciones.'], 2],
  ['comunitaria', 'En el modelo transteórico de Prochaska y DiClemente, ¿en qué estadio se encuentra un fumador que no se plantea dejar de fumar en los próximos seis meses?', ['Contemplación.', 'Precontemplación.', 'Preparación.', 'Mantenimiento.'], 2]
].map(([asig, enunciado, opciones, correcta], i) => ({id: 'demo-' + (i + 1), anio: 0, n: i + 1, asig, enunciado, opciones, correcta, anulada: false, imagen: false, demo: true}));

/* DEMO · recuentos FICTICIOS de 2015 a 2026 (no son datos reales): solo para ver la predicción funcionando */
function demoConteos() {
  const base = {comunitaria: 22, fundamentos: 16, salud_mental: 14, pediatrica: 14, obstetrica: 13, farmaco: 12, epidemiologia: 9, investigacion: 7, gestion: 8, legislacion: 7, geriatrica: 9, mq_cardio: 9, mq_respiratorio: 6, urgencias: 8, mq_infecciosas: 6, nutricion: 5, mq_endocrino: 5, mq_digestivo: 4, mq_nefro: 4, mq_neuro: 4, mq_hemato_onco: 5, quirofano: 4, piel: 5, paliativos: 4, mq_locomotor: 3, anatomia: 3};
  const r = rng('demo-oraculoeir'), c = {};
  for (let y = 2015; y <= 2026; y++) {
    c[y] = {};
    for (const k in base) { const tr = k === 'farmaco' || k === 'geriatrica' ? (y - 2015) * 0.35 : k === 'anatomia' ? -(y - 2015) * 0.25 : 0; c[y][k] = Math.max(0, Math.round(base[k] * 1.05 + tr + (r() - 0.5) * 5)); }
  }
  return c;
}

let DATA = {real: false, asignaturas: ASIGS_BASE, preguntas: DEMO_PREG, conteos: demoConteos(), examenes: [], generado: null};
const nombreAsig = id => t((DATA.asignaturas.find(a => a.id === id) || {nombre: id}).nombre);
/* Carga data/eir.json (mismo origen, en GitHub Pages). Abierta como fichero local o sin datos todavía → DEMO */
async function cargaDatos() {
  try {
    const r = await fetch('data/eir.json', {cache: 'no-cache'});
    if (!r.ok) throw 0;
    const j = await r.json();
    const ps = (j.preguntas || []).filter(q => q && q.enunciado && q.anio);
    if (ps.length < 100) throw 0;
    DATA = {real: true, asignaturas: j.asignaturas || ASIGS_BASE, preguntas: ps, conteos: conteos(ps), examenes: j.examenes || [], generado: j.generado || null, clasificacion: j.clasificacion || ''};
    try { const a = await (await fetch('data/asignaturas.json', {cache: 'no-cache'})).json(); DATA.kws = Object.fromEntries((a.asignaturas || []).map(x => [x.id, x.kw || []])); } catch { DATA.kws = {}; }
  } catch { /* se queda el DEMO */ }
  return DATA;
}
