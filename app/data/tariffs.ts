export const mrcs = [
  'Sherbrooke',
  'Memphrémagog',
  'Coaticook',
  'Le Haut-Saint-François',
  'Le Val-Saint-François',
  'Les Sources',
  'Le Granit',
  'La Haute-Yamaska',
  'Brome-Missisquoi'
] as const

export const tariffPrograms = {
  provincial: [
    {
      title: 'Programme d’aide d’urgence aux PME — Tarifs douaniers',
      tag: 'PAUPME',
      org: 'Gestion',
      points: [
        'Prêt maximal de 150 k$',
        'Jusqu’à 75 % des besoins de liquidités',
        'Taux d’intérêt 0 % pendant 12 mois, puis 3,86 % par année'
      ]
    },
    {
      title: 'FORCE — Fonds offensif pour le renforcement des capacités économiques',
      tag: 'Investissement Québec',
      org: 'Investissement Québec',
      contact: {
        name: 'Alexandre Lajoie, MBA, CPA',
        title: 'Directeur régional, Estrie',
        email: 'alexandre.lajoie@invest-quebec.com',
        phone: '819 300-6542'
      },
      points: [
        'Prêt jusqu’à 50 M$',
        'Sans intérêt la première année',
        'Moratoire de capital jusqu’à 24 mois',
        'Terme maximal de 7 ans'
      ]
    },
    {
      title: 'Services Québec',
      tag: 'Services Québec',
      org: 'Services Québec',
      contact: {
        email: 'dgsq05-6.entreprises@servicesquebec.gouv.qc.ca',
        phone: '1 800 567-0632, poste 88150'
      },
      points: [
        'Soutien à la gestion des ressources humaines',
        'Programme de formation de la main-d’œuvre',
        'Aide financière pouvant aller de 75 % à 100 % des frais admissibles pour la formation, la gestion des RH et la diversification de marchés'
      ]
    }
  ],
  federal: [
    {
      title: 'Initiative régionale de réponse tarifaire',
      tag: 'DEC',
      href: 'https://www.canada.ca/fr/developpement-economique-regions-quebec/financement-services/initiative-regionale-de-reponse-tarifaire.html',
      points: [
        'Chiffre d’affaires annuel de 1 M$ et plus',
        'Appui aux liquidités : contribution non remboursable jusqu’à 2 M$',
        'Projet pivot/transformation : jusqu’à 1 M$ non remboursable',
        'Aide non remboursable maximale combinée : 3 M$'
      ]
    },
    {
      title: 'Pivoter pour se propulser',
      tag: 'BDC',
      href: 'https://www.bdc.ca/fr/soutien-special/tarifs',
      contact: {
        name: 'Jean-François Soucy',
        title: 'Directeur principal, Estrie',
        email: 'jeanfrancois.soucy@bdc.ca'
      },
      points: [
        'Prêts de 250 000 $ à 5 M$',
        'Revenus annuels de 1 M$ et plus',
        'Volet 1 : préserver le flux de trésorerie',
        'Volet 2 : soutenir un repositionnement opérationnel',
        'Volet 3 : investir dans la productivité'
      ]
    },
    {
      title: 'Maintien à l’emploi et réorientation de la main-d’œuvre',
      tag: 'Service Canada / EDSC',
      contact: { phone: '1 800 622-6232' },
      points: [
        'Fusion Travail partagé + Subvention maintien à l’emploi',
        'Fonds additionnels pour formation et frais admin jusqu’à 1 000 $ / participant'
      ]
    }
  ],
  other: [
    {
      title: 'Programmes de soutien aux industries',
      text: 'Acier, aluminium, cuivre et secteur forestier.',
      href: 'https://www.bdc.ca/fr/soutien-special/tarifs'
    },
    {
      title: 'LIFT — Levier d’innovation et focus sur la technologie',
      text: 'IA, outils numériques, automatisation, robotique, infrastructure de données et équipement de pointe.',
      href: 'https://www.bdc.ca/fr/solutions/lift'
    },
    {
      title: 'Fonds de réponse stratégique',
      text: 'Projets de plus grande envergure liés à la diversification, l’adaptation et aux investissements stratégiques.',
      href: 'https://ised-isde.canada.ca/site/isde/fr/programmes-initiatives/fonds-reponse-strategique'
    }
  ]
}
