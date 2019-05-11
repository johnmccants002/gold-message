import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from './reducers'

const logger = createLogger()
const releaseMiddleware = [thunk]
const devMiddleware = [...releaseMiddleware, logger]
const selectedMiddleware = __DEV__ ? devMiddleware : releaseMiddleware
const middleware = applyMiddleware(...selectedMiddleware)

export default createStore(reducers, middleware)