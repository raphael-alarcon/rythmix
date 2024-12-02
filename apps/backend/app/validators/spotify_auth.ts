import vine from '@vinejs/vine'

export const spotifyRedirectValidator = vine.compile(
  vine.object({
    redirect_uri: vine.string().trim().maxLength(255),
    state: vine.string(),
  })
)
