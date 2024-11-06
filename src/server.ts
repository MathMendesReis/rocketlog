import { app } from "./app"
import { env } from "./utils/_env"

const PORT = env.data?.PORT

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))