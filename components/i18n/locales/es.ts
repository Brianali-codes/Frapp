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
    themeAppearance: "Aspecto del Tema",
    themeDark: "Modo Oscuro",
    themeLight: "Modo Claro",
    appLanguage: "Idioma de la App",
    appLanguageSub: "Cambiar Idiomas",
    savedGiveaways: "Mi Biblioteca.",
    savedGiveawaysSub: "Acceder a juegos guardados",
    notificationSettings: "Notificaciones",
    notificationSettingsSub: "Alternar notificaciones push",
    appIntroduction: "Bienvenida",
    appIntroductionSub: "Revisar el contexto de bienvenida",
    checkForUpdates: "Versión de la App",
    checkForUpdatesSub: "Buscar Actualizaciones"
  },
  about: {
    developer: "Sobre el Desarrollador",
    developerSub: "Visitar portafolio personal",
    moreApps: "Más Aplicaciones",
    moreAppsSub: "Explorar repositorios de GitHub",
    socials: "Redes Sociales",
    socialsSub: "Conectar en diferentes plataformas",
    privacy: "Política de Privacidad",
    privacySub: "Ver nuestra Política de Privacidad."
  },
  community: {
    supportOpenSource: "Apoyar Código Abierto",
    supportOpenSourceSub: "Esta aplicación se ha diseñado de forma independiente y se aloja gratis. Si valoras encontrar estas ofertas, ¡dejarnos una estrella en GitHub nos ayuda un montón!",
    starGithub: "Danos una estrella en GitHub",
    buyCoffee: "Invítame a un Café",
    buyCoffeeSub: "¡Ayuda a mantener vivos los servidores! Una pequeña donación nos permite mantener el proyecto y añadir nuevas funciones.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Sitio de Gamepower",
    gamepowerSub: "Fuente principal de datos de regalos",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API de ofertas de videojuegos"
  },
  report: {
    title: "Reportar un error.",
    subtitle: "¿Tiene problemas con la aplicación? Elija una plantilla para enviar un informe. (Los informes se enviarán a nuestro repositorio de GitHub para su revisión)",
    sectionTitle: "Seleccione una categoría de error",
    categories: {
      ui: "Error de UI/UX",
      api: "Error de API / Datos",
      crash: "Rendimiento / Cuelgue",
      feature: "Solicitud de Función"
    },
    githubCard: {
      title: "Enviar directamente a través de GitHub Issues",
      description: "Al hacer clic en el botón de abajo, se empaqueta de forma segura su selección y los parámetros de entorno del dispositivo local, abriendo la página de seguimiento de problemas de GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Divulgaciones de API de Terceros",
      description: "Todos los índices de datos visibles en la interfaz se obtienen directamente de redes externas a través de las arquitecturas públicas abiertas de Gamepower y CheapShark. El uso de estos índices cumple directamente con sus reglas de distribución nativas. Frapp no manipula los listados de artículos individuales, no altera las estructuras de precios ni gestiona los plazos de distribución. Por lo tanto, no podemos garantizar la disponibilidad ininterrumpida, la exactitud o el soporte continuo de los nodos externos o las claves distribuidas a través de esas respectivas plataformas."
    },
    footerVersion: "Versión de Frapp v1.1.4",
    alerts: {
      errorTitle: "Error",
      errorMessage: "No se pudo redirigir a GitHub. Verifique los permisos de enrutamiento del navegador."
    },
    github: {
      bodyDescription: "Esta acción eliminará permanentemente todos los regalos guardados de su lista. Tendrá que buscarlos y agregarlos manualmente de nuevo.",
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
    ok: "Aceptar",
    testFailedTitle: "Fallo en el Objetivo de Prueba",
    testFailedMessage: "No se pudo ejecutar el bucle de renderizado de despliegue instantáneo. Confirme los permisos locales.",
    upToDateTitle: "Al Día",
    upToDateMessage: "Ya estás ejecutando nuestra revisión más reciente ({{version}}). No se requieren actualizaciones.",
    upToDateAction: "Impresionante",
    checkFailedTitle: "Fallo de Verificación",
    checkFailedMessage: "No se pudieron completar las consultas de búsqueda en este momento. Compruebe su conexión e inténtelo de nuevo.",
    socialsTitle: "Compartir Oferta",
    languageTitle: "Seleccionar Idioma"
  },
  giveaways: {
    title: "Regalos.",
    summary: {
      prefix: "Encontramos ",
      midActive: " regalos de juegos activos a fecha de ",
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
      drmFree: "Sin DRM",
      itchio: "itch.io"
    },
    error: {
      title: "Conexión Interrumpida",
      description: "No podemos sincronizarnos con las fuentes de datos principales en este momento. Verifique su acceso a Internet e inténtelo de nuevo.",
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
      keys_left: "Claves restantes: {{count}}",
      instructions_title: "Instrucciones para Reclamar:"
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
      description: "Esta acción eliminará permanentemente todos los regalos guardados de su lista. Deberá buscarlos y volver a agregarlos manualmente.",
      confirmButton: "Borrar Todo"
    }
  },
  deals: {
    title: "Ofertas.",
    titleClaim: "Reclamar Oferta.",
    claim: "Reclamar Oferta",
    retailer: "Distribuidor",
    store: "Tienda",
    free_uppercase: "GRATIS",
    share_message: "🔥 Alerta de Oferta: ¡{{title}} ha bajado a {{price}} (Ahorras {{saved}}) en {{platform}}!\nConsíguelo aquí: {{url}}",
    save_amount: "{{amount}}% DE DESCUENTO",
    hot_deal: "Oferta de Gran Valor",
    rating: "{{percent}}",
    released: "Termina: ",
    no_description: "¡Aprovecha esta oferta de valor excepcional antes de que expire el período de promoción o cambien los precios!",
    breakdown_title: "Ver Detalles",
    breakdown_body: "Ahorra un total de {{saved}} sobre el precio minorista regular de {{original}} (lo que refleja un descuento del {{percent}}%).",
    summary: {
      prefix: "Analizamos las tiendas de juegos activas y descubrimos ",
      midActive: " descuentos masivos disponibles el ",
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
      description: "No podemos sincronizarnos con los servidores en este momento. Asegúrate de que tu dispositivo esté en línea e inténtelo de nuevo.",
      retryButton: "Reintentar Conexión"
    },
    empty: {
      title: "No se Encontraron Coincidencias",
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
    privacyHeader: "Marco Central de Privacidad",
    privacyBody: "Frapp funciona completamente como una herramienta agregadora de datos de código abierto. No mantenemos plataformas de almacenamiento localizadas, no recopilamos estruturas de cuentas físicas ni rastreamos historiales de telemetría de usuarios. Dado que todos los procesos se ejecutan directamente en su hardware, ningún dato se transmite, procesa o registra nunca por un centro maestro interno o una red administrativa centralizada. Sus perfiles de configuración localizados, archivos de caché históricos y preferencias interactivas permanecen de forma segura en su dispositivo.",
    consentLabel: "Acepto los Términos de Servicio y la Declaración de Privacidad",
    btnStep1: "Continuar",
    btnStep2: "Comenzar",
    versionLabel: "Frapp • v1.1.3"
  }
} as const;