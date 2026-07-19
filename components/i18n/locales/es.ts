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
    appLanguageSub: "Cambiar Idiomas",
    savedGiveaways: "Mi Biblioteca.",
    savedGiveawaysSub: "Acceder a juegos guardados",
    notificationSettings: "Ajustes de Notificaciones",
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
    privacySub: "Ver Nuestra Política de Privacidad."
  },
  community: {
    supportOpenSource: "Apoya el Código Abierto",
    supportOpenSourceSub: "Esta aplicación se ha diseñado de forma independiente y se aloja gratis. Si encuentras valor en descubrir estas ofertas, ¡dejarnos una estrella en GitHub nos ayuda muchísimo!",
    starGithub: "Danos una estrella en GitHub",
    buyCoffee: "Invítame a un café",
    buyCoffeeSub: "¡Ayuda a mantener vivos los servidores y el café fluyendo! Una pequeña donación nos permite mantener el proyecto y añadir nuevas funciones.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Sitio de Gamepower",
    gamepowerSub: "Fuente principal de datos de regalos",
    cheapshark: "API de CheapShark",
    cheapsharkSub: "API de ofertas de videojuegos"
  },
  report: {
    title: "Reportar un Error.",
    subtitle: "Si tienes problemas con la aplicación, elige tu plantilla para enviar un informe. (Los informes se enviarán a nuestro repositorio de GitHub para su revisión)",
    sectionTitle: "Selecciona una Categoría de Error",
    categories: {
      ui: "Fallo de UI/UX",
      api: "Error de API / Datos",
      crash: "Rendimiento / Cierre Inesperado",
      feature: "Solicitud de Función"
    },
    githubCard: {
      title: "Enviar directamente mediante GitHub Issues",
      description: "Al hacer clic en el botón de acción de abajo, se empaqueta de forma segura tu plantilla elegida y los parámetros del entorno de tu dispositivo local, abriendo la página de seguimiento de problemas de GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Divulgaciones de API de Terceros",
      description: "Todos los índices de datos visibles en la interfaz se obtienen directamente de redes externas a través de las arquitecturas públicas y abiertas de Gamepower y CheapShark. El uso de estos índices cumple directamente con sus reglas de distribución nativas. Frapp no manipula los listados de artículos individuales, no altera las estructuras de precios ni gestiona los plazos de distribución. Por lo tanto, no podemos garantizar la disponibilidad ininterrumpida, la precisión o el soporte continuo de los nodos externos o de las claves distribuidas a través de sus respectivas plataformas."
    },
    footerVersion: "Versión de Frapp v1.1.4",
    alerts: {
      errorTitle: "Error",
      errorMessage: "No se pudo redirigir a GitHub. Verifica los permisos de enrutamiento del navegador."
    },
    github: {
      bodyDescription: "Esta acción eliminará de forma permanente todos los regalos fijados de tu lista de guardados. Tendrás que explorar y volver a agregarlos manualmente.",
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
    description: "Una versión más nueva de la aplicación ({{latest}}) está disponible. ¡Actualiza desde tu versión actual ({{current}}) para acceder a los últimos cambios!",
    later: "Cancelar",
    updateNow: "Actualizar Ahora"
  },
  modals: {
    dismiss: "Borrar Todo",
    ok: "OK",
    testFailedTitle: "Fallo del Objetivo de Prueba",
    testFailedMessage: "No se pudo ejecutar el bucle de renderizado de despliegue instantáneo. Confirma los permisos locales.",
    upToDateTitle: "Actualizado",
    upToDateMessage: "Ya estás ejecutando nuestra compilación de revisión más reciente ({{version}}). No se necesitan actualizaciones.",
    upToDateAction: "Genial",
    checkFailedTitle: "Fallo de Verificación",
    checkFailedMessage: "No se pudieron completar las consultas de búsqueda en este momento. Comprueba tu índice de conectividad y vuelve a intentarlo.",
    socialsTitle: "Compartir Promo",
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
      description: "No podemos sincronizarnos con los canales de búsqueda ascendentes en este momento. Comprueba tu acceso a internet e inténtalo de nuevo.",
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
      description: "Esta acción eliminará de forma permanente todos los regalos fijados de tu lista de guardados. Tendrás que explorar y volver a agregarlos manualmente.",
      confirmButton: "Borrar Todo"
    }
  },
  deals: {
    title: "Ofertas de Juegos.",
    titleClaim: "Reclamar Oferta.",
    claim: "Reclamar Oferta",
    retailer: "Distribuidor",
    store: "Tienda",
    free_uppercase: "GRATIS",
    share_message: "🔥 Alerta de Oferta: ¡{{title}} ha bajado a {{price}} (Ahorras {{saved}}) en {{platform}}!\nConsíguelo aquí: {{url}}",
    save_amount: "{{amount}}% DTO",
    hot_deal: "Oferta Destacada",
    rating: "{{percent}}",
    released: "Termina: ",
    no_description: "¡Aprovecha esta oferta de valor excepcional antes de que expire el período de promoción o cambien los niveles de precios!",
    breakdown_title: "Ver Detalles",
    breakdown_body: "Ahorra un total de {{saved}} sobre el precio de lista minorista habitual de {{original}} (lo que refleja un sólido {{percent}}% de descuento sobre el valor).",
    summary: {
      prefix: "Analizamos las tiendas de juegos activas y descubrimos ",
      midActive: " descuentos masivos disponibles a fecha de ",
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
      description: "No podemos sincronizarnos con los servidores en este momento. Asegúrate de que tu dispositivo esté en línea e intentémoslo de nuevo.",
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
    legalSubtitle: "Por favor, revisa las condiciones de privacidad antes de acceder a nuestros canales de sincronización global de datos.",
    title: "Sigue regalos de videojuegos y ofertas de juegos premium.",
    title2: "Consigue Regalos y Ofertas",
    description: "Frapp se encarga tanto de regalos de juegos como de ofertas masivas de videojuegos. Agregamos las últimas recompensas 100% gratuitas y reclamables junto con profundos descuentos minoristas en todas las tiendas para que siempre juegues más por menos.",
    privacyHeader: "Marco Central de Privacidad y Datos",
    privacyBody: "Frapp es un agregador de datos de código abierto que unifica tus flujos de datos dispersos, fuentes de API y puntos de contacto digitales en un único panel cohesivo. Debido a que operamos completamente como una herramienta local-first, no mantenemos almacenamiento centralizado, no recolectamos estructuras de cuentas físicas ni rastreamos historiales de telemetría de los usuarios. Todo el proceso de agregación, procesamiento y visualización se ejecuta directamente en tu hardware, lo que significa que tus datos nunca se transmiten ni se registran en un nodo maestro externo o red administrativa centralizada. Tus perfiles de configuración localizados, archivos de caché históricos y preferencias interactivas permanecen de forma segura en tu dispositivo.",
    consentLabel: "Acepto los Términos de Servicio y la Declaración de Privacidad",
    btnStep1: "Continuar",
    btnStep2: "Comenzar",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;