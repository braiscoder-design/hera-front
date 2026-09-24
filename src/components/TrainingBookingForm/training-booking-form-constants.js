// Constantes de datos del formulario de reserva de Formaciones

// Envío por email vía EmailJS (sin backend propio). El destinatario real
// se configura en el propio template de EmailJS, no aquí — esto son solo
// los identificadores de la cuenta (cuenta de Brais, temporal).
export const EMAILJS_SERVICE_ID = 'service_zqgxraq'
export const EMAILJS_TEMPLATE_ID = 'template_ani26xg'
export const EMAILJS_PUBLIC_KEY = 'azGbDPw5W2yeb1-0V'

export const YES_NO_OPTIONS = ['yes', 'no']
export const ROLE_OPTIONS = ['selfEmployed', 'ceo', 'employee', 'notWorking', 'other']
export const MOTIVATION_OPTIONS = ['learnTechnique', 'startBusiness', 'clientsAsked', 'other']

export const TRAINING_FORM_FIELDS = [
  { id: 'firstName', kind: 'text' },
  { id: 'lastName', kind: 'text' },
  { id: 'email', kind: 'email' },
  { id: 'phone', kind: 'phone' },
  { id: 'birthDate', kind: 'date' },
  { id: 'city', kind: 'text' },
  { id: 'hasSalon', kind: 'radio', optionsGroup: 'yesNo', options: YES_NO_OPTIONS },
  // Solo se muestra y es obligatorio si la respuesta anterior es "Sí".
  { id: 'salonInfo', kind: 'text', dependsOn: { field: 'hasSalon', equals: 'yes' } },
  { id: 'role', kind: 'radio', optionsGroup: 'role', options: ROLE_OPTIONS },
  { id: 'motivation', kind: 'radio', optionsGroup: 'motivation', options: MOTIVATION_OPTIONS },
  { id: 'priorExperience', kind: 'radio', optionsGroup: 'yesNo', options: YES_NO_OPTIONS },
  { id: 'priorTrainings', kind: 'textarea' },
  { id: 'instagram', kind: 'text' },
  { id: 'howHeard', kind: 'text' },
  { id: 'preferredDate', kind: 'text' },
  { id: 'expectations', kind: 'textarea' },
]
