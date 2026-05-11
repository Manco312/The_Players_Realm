import { videogames } from '~/server/data/videogames'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '')

  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid game ID' })
  }

  const game = videogames.find((g) => g.id === id)

  if (!game) {
    throw createError({ statusCode: 404, statusMessage: 'Videogame not found' })
  }

  return game
})
