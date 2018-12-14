
import utils from './utils-service.js'
var books = [];
var BOOKS_KEY = 'books'

var feedbacks = []



function init(){

    books = utils.loadFromStorage(BOOKS_KEY)

    if (!books || books.length === 0) {

        books = JSON.parse(readJSON('../../../books.json'));
    }

    saveToStorage(BOOKS_KEY,books)
}

function readJSON(file) {

    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200){
        return request.responseText;
    }
        

};

function addBook(book) {
    try{
        books.push(book)
        saveToStorage(BOOKS_KEY,books)
          return Promise.resolve()
    } catch(error){

    }
    

}


function emptyBook() {
	return {
		title: '',
		subtitle: '',
		authors: [],
		publishedDate: '',
		description: '',
		pageCount: 0,
		categories: [],
		thumbnail: '',
		language: '',
		listPrice: {
			amount: 0,
			currencyCode: '',
			isOnSale: false
		},
		reviews: []
	};
}






function query() {

    return Promise.resolve(books);
}

function getById(id) {
    var currBook = books.find(book => book.id === id)
    return Promise.resolve(currBook)
}

function searchBook(searchInput) {

    var result = books.filter(book => {
        return (book.title.includes(searchInput.byName) && book.listPrice.amount >= searchInput.fromPrice &&
            book.listPrice.amount <= searchInput.toPrice)

    })
    return Promise.resolve(result)
}


function addFeedback(bookId, feedback) {
    var key = bookId
    return getFeedbacks(bookId)
        .then(list => {
            feedbacks = list
            if (!feedbacks) {
                feedbacks = []
            }
            feedbacks.push(feedback)
            saveToStorage(key, feedbacks)

        })


}

function getFeedbacks(bookId) {
    var feedbacksList = loadFromStorage(bookId)
    return Promise.resolve(feedbacksList)
}

function deleteFeedback(bookId, idx) {
    var feedbacks = utils.loadFromStorage(bookId)
    feedbacks.splice(idx, 1)

    if (feedbacks.length === 0) {
        localStorage.removeItem(bookId);
        feedbacks = null
    } else {
        utils.saveToStorage(bookId, feedbacks)
    }
    return Promise.resolve(feedbacks)

}


function askBook(searchInput) {

    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchInput}`)
  
}

function getBooksData(serachInput) {
   return  askBook(serachInput)
}

function saveToStorage(key, value) {
    utils.saveToStorage(key, value)
}

function loadFromStorage(key) {
    return utils.loadFromStorage(key)
}



export default {
    query,
    searchBook,
    getById,
    addFeedback,
    getFeedbacks,
    deleteFeedback,
    getBooksData,
    emptyBook,
    init,
    addBook
}