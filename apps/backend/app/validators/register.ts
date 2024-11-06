import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(20),
    email: vine.string().email().trim().normalizeEmail(),
    password: vine
      .string()
      .minLength(8)
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-%*?&])[A-Za-z\d@$!-%*?&]{8,}$/)
      .confirmed({
        confirmationField: 'confirmPassword',
      }),
  })
)
