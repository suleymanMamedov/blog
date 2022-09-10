const textarea = document.querySelector('#textarea')
const shareBlogBtn = document.querySelector('#shareBlogBtn')
const blog_container = document.querySelector('.blog_container')

const logOut = document.querySelector('#logOut')

class Blog {
    constructor(textarea) {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUSer'))
        if (localStorage.getItem('blog')) {
            this.blog = JSON.parse(localStorage.getItem('blog'))

        } else {
            this.blog = [];
        }
        this.date = new Date();

        this.textarea = textarea;
    }


    checkLike(like) {
        if (like.find(data => data == this.currentUser.id)) {
            return 'var(--red)'
        }
        else {
            return 'black'
        }
    }

    showBlogs(){
        blog_container.innerHTML = ''
        this.myBlogs().forEach(blog => {
            blog_container.innerHTML += `<div class="blog_cards">
            <div class="row">
                <p class="blog_date">${blog.date}</p>
            </div>
            
            <div class="icon_container">
                <i style = "color:${this.checkLike(blog.like)}" onclick="likeBlogBtn(${blog.id})" class="fas fa-heart"></i>
                <span>${blog.like.length}</span>
            </div>
            <p class="blog_paragraph">
               ${blog.text}
            </p>${blog.text.length > 200 ?
                    `<button onclick="readMoreBtn(event)" class="read_more_btn" >Read more</button>` :
                    ``
                }
            
            
            </div> `
        });
    }

    myBlogs() {
        return this.blog.filter(blog => blog.user_id == this.currentUser.id).reverse()
    }


    likeBlog(id) {
        console.log(id)
        const findBlog = this.blog.find(data => data.id == id);
        const findBlogIndex = this.blog.findIndex(data => data.id == id);

        const checkLike = findBlog.like.findIndex(data => data == this.currentUser.id)
        if (checkLike !== -1) {
            findBlog.like.splice(checkLike, 1)
        }
        else {
            findBlog.like.push(this.currentUser.id)
        }
        this.blog[findBlogIndex] = findBlog
        localStorage.setItem('blog', JSON.stringify(this.blog))
        this.showBlogs()
    }




    shareBlog() {
        const newBlog = {
            id: this.blog.length + 1,
            user_id: this.currentUser.id,
            text: this.textarea,
            like: [],
            image: '',
            date: `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`
        }

        this.blog.push(newBlog);
        localStorage.setItem('blog', JSON.stringify(this.blog))
        this.showBlogs()
    }
}



shareBlogBtn.addEventListener('click', () => {
    if (textarea.value !== '') {
        const b1 = new Blog(textarea.value)
        b1.shareBlog()
        textarea.value = ''
    }
})

window.addEventListener('load', () => {
    const b1 = new Blog('');
    b1.showBlogs()
})

function likeBlogBtn(id) {
    const b1 = new Blog('')
    b1.likeBlog(id)
    console.log(id)
}


function readMoreBtn(e) {
    if (e.target.parentElement.children[2].style.height == ''|| e.target.parentElement.children[2].style.height == '63px') {
        e.target.parentElement.children[2].style.height = 'auto'
        e.target.innerHTML = 'Show Less'
    }
    else{
        e.target.parentElement.children[2].style.height = '63px'
        e.target.innerHTML = 'read more'
    }
}



const currentUser = JSON.parse(localStorage.getItem('loggedInUSer'))

userName.innerHTML = currentUser.name

profileIconHome.addEventListener('click', () => {
    window.location.pathname = 'index.html'
})
profileIconBlog.addEventListener('click', (e) => {
    window.location.pathname = 'blog.html'
    console.log(profileIconBlog);
})
profileIconUser.addEventListener('click', () => {
    window.location.pathname = 'profile.html'
})

logOut.addEventListener('click', () => {
    window.location.pathname = 'login.html'
})