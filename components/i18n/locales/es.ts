// src/i18n/locales/es.ts
export const es = {
  header: {
    title: "Ajustes.",
    subtitle: "Personaliza el comportamiento de la aplicación, ajusta las notificaciones, cambia la configuración de pantalla o lee las credenciales de código abierto."
  },
  sections: {
    preferences: "Preferencias.",
    about: "Acerca de.",
    community: "Comunidad y Soporte.",
    providers: "Proveedores de Datos."
  },
  preferences: {
    themeAppearance: "Apariencia del Tema",
    themeDark: "Modo Oscuro",
    themeLight: "Modo Claro",
    appLanguage: "Idioma de la Aplicación",
    appLanguageSub: "Cambiar capas de traducción",
    savedGiveaways: "Mi Biblioteca",
    savedGiveawaysSub: "Accede a tus juegos guardados",
    notificationSettings: "Configuración de Notificaciones",
    notificationSettingsSub: "Alternar configuraciones push",
    appIntroduction: "Introducción de la Aplicación",
    appIntroductionSub: "Revisar el contexto de bienvenida",
    checkForUpdates: "Buscar Actualizaciones",
    checkForUpdatesSub: "Verificar las iteraciones de compilación"
  },
  about: {
    developer: "Acerca del Desarrollador",
    developerSub: "Visitar portafolio personal",
    moreApps: "Más Aplicaciones",
    moreAppsSub: "Explorar repositorios de GitHub",
    socials: "Redes Sociales",
    socialsSub: "Conéctate en diferentes plataformas",
    privacy: "Política de Privacidad",
    privacySub: "Ver las políticas de Frapp"
  },
  community: {
    supportOpenSource: "Apoya el Código Abierto",
    supportOpenSourceSub: "Esta aplicación está creada de forma independiente y alojada de forma gratuita. Si encuentras valor en descubrir estas ofertas, ¡dejarnos una estrella en GitHub ayuda muchísimo!",
    starGithub: "Danos una estrella en GitHub",
    buyCoffee: "Invítame a un Café",
    buyCoffeeSub: "¡Ayuda a mantener los servidores activos y el café fluyendo! Una pequeña donación nos permite mantener el proyecto y añadir nuevas funciones.",
    donateKofi: "Donar en Ko-fi",
    donatePatreon: "Donar en Patreon"
  },
  providers: {
    gamepower: "Sitio de Gamepower",
    gamepowerSub: "Fuente principal de datos de sorteos",
    cheapshark: "API de CheapShark",
    cheapsharkSub: "Matriz de la API de ofertas de videojuegos"
  },
  report: {
    title: "¿Limpiar Biblioteca Guardada?",
    subtitle: "¿Tienes problemas con la aplicación o notaste precios o valores inconsistentes? Elige una categoría a continuación y envía un informe de seguimiento en vivo.",
    sectionTitle: "Selecciona una Categoría de Error",
    categories: {
      ui: "Problema de Interfaz (UI/UX)",
      api: "Error de API / Datos",
      crash: "Rendimiento / Cierre Inesperado",
      feature: "Solicitud de Función"
    },
    githubCard: {
      title: "Enviar directamente a través de GitHub Issues",
      description: "Al hacer clic en el botón de acción a continuación, se empaqueta de forma segura tu plantilla de selección junto con los parámetros del entorno de tu dispositivo local y se abre la página de seguimiento de problemas de GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Atribución del Proyecto y API",
      description: "Esta distribución de código abierto depende completamente de los flujos estructurales proporcionados por las arquitecturas de Gamepower y Free To Game. Ninguna de estas APIs independientes o entidades de contenido asociadas pertenecen directamente a FRAPP."
    },
    footerVersion: "Versión de Frapp v1.1.4",
    alerts: {
      errorTitle: "Error",
      errorMessage: "No se pudo redirigir a GitHub. Verifica los permisos de enrutamiento del navegador."
    },
    github: {
      bodyDescription: "Esta acción eliminará de forma permanente todos los sorteos fijados de tu lista de guardados. Tendrás que explorar y volver a agregarlos manualmente.",
      step1: "Abrir la aplicación",
      step2: "Navegar a...",
      step3: "Observar..."
    }
  },
  footer: {
    build: "Versión de Frapp {{version}}"
  },
  updateModal: {
    title: "Actualización Disponible",
    subtitle: "¡{{version}} ya está aquí!",
    description: "Una nueva versión de la aplicación ({{latest}}) está disponible. ¡Actualiza desde tu versión actual ({{current}}) para acceder a los últimos cambios!",
    later: "Cancelar",
    updateNow: "Actualizar Ahora"
  },
  modals: {
    dismiss: "Borrar Todo",
    ok: "OK",
    testFailedTitle: "Fallo del Objetivo de Prueba",
    testFailedMessage: "No se pudo ejecutar el bucle de renderizado de despliegue instantáneo. Confirma los permisos locales.",
    upToDateTitle: "Al Día",
    upToDateMessage: "Ya estás ejecutando nuestra compilación de revisión más reciente ({{version}}). No se necesitan actualizaciones.",
    upToDateAction: "Genial",
    checkFailedTitle: "Fallo de Verificación",
    checkFailedMessage: "No se pudieron completar las consultas de búsqueda en este momento. Comprueba tu índice de conectividad e inténtalo de nuevo.",
    socialsTitle: "Conéctate conmigo",
    languageTitle: "Seleccionar Idioma"
  },
  giveaways: {
    title: "Gratis para Reclamar.",
    summary: {
      prefix: "Has fijado ",
      midActive: " sorteos para reclamar, lo que te ahorra un total de ",
      midWorth: "",
      suffix: "¡ Asegúrate de reclamarlos antes de que expiren!"
    },
    platforms: {
      all: "Todos",
      pc: "PC",
      steam: "Steam",
      epic: "Epic",
      gog: "GOG",
      ps4: "PS4",
      ps5: "PS5",
      xboxSeries: "Xbox Series",
      xboxOne: "Xbox One",
      switch: "Switch",
      android: "Android",
      ios: "iOS",
      drmFree: "Sin DRM",
      itchio: "itch.io"
    },
    error: {
      title: "Conexión Interrumpida",
      description: "No podemos sincronizarnos con los canales de búsqueda en este momento. Comprueba tu acceso a Internet e inténtalo de nuevo.",
      retryButton: "Reintentar Conexión"
    },
    empty: {
      title: "Tu Biblioteca está Vacía",
      description: "¡Explora los sorteos activos y toca el ícono del corazón para guardarlos aquí y reclamarlos fácilmente más tarde!",
      viewAllButton: "Explorar la Aplicación"
    },
    tracking: {
      days_left: "Quedan {{count}} Días",
      day_left: "Queda 1 Día",
      ends_today: "Termina Hoy",
      expired: "Expirado",
      keys_left: "Claves Restantes: {{count}}",
      instructions_title: "Instrucciones para Reclamar:"
    },
    pagination: {
      previous: "Anterior",
      next: "Siguientes Juegos"
    }
  },
  deals: {
    title: "Ofertas de Juegos.",
    claim: "Reclamar Ahora",
    retailer: "Distribuidor",
    store: "Tienda",
    free_uppercase: "GRATIS",
    share_message: "🔥 Alerta de Oferta: ¡{{title}} ha bajado a {{price}} (Ahorras {{saved}}) en {{platform}}!\nConsíguelo aquí: {{url}}",
    save_amount: "AHORRA ${{amount}}",
    hot_deal: "VALORADO",
    rating: "{{percent}}% de Aprobación",
    released: "Termina: ",
    no_description: "No se encontró contexto de descripción adicional. ¡Atrapa esta oferta antes de que cambien los valores de destino!",
    breakdown_title: "Ver Info de la Oferta",
    breakdown_body: "Ahorras {{saved}} sobre la valoración de venta original de {{original}} ({{percent}}% de descuento en total).",
    summary: {
      prefix: "Hemos revisado los índices actuales de las tiendas web activas y detectamos ",
      midActive: " descuentos de valor principal en vivo desde el ",
      suffix: ". ¡Interactúa con cualquier tarjeta de título para asegurar tus claves!"
    },
    stores: {
      all: "Todas las Tiendas",
      amazon: "Amazon"
    },
    empty: {
      title: "No se Encontraron Coincidencias",
      description: "No se han catalogado índices de juegos con descuento que coincidan con esta selección de tienda.",
      resetButton: "Restablecer Filtros"
    }
  },
  months: {
    january: "Enero",
    february: "Febrero",
    march: "Marzo",
    april: "Abril",
    may: "Mayo",
    june: "Junio",
    july: "Julio",
    august: "Agosto",
    september: "Septiembre",
    october: "Octubre",
    november: "Noviembre",
    december: "Diciembre"
  }
} as const;