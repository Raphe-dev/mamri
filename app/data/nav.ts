import type { NavItem } from '~/types/content'

export const mainNav: NavItem[] = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Nos services',
    to: '/services',
    children: [
      { label: 'Réseaux professionnels', to: '/services/reseaux-professionnels' },
      { label: 'Formations', to: '/services/formations' },
      { label: 'Enquête salariale 2026', to: '/services/enquete-salariale' },
      { label: 'Recrutement', to: '/services/recrutement' }
    ]
  },
  {
    label: 'Projets',
    children: [
      { label: 'DEP en opération d’équipements de production', to: '/projets/dep-operateur' },
      { label: 'Lire, compter, cliquer', to: '/projets/lire-compter-cliquer' },
      { label: 'Travailleurs étrangers temporaires', to: '/projets/travailleurs-etrangers-temporaires' },
      { label: 'Tarifs douaniers', to: '/ressources/tarifs-douaniers' }
    ]
  },
  { label: 'Calendrier', to: '/calendrier' },
  {
    label: 'Membres',
    children: [
      { label: 'Devenir membre', to: '/membres/devenir-membre' },
      { label: 'Connaissez-vous nos membres ?', to: '/membres' }
    ]
  },
  {
    label: 'À propos',
    children: [
      { label: 'Bulletin de l’industrie', to: '/bulletin' },
      { label: 'Qui nous sommes', to: '/a-propos' },
      { label: 'Contact', to: '/contact' }
    ]
  }
]

export const footerNav = {
  services: [
    { label: 'Tous les services', to: '/services' },
    { label: 'Réseaux professionnels', to: '/services/reseaux-professionnels' },
    { label: 'Formations', to: '/services/formations' },
    { label: 'Enquête salariale', to: '/services/enquete-salariale' },
    { label: 'Recrutement', to: '/services/recrutement' }
  ],
  projets: [
    { label: 'DEP opérateurs', to: '/projets/dep-operateur' },
    { label: 'Lire, compter, cliquer', to: '/projets/lire-compter-cliquer' },
    { label: 'Mobilisation TET', to: '/projets/travailleurs-etrangers-temporaires' },
    { label: 'Tarifs douaniers', to: '/ressources/tarifs-douaniers' },
    { label: 'Calendrier', to: '/calendrier' }
  ],
  aPropos: [
    { label: 'Qui nous sommes', to: '/a-propos' },
    { label: 'Devenir membre', to: '/membres/devenir-membre' },
    { label: 'Nos membres', to: '/membres' },
    { label: 'Bulletin', to: '/bulletin' },
    { label: 'Contact', to: '/contact' }
  ]
}
