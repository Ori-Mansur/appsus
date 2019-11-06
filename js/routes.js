'use strict'


import bookApp from './apps/miss-book/pages/book-app.cmp.js'
import bookDetails from './apps/miss-book/pages/book-details.cmp.js'
import emailApp from './apps/mister-email/pages/email-app.cmp.js'
import emailList from './apps/mister-email/cmps/emails-list.cmp.js'
import emailDetails from  './apps/mister-email/pages/email-details.cmp.js'


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
        component: emailApp,
        children: [
            {
                path: '/',
                component: emailList,
            },
            {
                path: ':id',
                component: emailDetails,
            }
        ]
    },
    {
        path: '/notes',
        component: bookApp
    }


]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;