/* Configuración editable del sitio. Es la única fuente de datos de contacto y de autoría
   (D-023, D-038). Para pasar a Client o Production: completar los valores y poner
   contacto.activo = true. No hace falta tocar ninguna página. */
var CONFIG = {
  contacto: {
    activo: false,
    whatsapp: null,   // número en formato internacional sin «+», p. ej. "519XXXXXXXX"
    correo: null,
    instagram: null,  // URL del perfil
    mensajePrellenado: 'Hola, quiero cotizar mi local ({rubro}, {m²} m²)'
  },
  autor: {
    nombre: 'Matías',
    url: ''           // «Ver portafolio →» solo aparece cuando tiene valor
  }
};
