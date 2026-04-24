import { groq } from 'next-sanity'

export const allPerfumesQuery = groq`*[_type == "perfume"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  image,
  bottlePrice,
  decants
}`

export const perfumeBySlugQuery = groq`*[_type == "perfume" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  image,
  bottlePrice,
  decants
}`

export const allPerfumeSlugsQuery = groq`*[_type == "perfume"] { "slug": slug.current }`
