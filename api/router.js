import { Router } from 'express'

import packageSearch from './routes/package/search'
import packageCrawl from './routes/package/crawl'
import packageTree from './routes/package/tree'

const router = Router()

router.get('/package/search', packageSearch)
router.get('/package/crawl', packageCrawl)
router.get('/package/tree', packageTree)

export default router