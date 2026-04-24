import { type SchemaTypeDefinition } from 'sanity'

import { perfumeType } from './perfume'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [perfumeType]
}
