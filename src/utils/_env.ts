import z, { coerce } from "zod";

const envSchema = z.object({
  PORT:z.coerce.number().default(300),
  DATABASE_URL:z.string()
})

const env = envSchema.safeParse(process.env)

export {env}