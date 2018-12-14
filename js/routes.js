
import HomePage from './cmps/pages/home-page-cmp.js'
import aboutPage from './cmps/pages/about-page-cmp.js'
import bookApp from './cmps/book-app-cmp.js'
import bookDetails from './cmps/book-details-cmp.js'
import reviewAdd from './cmps/review/review-add-cmp.js'



 
export default [
            {path: '/', component: HomePage},
            {path: '/about', component: aboutPage},
            {path: '/book', component: bookApp},
            {path: '/book/:id', component: bookDetails},
            {path: '/bookReview/:id', component: reviewAdd},
         
        ]
