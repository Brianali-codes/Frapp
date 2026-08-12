export const es = {
  header: {
    title: "Ajustes.",
    subtitle: "Personaliza el comportamiento de la aplicación, ajusta notificaciones, cambia la pantalla o lee licencias de código abierto."
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
    savedGiveawaysSub: "Acceder a juegos guardados",
    notificationSettings: "Notificaciones",
    notificationSettingsSub: "Configurar notificaciones push",
    appIntroduction: "Bienvenida",
    appIntroductionSub: "Revisar contexto de bienvenida",
    checkForUpdates: "Versión de la App",
    checkForUpdatesSub: "Buscar Actualizaciones",
    Report: "Reportar un Error",
    ReportSub: "Reportar errores o problemas",
  },
  about: {
    developer: "Sobre el Desarrollador",
    developerSub: "Visitar portafolio personal",
    moreApps: "Más Aplicaciones",
    moreAppsSub: "Explorar repositorios de GitHub",
    socials: "Redes Sociales",
    socialsSub: "Conectar en redes",
    privacy: "Política de Privacidad",
    privacySub: "Ver Nuestra Política de Privacidad."
  },
  community: {
    supportOpenSource: "Apoyar Código Abierto",
    supportOpenSourceSub: "Esta aplicación es independiente y gratuita. Si valoras estas ofertas, ¡dejarnos una estrella en GitHub nos ayuda mucho!",
    starGithub: "Danos una estrella en GitHub",
    buyCoffee: "Invítame un Café",
    buyCoffeeSub: "¡Ayúdanos a mantener los servidores activos! Una pequeña donación nos permite mantener el proyecto y añadir nuevas funciones.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Sitio Gamepower",
    gamepowerSub: "Fuente principal de giveaways",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API de ofertas de videojuegos"
  },
  report: {
    title: "Reportar un Error.",
    subtitle: "Reportar Errores o Problemas",
    sectionTitle: "Selecciona una Categoría de Error",
    categories: {
      ui: "Fallo de UI/UX",
      api: "Error de API / Datos",
      crash: "Rendimiento / Cierre Inesperado",
      feature: "Solicitud de Función"
    },
    githubCard: {
      title: "Enviar directamente vía GitHub Issues",
      description: "Al hacer clic en el botón de abajo, se empaquetará tu selección con los parámetros de tu dispositivo y se abrirá la página de incidencias de GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Avisos de API de Terceros",
      description: "Todos los datos mostrados se obtienen directamente de redes externas a través de las arquitecturas públicas de Gamepower y CheapShark. Frapp no manipula precios ni gestiona tiempos de distribución."
    },
    footerVersion: "Versión de Frapp v1.1.4",
    alerts: {
      errorTitle: "Error",
      errorMessage: "No se pudo redirigir a GitHub. Verifica los permisos de navegación."
    },
    github: {
      bodyDescription: "Esta acción eliminará permanentemente todos los regalos guardados de tu lista. Tendrás que buscar y volver a añadirlos manualmente.",
      step1: "Abre la aplicación",
      step2: "Navega a...",
      step3: "Observa..."
    }
  },
  footer: {
    build: "Versión de Frapp {{version}}"
  },
  updateModal: {
    title: "Actualización Disponible",
    subtitle: "¡{{version}} ya está aquí!",
    description: "Una nueva versión ({{latest}}) está disponible. ¡Actualiza desde tu versión actual ({{current}}) para acceder a los últimos cambios!",
    later: "Cancelar",
    updateNow: "Actualizar Ahora"
  },
  modals: {
    dismiss: "Borrar Todo",
    ok: "Aceptar",
    testFailedTitle: "Fallo de Prueba",
    testFailedMessage: "No se pudo ejecutar el bucle de renderizado. Confirma los permisos locales.",
    upToDateTitle: "Actualizado",
    upToDateMessage: "Ya estás utilizando la versión más reciente ({{version}}). No se requieren actualizaciones.",
    upToDateAction: "Genial",
    checkFailedTitle: "Fallo de Verificación",
    checkFailedMessage: "No se pudieron realizar las consultas. Comprueba tu conexión a Internet e inténtalo de nuevo.",
    failedAction: "Cerrar",
    socialsTitle: "Compartir Promo",
    languageTitle: "Seleccionar Idioma"
  },
  giveaways: {
    title: "Regalos / Giveaways.",
    summary: {
      prefix: "Encontramos ",
      midActive: " giveaways de juegos activos a fecha de ",
      midWorth: ", valorados en un total de ",
      suffix: ". ¡Reclámalos antes de que expiren!"
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
      drmFree: "DRM-Free",
      itchio: "itch.io"
    },
    error: {
      title: "Conexión Interrumpida",
      description: "No se puede conectar con los servidores en este momento. Asegúrate de estar en línea e inténtalo de nuevo.",
      retryButton: "Reintentar Conexión"
    },
    empty: {
      title: "No se encontraron regalos",
      description: "No hay giveaways activos disponibles para esta plataforma actualmente.",
      viewAllButton: "Ver Todas las Plataformas"
    },
    tracking: {
      days_left: "Quedan {{count}} días",
      day_left: "Queda 1 día",
      ends_today: "Termina Hoy",
      expired: "Expirado",
      keys_left: "Claves restantes: {{count}}",
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
      description: "Esta acción eliminará permanentemente todos los giveaways fijados de tu lista guardada.",
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
    share_message: "🔥 Alerta de Oferta: ¡{{title}} ha bajado a {{price}} (Ahorro de {{saved}}) en {{platform}}!\nConsíguelo aquí: {{url}}",
    save_amount: "{{amount}}% DTO",
    hot_deal: "Oferta Destacada",
    rating: "{{percent}}",
    released: "Finaliza: ",
    no_description: "¡Aprovecha esta oferta excepcional antes de que expire la promoción!",
    breakdown_title: "Ver Detalles",
    breakdown_body: "Ahorra un total de {{saved}} sobre el precio habitual de {{original}} (un descuento del {{percent}}%).",
    summary: {
      prefix: "Analizamos las tiendas de videojuegos y encontramos ",
      midActive: " grandes descuentos activos a fecha de ",
      suffix: ". ¡Toca cualquier título para asegurar tu clave!"
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
      description: "No podemos sincronizar con los servidores. Comprueba tu conexión a Internet.",
      retryButton: "Reintentar Conexión"
    },
    empty: {
      title: "No se encontraron coincidencias",
      description: "No hay ofertas disponibles en esta categoría.",
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
    legalSubtitle: "Por favor, revisa las condiciones de privacidad antes de acceder.",
    title: "Rastrea regalos de juegos y ofertas destacadas.",
    title2: "Obtén Giveaways y Ofertas",
    description: "Frapp reúne tanto juegos gratuitos como grandes descuentos en múltiples tiendas para que juegues más pagando menos.",
    privacyHeader: "Marco de Privacidad y Datos",
    privacyBody: "Frapp es un agregador de datos de código abierto que funciona de manera local. No almacenamos datos en servidores ni rastreamos tu actividad. Todo el procesamiento se realiza en tu dispositivo.",
    consentLabel: "Acepto los Términos de Servicio y la Declaración de Privacidad",
    btnStep1: "Continuar",
    btnStep2: "Empezar",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;