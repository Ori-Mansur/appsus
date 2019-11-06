'use strict'


import bookApp from './apps/miss-book/pages/book-app.cmp.js'

import bookDetails from './apps/miss-book/pages/book-details.cmp.js'

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
        component: bookApp
    }


]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;