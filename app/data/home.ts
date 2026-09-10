export const home = {
  announcement: {
    label: 'Enquête salariale 2026',
    text: 'Participez avant le 30 septembre et obtenez jusqu’à 45 % de rabais en tant que membre.',
    to: '/services/enquete-salariale'
  },
  hero: {
    kicker: 'Estrie · Depuis 1981',
    title: 'Le partenaire de choix des entreprises manufacturières de l’Estrie',
    lead: 'Nous soutenons les entreprises manufacturières de l’Estrie dans la concrétisation de leurs projets stratégiques et générateurs de croissance. Accompagnement personnalisé, alliances durables, expertise du marché industriel estrien.',
    image: '/images/photos/dejeuner-2.jpg',
    imageAlt: 'Professionnels lors d’un événement industriel de la Maison régionale de l’industrie',
    ctas: [
      { label: 'Découvrir nos services', to: '/services', variant: 'primary' as const },
      { label: 'Devenir membre', to: '/membres/devenir-membre', variant: 'secondary' as const }
    ]
  },
  intro: [
    'Nous offrons aux industriels un accompagnement personnalisé à leurs besoins spécifiques.',
    'Nous contribuons à la création d’alliances stratégiques durables et nous soutenons nos membres dans la réalisation de leurs objectifs grâce à notre expertise du marché industriel estrien.'
  ],
  services: [
    {
      title: 'Formations',
      text: 'Participez à des formations personnalisées à vos besoins.',
      to: '/services/formations',
      image: '/images/photos/formations.jpg'
    },
    {
      title: 'Réseaux professionnels',
      text: 'Profitez des réseaux pour échanger avec des professionnels de votre industrie.',
      to: '/services/reseaux-professionnels',
      image: '/images/photos/reseaux.jpg'
    },
    {
      title: 'Enquête salariale',
      text: 'Accédez à l’enquête de rémunération globale de la région de l’Estrie.',
      to: '/services/enquete-salariale',
      image: '/images/photos/enquete.jpg'
    },
    {
      title: 'Recrutement',
      text: 'Bénéficiez d’un tarif préférentiel sur des services d’acquisition de talents.',
      to: '/services/recrutement',
      image: '/images/photos/recrutement.jpg'
    }
  ],
  stats: [
    { value: 45, suffix: ' ans', label: 'au service de l’industrie estrienne' },
    { value: 60, suffix: '+', label: 'entreprises membres' },
    { value: 3, suffix: '', label: 'réseaux professionnels exclusifs' },
    { value: 45, suffix: ' %', label: 'de rabais membre sur l’enquête salariale' }
  ],
  years: {
    title: '45 ans au service des manufacturiers de l’Estrie',
    text: 'La confiance que nos membres nous accordent repose sur notre engagement à leur offrir des services de qualité, ainsi que sur notre volonté constante d’innover et de nous adapter aux nouvelles tendances et exigences de l’industrie manufacturière.',
    cta: { label: 'Découvrez tous les avantages d’être membre', to: '/membres/devenir-membre' },
    anniversary: {
      label: '14 octobre 2026 · Siboire Jacques-Cartier',
      title: '45e anniversaire et assemblée générale annuelle',
      href: 'https://mri.zohobackstage.com/45eanniversaireAssemblegnraleannuelle'
    }
  },
  networkCta: {
    title: 'Vous souhaitez agrandir votre réseau ? Laissez-nous vous aider.',
    cta: { label: 'Contactez-nous', to: '/contact' }
  }
}
