import { Request, Response, Router } from 'express'
import { authGuard } from '@middlewares/authGuard'
import partyRoutes from './party/party.routes'
import serviceRoutes from './service/services.routes'
import userRoutes from './users/users.routes'
import addressRoutes from './address/addresses.routes'

const router = Router() as Router

router.use('/users', userRoutes)
router.use('/services', authGuard, serviceRoutes)
router.use('/party', authGuard, partyRoutes)
router.use('/address', authGuard, addressRoutes)

router.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'API WORKING' })
})

export default router
