import { defineArrayMember, defineField, defineType } from 'sanity'

export const perfumeType = defineType({
  name: 'perfume',
  title: 'Perfume',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'bottlePrice',
      title: 'Bottle Price (Bs.)',
      type: 'number',
      validation: Rule => Rule.required().positive()
    }),
    defineField({
      name: 'decants',
      title: 'Decants',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'decant',
          title: 'Decant',
          fields: [
            defineField({
              name: 'capacity',
              title: 'Capacity (ml)',
              type: 'number',
              validation: Rule => Rule.required().positive()
            }),
            defineField({
              name: 'price',
              title: 'Price (Bs.)',
              type: 'number',
              validation: Rule => Rule.required().positive()
            })
          ],
          preview: {
            select: { capacity: 'capacity', price: 'price' },
            prepare({ capacity, price }) {
              return { title: `${capacity}ml — Bs. ${price}` }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: { title: 'name', media: 'image', price: 'bottlePrice' },
    prepare({ title, media, price }) {
      return { title, subtitle: price ? `Bs. ${price}` : undefined, media }
    }
  }
})
