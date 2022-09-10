const blog_container = document.querySelector('.blog_container')




class Index {
    constructor() {
        this.getdata = JSON.parse(localStorage.getItem('blog'))
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUSer'))
        if (localStorage.getItem('blog')) {
            this.indexBlog = JSON.parse(localStorage.getItem('blog'))
        } else {
            this.indexBlog = []
        }

        this.users = JSON.parse(localStorage.getItem('users'))


    }


    getUserName(id) {
        return this.users.find(user => user.id == id).name;
    }

    checkLike(like) {
        console.log(like);
        if (like.find(data => data == this.currentUser.id)) {
            return 'var(--red)'
        } else {
            return 'black'
        }

    }


    showIndex() {
        blog_container.innerHTML = ''
        this.indexBlog.reverse().forEach(blog => {
            blog_container.innerHTML += `
            
            <div class="blog_cards">
            <div class="row">
                <h4 class="blog_title"><a href="user-data.html?id=${blog.user_id}">${this.getUserName(blog.user_id)}</a></h4>
                <p class="blog_date">${blog.date}</p>
            </div>

            <div class="icon_container" >
                    <i onclick="likeBlogBtn(${blog.id})" style="color: ${this.checkLike(blog.like)};" class="fas fa-heart"></i>
                    <span>${blog.like.length}</span>
                </div>
            <p class="blog_paragraph">${blog.text}</p>

            ${blog.text.length > 200 ?
                    `<button onclick="readMoreBtn(event)" class="read_more_btn">Read more</button>` :
                    ``
                }
           

        </div>`
        });





    }
    likeBlog(id) {
        const findBlog = this.indexBlog.find(data => data.id == id);
        const findBlogIndex = this.indexBlog.findIndex(data => data.id == id);

        const checkLike = findBlog.like.findIndex(data => data == id);
        if (checkLike !== -1) {
            findBlog.like.splice(checkLike, 1)
        } else {
            findBlog.like.push(id)
        }
        this.indexBlog[findBlogIndex] = findBlog;
        localStorage.setItem('blog', JSON.stringify(this.indexBlog))
        this.showIndex()

    }



}


function likeBlogBtn(id) {
    const bl = new Index();
    bl.likeBlog(id)
}
window.addEventListener('load', () => {
    const homePage = new Index()
    homePage.showIndex()

})


function readMoreBtn(e) {
    if (e.target.parentElement.children[2].style.height == '' || e.target.parentElement.children[2].style.height == '63px') {
        e.target.parentElement.children[2].style.height = 'auto'
        e.target.innerHTML = 'Show Less'
    }
    else {
        e.target.parentElement.children[2].style.height = '63px'
        e.target.innerHTML = 'read more'
    }
}

