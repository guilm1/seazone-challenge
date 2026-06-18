export type Lang = 'pt' | 'en' | 'es'

const dict: Record<Lang, Record<string, string>> = {
  pt: {
    // Guide
    'guide.generating': 'Gerando seu guia personalizado...',
    'guide.generatingNote': 'Isso pode levar alguns segundos',
    'guide.error': 'Erro ao carregar o guia',
    'guide.retry': 'Tentar novamente',
    'guide.welcome': 'Bem-vindo!',
    'guide.restaurants': 'Restaurantes Recomendados',
    'guide.restaurantsSubtitle': 'Os melhores lugares para comer por perto',
    'guide.attractions': 'Atrações Turísticas',
    'guide.attractionsSubtitle': 'O melhor da região para explorar',
    'guide.essentials': 'Serviços Essenciais',
    'guide.essentialsSubtitle': 'Farmácias, hospitais e mercados próximos',
    'guide.seasonalTip': 'Dica da Temporada',

    // Chat
    'chat.title': 'Assistente Virtual',
    'chat.online': 'Online',
    'chat.close': 'Fechar chat',
    'chat.greeting': 'Olá! Sou o assistente virtual',
    'chat.greetingSubtitle': 'Posso responder suas dúvidas sobre a estadia',
    'chat.frequentQuestions': 'Perguntas frequentes:',
    'chat.q1': 'Qual a senha do WiFi?',
    'chat.q2': 'Posso trazer meu cachorro?',
    'chat.q3': 'A que horas posso fazer check-in?',
    'chat.q4': 'Que restaurantes ficam perto?',
    'chat.backToFaq': 'Ver perguntas frequentes',
    'chat.placeholder': 'Digite sua dúvida...',
    'chat.send': 'Enviar mensagem',
    'chat.mobileLabel': 'Assistente Virtual — Tire suas dúvidas',
    'chat.openLabel': 'Abrir assistente virtual',
    'chat.error': 'Desculpe, ocorreu um erro. Tente novamente.',

    // Access
    'access.title': 'Acesso e Informações',
    'access.wifi': 'WiFi',
    'access.network': 'Rede',
    'access.password': 'Senha',
    'access.showPassword': 'Ver senha do WiFi',
    'access.wifiNote': 'Caso o assistente virtual solicite, informe seu número de reserva para confirmar.',
    'access.type': 'Tipo de Acesso',
    'access.code': 'Código de acesso',
    'access.parking': 'Estacionamento',
    'access.spot': 'Vaga',
    'access.smartLock': 'Fechadura Inteligente',
    'access.keybox': 'Cofre de Chaves',
    'access.key': 'Chave Física',
    'access.other': 'Outro',

    // Rules
    'rules.title': 'Regras da Estadia',
    'rules.pets': 'Animais de estimação',
    'rules.smoking': 'Fumar',
    'rules.children': 'Adequado para crianças',
    'rules.babies': 'Adequado para bebês',
    'rules.events': 'Eventos',
    'rules.allowed': 'Permitido',
    'rules.notAllowed': 'Não permitido',
    'rules.yes': 'Sim',
    'rules.notRecommended': 'Não recomendado',

    // Amenities
    'amenities.title': 'Comodidades',
    'amenities.subtitle': 'O que está disponível no imóvel',
    'amenity.wifi': 'WiFi',
    'amenity.tv': 'TV',
    'amenity.air_conditioning': 'Ar-Condicionado',
    'amenity.kitchen': 'Cozinha',
    'amenity.washing_machine': 'Máquina de Lavar',
    'amenity.elevator': 'Elevador',
    'amenity.balcony': 'Varanda',
    'amenity.bbq_grill': 'Churrasqueira',
    'amenity.dishwasher': 'Lava-Louças',

    // Contact
    'contact.title': 'Contato e Localização',
    'contact.viewMap': 'Ver no mapa',

    // Property header
    'property.bedroom': 'quarto',
    'property.bedrooms': 'quartos',
    'property.bathroom': 'banheiro',
    'property.bathrooms': 'banheiros',
    'property.guest': 'hóspede',
    'property.guests': 'hóspedes',
    'property.host': 'Anfitrião',

    // Not found
    'notFound.title': 'Imóvel não encontrado',
    'notFound.desc': 'O código do imóvel informado não existe. Verifique o link e tente novamente.',
  },
  en: {
    // Guide
    'guide.generating': 'Generating your personalized guide...',
    'guide.generatingNote': 'This may take a few seconds',
    'guide.error': 'Error loading guide',
    'guide.retry': 'Try again',
    'guide.welcome': 'Welcome!',
    'guide.restaurants': 'Recommended Restaurants',
    'guide.restaurantsSubtitle': 'The best places to eat nearby',
    'guide.attractions': 'Tourist Attractions',
    'guide.attractionsSubtitle': 'The best of the area to explore',
    'guide.essentials': 'Essential Services',
    'guide.essentialsSubtitle': 'Pharmacies, hospitals and supermarkets nearby',
    'guide.seasonalTip': 'Seasonal Tip',

    // Chat
    'chat.title': 'Virtual Assistant',
    'chat.online': 'Online',
    'chat.close': 'Close chat',
    'chat.greeting': 'Hello! I am the virtual assistant',
    'chat.greetingSubtitle': 'I can answer your questions about your stay',
    'chat.frequentQuestions': 'Frequently asked:',
    'chat.q1': 'What is the WiFi password?',
    'chat.q2': 'Can I bring my dog?',
    'chat.q3': 'What time can I check in?',
    'chat.q4': 'What restaurants are nearby?',
    'chat.backToFaq': 'See frequent questions',
    'chat.placeholder': 'Type your question...',
    'chat.send': 'Send message',
    'chat.mobileLabel': 'Virtual Assistant — Get help',
    'chat.openLabel': 'Open virtual assistant',
    'chat.error': 'Sorry, an error occurred. Please try again.',

    // Access
    'access.title': 'Access & Information',
    'access.wifi': 'WiFi',
    'access.network': 'Network',
    'access.password': 'Password',
    'access.showPassword': 'Show WiFi password',
    'access.wifiNote': 'If the virtual assistant asks, provide your reservation number to confirm.',
    'access.type': 'Access Type',
    'access.code': 'Access code',
    'access.parking': 'Parking',
    'access.spot': 'Spot',
    'access.smartLock': 'Smart Lock',
    'access.keybox': 'Key Box',
    'access.key': 'Physical Key',
    'access.other': 'Other',

    // Rules
    'rules.title': 'House Rules',
    'rules.pets': 'Pets',
    'rules.smoking': 'Smoking',
    'rules.children': 'Suitable for children',
    'rules.babies': 'Suitable for babies',
    'rules.events': 'Events',
    'rules.allowed': 'Allowed',
    'rules.notAllowed': 'Not allowed',
    'rules.yes': 'Yes',
    'rules.notRecommended': 'Not recommended',

    // Amenities
    'amenities.title': 'Amenities',
    'amenities.subtitle': 'What is available at the property',
    'amenity.wifi': 'WiFi',
    'amenity.tv': 'TV',
    'amenity.air_conditioning': 'Air Conditioning',
    'amenity.kitchen': 'Kitchen',
    'amenity.washing_machine': 'Washing Machine',
    'amenity.elevator': 'Elevator',
    'amenity.balcony': 'Balcony',
    'amenity.bbq_grill': 'BBQ Grill',
    'amenity.dishwasher': 'Dishwasher',

    // Contact
    'contact.title': 'Contact & Location',
    'contact.viewMap': 'View on map',

    // Property header
    'property.bedroom': 'bedroom',
    'property.bedrooms': 'bedrooms',
    'property.bathroom': 'bathroom',
    'property.bathrooms': 'bathrooms',
    'property.guest': 'guest',
    'property.guests': 'guests',
    'property.host': 'Host',

    // Not found
    'notFound.title': 'Property not found',
    'notFound.desc': 'The property code you entered does not exist. Please check the link and try again.',
  },
  es: {
    // Guide
    'guide.generating': 'Generando tu guía personalizada...',
    'guide.generatingNote': 'Esto puede tardar unos segundos',
    'guide.error': 'Error al cargar la guía',
    'guide.retry': 'Intentar de nuevo',
    'guide.welcome': '¡Bienvenido!',
    'guide.restaurants': 'Restaurantes Recomendados',
    'guide.restaurantsSubtitle': 'Los mejores lugares para comer cerca',
    'guide.attractions': 'Atracciones Turísticas',
    'guide.attractionsSubtitle': 'Lo mejor de la zona para explorar',
    'guide.essentials': 'Servicios Esenciales',
    'guide.essentialsSubtitle': 'Farmacias, hospitales y supermercados cercanos',
    'guide.seasonalTip': 'Consejo de Temporada',

    // Chat
    'chat.title': 'Asistente Virtual',
    'chat.online': 'En línea',
    'chat.close': 'Cerrar chat',
    'chat.greeting': '¡Hola! Soy el asistente virtual',
    'chat.greetingSubtitle': 'Puedo responder tus dudas sobre la estadía',
    'chat.frequentQuestions': 'Preguntas frecuentes:',
    'chat.q1': '¿Cuál es la contraseña del WiFi?',
    'chat.q2': '¿Puedo traer a mi perro?',
    'chat.q3': '¿A qué hora puedo hacer check-in?',
    'chat.q4': '¿Qué restaurantes hay cerca?',
    'chat.backToFaq': 'Ver preguntas frecuentes',
    'chat.placeholder': 'Escribe tu pregunta...',
    'chat.send': 'Enviar mensaje',
    'chat.mobileLabel': 'Asistente Virtual — Resuelve tus dudas',
    'chat.openLabel': 'Abrir asistente virtual',
    'chat.error': 'Lo sentimos, ocurrió un error. Por favor intenta de nuevo.',

    // Access
    'access.title': 'Acceso e Información',
    'access.wifi': 'WiFi',
    'access.network': 'Red',
    'access.password': 'Contraseña',
    'access.showPassword': 'Ver contraseña WiFi',
    'access.wifiNote': 'Si el asistente virtual lo solicita, proporciona tu número de reserva para confirmar.',
    'access.type': 'Tipo de Acceso',
    'access.code': 'Código de acceso',
    'access.parking': 'Estacionamiento',
    'access.spot': 'Lugar',
    'access.smartLock': 'Cerradura Inteligente',
    'access.keybox': 'Caja de Llaves',
    'access.key': 'Llave Física',
    'access.other': 'Otro',

    // Rules
    'rules.title': 'Reglas de Estadía',
    'rules.pets': 'Mascotas',
    'rules.smoking': 'Fumar',
    'rules.children': 'Adecuado para niños',
    'rules.babies': 'Adecuado para bebés',
    'rules.events': 'Eventos',
    'rules.allowed': 'Permitido',
    'rules.notAllowed': 'No permitido',
    'rules.yes': 'Sí',
    'rules.notRecommended': 'No recomendado',

    // Amenities
    'amenities.title': 'Comodidades',
    'amenities.subtitle': 'Lo que está disponible en la propiedad',
    'amenity.wifi': 'WiFi',
    'amenity.tv': 'TV',
    'amenity.air_conditioning': 'Aire Acondicionado',
    'amenity.kitchen': 'Cocina',
    'amenity.washing_machine': 'Lavadora',
    'amenity.elevator': 'Ascensor',
    'amenity.balcony': 'Balcón',
    'amenity.bbq_grill': 'Parrilla',
    'amenity.dishwasher': 'Lavavajillas',

    // Contact
    'contact.title': 'Contacto y Ubicación',
    'contact.viewMap': 'Ver en el mapa',

    // Property header
    'property.bedroom': 'habitación',
    'property.bedrooms': 'habitaciones',
    'property.bathroom': 'baño',
    'property.bathrooms': 'baños',
    'property.guest': 'huésped',
    'property.guests': 'huéspedes',
    'property.host': 'Anfitrión',

    // Not found
    'notFound.title': 'Propiedad no encontrada',
    'notFound.desc': 'El código de la propiedad ingresado no existe. Verifica el enlace e intenta de nuevo.',
  },
}

export function getTranslation(lang: Lang, key: string): string {
  return dict[lang]?.[key] ?? dict.pt[key] ?? key
}
