'use strict'


import bookApp from './apps/miss-book/pages/book-app.cmp.js'
import bookDetails from './apps/miss-book/pages/book-details.cmp.js'

import keepApp from './apps/miss-keep/pages/keep-app.cmp.js'

const myRoutes = [
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/email',
        component: bookApp
    },
    {
        path: '/notes',
        component: keepApp
    }


]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;