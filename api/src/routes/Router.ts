import { Request, Response, Router } from 'express'
import partyRoutes from './party/party.routes'
import serviceRoutes from './service/services.routes'
import userRoutes from './users/users.routes'

const router = Router() as Router

router.use('/users', userRoutes)
router.use('/services', serviceRoutes)
router.use('/party', partyRoutes)

router.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'API WORKING' })
})

export default router
