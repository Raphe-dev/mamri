import { defineQuery } from 'groq'

export const SITE_CONTENT_QUERY = defineQuery(/* groq */ `{
  "settings": *[_id == "siteSettings"][0]{
    announcement,
    name, shortName, tagline, description, founded,
    address, geo, phone, email, social, emploisCompetences,
    zohoEnquete, zohoBulletin
  },
  "events": *[_type == "event" && hidden != true && defined(slug.current)]
    | order(year asc, month asc, sortIndex asc) {
      "slug": slug.current,
      title, type, startLabel, timeLabel, location,
      memberPrice, nonMemberPrice, priceNote, tags, excerpt,
      href, month, year
    },
  "memberLogos": *[_type == "memberLogo"] | order(sortIndex asc) {
    name, href, logo, importKey
  },
  "memberSpotlights": *[_type == "memberSpotlight"] | order(sortIndex asc) {
    name, image, imageAlt, body, href, credit, featured, importKey
  },
  "team": *[_type == "teamMember"] | order(sortIndex asc) {
    name, title, image, linkedin, importKey
  },
  "homePage": *[_id == "homePage"][0],
  "aboutPage": *[_id == "aboutPage"][0],
  "membershipPage": *[_id == "membershipPage"][0],
  "servicesPage": *[_id == "servicesPage"][0],
  "reseauxPage": *[_id == "reseauxPage"][0],
  "formationsPage": *[_id == "formationsPage"][0],
  "enquetePage": *[_id == "enquetePage"][0],
  "recrutementPage": *[_id == "recrutementPage"][0],
  "depPage": *[_id == "depPage"][0],
  "lirePage": *[_id == "lirePage"][0],
  "tetPage": *[_id == "tetPage"][0]
}`)
