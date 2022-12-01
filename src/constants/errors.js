const ERRORS = {
  INVALID_USER_NAME: "El nombre de usuario es inválido",
  INVALID_EMAIL: "El correo es inválido",
  INVALID_FIRST_NAME: "El primer nombre es inválido",
  INVALID_LAST_NAME: "El apellido es inválido",
  INVALID_GENDER: "Género inválido",
  INVALID_BIRTHDAY: "Fecha de cumpleaños inválida",
  SHORT_PASSWORD: "La contraseña debe ser mayor a 8 caracteres",
  LONG_PASSWORD: "La contraseña debe ser menor a 60 caracteres",
  TOO_YOUNG: "La edad del usuaio debe ser mayor a 13 años",
  TOO_OLD: "La edad del usuario debe ser menor a 125 años",
  EMAIL_IN_USE: "Un usuario ya está usando tu correo",
  USER_NAME_IN_USE: "Un usuario está usando tu nombre de usuario",
  INCORRECT_PASSWORD: "Contraseña incorrecta",
  INCORRECT_EMAIL: "Ningun usuario esta registrado con el correo ingresado",
  FIRST_NAME_CONTAINS_OFFENSIVE_WORDS:
    "El primer nombre contiene palabras ofensivas",
  LAST_NAME_CONTAINS_OFFENSIVE_WORDS: "El apellido contiene palabras ofensivas",
  NO_REFRESH_TOKEN:
    "No hay token de refresco para convertirlo a token de acceso",
  NO_ACCESS_TOKEN: "No hay token de acceso",
  USER_NOT_FOUND: "Usuario no encontrado",
  POST_MUST_HAVE_CONTENT: "La publicación debe tener contenido",
  POST_NOT_FOUND: "Post no encontrado",
  COMMENT_NOT_FOUND: "Comentario no encontrado",
  UN_AUTHORIZED: "No autorizado",
  COMMENT_MUST_HAVE_CONTENT: "El comentario debe tener contenido",
};

export default ERRORS;
