import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class TestsController {
  async handle({ request, response }: HttpContext) {
    logger.info(request)
    return response.json({
      hello: 'world',
    })
  }
}
