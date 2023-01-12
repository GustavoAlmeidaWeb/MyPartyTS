import { Request, Response, Router } from 'express'
import serviceRoutes from './service/services.routes'
import userRoutes from './users/users.routes'

const router: Router = Router()

router.use('/users', userRoutes)
router.use('/services', serviceRoutes)

router.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'API WORKING' })
})

export default router
