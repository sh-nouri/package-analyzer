import { Router } from 'express'

import packageSearch from './routes/package/search'
import packageCrawl from './routes/package/crawl'
import packageTree from './routes/package/tree'
import packageAnalyze from './routes/package/analyze'
import packageUpload from './routes/package/upload'

const router = Router()

router.get('/package/search', packageSearch)
router.get('/package/crawl', packageCrawl)
router.get('/package/tree', packageTree)
router.get('/package/analyze', packageAnalyze)
router.post('/package/upload', packageUpload)

export default router
