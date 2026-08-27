export const es = {
  header: {
    title: "Ajustes.",
    subtitle: "Personaliza el comportamiento de la aplicación, ajusta las notificaciones, cambia las opciones de pantalla o lee las credenciales de código abierto."
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
    appLanguage: "Idioma de la App",
    appLanguageSub: "Cambiar Idioma",
    savedGiveaways: "Mi Biblioteca.",
    savedGiveawaysSub: "Accede a tus juegos guardados",
    notificationSettings: "Configuración de Notificaciones",
    notificationSettingsSub: "Activar/desactivar notificaciones push",
    appIntroduction: "Guía de Inicio",
    appIntroductionSub: "Revisar la introducción",
    checkForUpdates: "Versión de la App",
    checkForUpdatesSub: "Buscar Actualizaciones",
    Report: "Notificar un Error",
    ReportSub: "Informar de errores o problemas",
  },
  about: {
    developer: "Sobre el Desarrollador",
    developerSub: "Visitar portafolio personal",
    moreApps: "Más Aplicaciones",
    moreAppsSub: "Explorar repositorios de GitHub",
    socials: "Redes Sociales",
    socialsSub: "Conéctate en diferentes plataformas",
    privacy: "Política de Privacidad",
    privacySub: "Ver nuestra Política de Privacidad."
  },
  community: {
    supportOpenSource: "Apoya el Código Abierto",
    supportOpenSourceSub: "Esta aplicación se ha creado de forma independiente y se aloja gratis. Si te resulta útil encontrar estas ofertas, ¡dejarnos una estrella en GitHub nos ayuda mucho!",
    starGithub: "Darnos una estrella en GitHub",
    buyCoffee: "Invítame a un Café",
    buyCoffeeSub: "¡Ayúdanos a mantener los servidores activos y el café fluyendo! Una pequeña donación nos permite mantener el proyecto y añadir nuevas funciones.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Sitio Gamepower",
    gamepowerSub: "Fuente principal de datos de regalos",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API de ofertas de videojuegos"
  },
  report: {
    title: "Notificar un Error.",
    subtitle: "Informar de Errores o Problemas",
    sectionTitle: "Selecciona una Categoría de Error",
    categories: {
      ui: "Fallo de Interfaz (UI/UX)",
      api: "Error de API / Datos",
      crash: "Rendimiento / Cuelgue",
      feature: "Sugerencia de Función"
    },
    githubCard: {
      title: "Enviar directamente mediante GitHub Issues",
      description: "Al hacer clic en el botón de abajo, se creará una plantilla con tu selección y los parámetros de tu dispositivo, y se abrirá el seguimiento de incidencias de GitHub.",
      buttonText: "Notificar {{category}}"
    },
    attributionCard: {
      title: "Avisos de API de Terceros",
      description: "Todos los datos mostrados en la interfaz se obtienen directamente de redes externas mediante las arquitecturas públicas de Gamepower y CheapShark. El uso de estos datos cumple estrictamente con sus reglas de distribución. Frapp no manipula listados, precios ni plazos de distribución. Por tanto, no podemos garantizar la disponibilidad ininterrumpida de llaves o servicios externos."
    },
    alerts: {
      errorTitle: "Error",
      errorMessage: "No se pudo redirigir a GitHub. Verifica los permisos de tu navegador."
    },
    github: {
      bodyDescription: "Esta acción eliminará de forma permanente todos los juegos guardados de tu lista. Tendrás que buscar y volver a añadirlos manualmente.",
      step1: "Abre la aplicación",
      step2: "Navega a...",
      step3: "Observa..."
    }
  },
  footer: {
    build: "Frapp Versión {{version}}"
  },
  updateModal: {
    title: "Actualización Disponible",
    subtitle: "¡Ya está aquí la versión {{version}}!",
    description: "Hay una versión más reciente disponible ({{latest}}). ¡Actualiza desde tu versión actual ({{current}}) para acceder a los últimos cambios!",
    later: "Cancelar",
    updateNow: "Actualizar Ahora"
  },
  modals: {
    dismiss: "Borrar Todo",
    ok: "Aceptar",
    testFailedTitle: "Fallo de Prueba",
    testFailedMessage: "No se pudo ejecutar el bucle de renderizado. Confirma los permisos locales.",
    upToDateTitle: "App Actualizada",
    upToDateMessage: "Ya estás utilizando la versión más reciente ({{version}}). No se requieren actualizaciones.",
    upToDateAction: "Genial",
    checkFailedTitle: "Fallo de Verificación",
    checkFailedMessage: "No se pudieron realizar las consultas en este momento. Comprueba tu conexión a Internet e inténtalo de nuevo.",
    failedAction: "Cerrar",
    socialsTitle: "Compartir",
    languageTitle: "Seleccionar Idioma"
  },
  giveaways: {
    title: "Regalos.",
    summary: {
      prefix: "Hemos encontrado ",
      midActive: " regalos de juegos activos a fecha de ",
      midWorth: ", valorados en un total de ",
      suffix: ". ¡Reclámalos antes de que expiren!"
    },
    platforms: {
      all: "Todas",
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
      description: "No se puede sincronizar con los servidores en este momento. Asegúrate de que tu dispositivo tiene conexión e inténtalo de nuevo.",
      retryButton: "Reintentar Conexión"
    },
    empty: {
      title: "No se Encontraron Regalos",
      description: "No hay regalos activos disponibles para esta plataforma en este momento.",
      viewAllButton: "Ver Todas las Plataformas"
    },
    tracking: {
      days_left: "Quedan {{count}} Días",
      day_left: "Queda 1 Día",
      ends_today: "Termina Hoy",
      expired: "Expirado",
      keys_left: "Llaves restantes: {{count}}",
      instructions_title: "Instrucciones para reclamar:"
    },
    pagination: {
      previous: "Anterior",
      next: "Siguiente Página"
    }
  },
  giveaways1: {
    summary: {
      prefix: "Tienes ",
      midActive: " juegos guardados ",
      midWorth: ", valorados en un total de ",
      suffix: ". ¡Reclámalos antes de que expiren!"
    },
    empty: {
      viewAllButton: "Explorar la App"
    },
    delete: {
      title: "¿Eliminar todos los juegos?",
      description: "Esta acción eliminará de forma permanente todos los juegos guardados de tu lista. Tendrás que buscar y volver a añadirlos manualmente.",
      confirmButton: "Borrar Todo"
    },
  },
  deals: {
    title: "Ofertas de Juegos.",
    titleClaim: "Reclamar Oferta.",
    claim: "Reclamar Oferta",
    retailer: "Vendedor",
    store: "Tienda",
    free_uppercase: "GRATIS",
    steam_rating: "{{percent}}% Reseñas de Steam {{text}}",
    metacritic_score: "Metacritic: {{score}}",
    share_message: "🔥 Alerta de Oferta: ¡{{title}} ha bajado a {{price}} (Ahorro de {{saved}}) en {{platform}}!\nConsíguelo aquí: {{url}}",
    save_amount: "{{amount}}% DTO",
    carousel_description: "¡Puntuación perfecta de {{rating}}/10 en el índice de ofertas! Ahorra ${{saved}} al instante.",
    hot_deal: "Oferta Destacada",
    best_price: "Mejor Precio",
    verified_promo: "Promo Verificada",
    view: "Ver Oferta",
    no_competing_offers: "No hay ofertas competidoras registradas para este título.",
    rating: "{{percent}}",
    no_description: "¡Aprovecha este gran descuento antes de que finalice la promoción!",
    breakdown_title: "Ver Detalles",
    breakdown_body: "Ahorras un total de {{saved}} sobre el precio original de {{original}} (un descuento del {{percent}}%).",
    live_store_comparisons: "Comparativa de Tiendas en Vivo",
    lowest_price_ever: "Precio Más Bajo Histórico",
    all_time_low: "Mínimo Histórico",
    lowest_price_recorded: "Precio Mínimo Registrado",
    lowest_price_nodate: "Mínimo histórico registrado en ${{price}}",
    summary: {
      prefix: "Hemos analizado las tiendas de videojuegos y encontramos ",
      midActive: " grandes descuentos activos a fecha de ",
      suffix: ". ¡Toca cualquier título para conseguir tu clave!"
    },
    stores: {
      all: "Todas las Tiendas",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Conexión Interrumpida",
      description: "No se puede sincronizar con los servidores en este momento. Asegúrate de que tu dispositivo está conectado e inténtalo de nuevo.",
      retryButton: "Reintentar Conexión"
    },
    empty: {
      title: "Sin Coincidencias",
      description: "No se encontraron ofertas activas bajo esta categoría de tienda.",
      resetButton: "Restablecer Filtros"
    },
    pagination: {
      prev: "Anterior",
      next: "Siguientes Juegos"
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
  },
  onboarding: {
    welcome: "Bienvenido a Frapp",
    legalTitle: "Acuerdos Legales",
    legalSubtitle: "Por favor, revisa las condiciones de privacidad antes de acceder a nuestros flujos de datos.",
    title: "Sigue ofertas y juegos gratis.",
    title2: "Regalos y Ofertas de Videojuegos",
    description: "Frapp reúne juegos gratis y grandes descuentos de múltiples tiendas para que siempre juegues más por menos dinero.",
    privacyHeader: "Marco de Privacidad y Datos",
    privacyBody: "Frapp es un agregador de código abierto diseñado de forma local. No mantenemos servidores centrales ni recopilamos datos personales o de telemetría. Todo el procesamiento se realiza en tu dispositivo, garantizando que tus datos y preferencias permanezcan seguros y privados.",
    consentLabel: "Acepto los Términos de Servicio y la Política de Privacidad",
    btnStep1: "Continuar",
    btnStep2: "Empezar",
    versionLabel: "v1.1.6",
    permissionsTitle: "Permisos de la Aplicación",
    permissionsSubtitle: "Frapp necesita acceso a las notificaciones y alarmas de tu dispositivo. Por favor, concede los permisos necesarios. En dispositivos Android 14+ se puede requerir el permiso de Alarma Exacta.",
    pushTitle: "Notificaciones Push",
    pushDesc: "Recibe alertas al instante cuando haya juegos gratis o grandes descuentos.",
    granted: "Listo",
    allow: "Permitir",
    alarmTitle: "Recordatorios Exactos",
    alarmDesc: "Programa alertas con 24h de antelación para juegos a punto de expirar en tu biblioteca.",
    setup: "Configurar"
  }
} as const;