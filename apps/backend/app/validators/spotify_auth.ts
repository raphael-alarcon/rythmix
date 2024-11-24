import vine from '@vinejs/vine'

export const spotifyRedirectValidator = vine.compile(
  vine.object({
    appRedirectUri: vine.string().trim().maxLength(255),
  })
)
