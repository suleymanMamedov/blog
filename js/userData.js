const id = window.location.search.split('=')[1];

const userImage = document.querySelector('#userImage');
const userName = document.querySelector('#userName');
const userCountry = document.querySelector('#userCountry');
const userCity = document.querySelector('#userCity');
const userDate = document.querySelector('#userDate');
const userEmail = document.querySelector('#userEmail');


const profileIconHome = document.querySelector('#profileIconHome')
const profileIconBlog = document.querySelector('#userNameProfile')
const profileIconUser = document.querySelector('#profileIconUser')
const userNameProfile = document.querySelector('#userNameProfile')


const blog_container = document.querySelector('.blog_container');

class UserData{
    constructor(){
        this.userData = JSON.parse(localStorage.getItem('users')).find(user=> user.id == id);
        if(localStorage.getItem('blog')){
            this.blog = JSON.parse(localStorage.getItem('blog'))
        }else{
            this.blog = [];
        }
    }
    showData(){
        userImage.src = this.userData.image;
        userName.innerHTML = this.userData.name;
        userCountry.innerHTML = this.userData.country;
        userCity.innerHTML = this.userData.city;
        userDate.innerHTML = this.userData.date;
        userEmail.innerHTML = this.userData.email;
        userNameProfile.innerHTML = this.userData.name
    }
    userBlogs(){
        return this.blog.filter(blog=> blog.user_id == id)
    }
    checkLike(like){
        if(like.find(data=> data == id)){
            return 'var(--red)'
        }else{
            return 'black'
        }
       
    }

    showBlogs(){
        console.log(this.userBlogs())
        blog_container.innerHTML = '';
      
        this.userBlogs().forEach(blog=>{
            blog_container.innerHTML += `
            <div class="blog_cards">
                <div class="row">
                    <p class="blog_date">${blog.date}</p>
                </div>
               
                <div class="icon_container" >
               
                    <i onclick="likeBlogBtn(${blog.id})" style="color: ${this.checkLike(blog.like)};" class="fas fa-heart"></i>
                    <span>${blog.like.length}</span>
                </div>
                <p class="blog_paragraph">
                   ${blog.text}
                </p>
                ${
                    blog.text.length >200?
                    `<button onclick="readMoreBtn(event)" class="read_more_btn">Read more</button>`:
                    ``
                }
            </div>
            `
        })
    }

    likeBlog(id){
        const findBlog = this.blog.find(data=> data.id == id);
        const findBlogIndex = this.blog.findIndex(data=> data.id == id);

        const checkLike = findBlog.like.findIndex(data=> data == id);
        if(checkLike !== -1){
            findBlog.like.splice(checkLike, 1)
        }else{
            findBlog.like.push(id)
        }
        this.blog[findBlogIndex] = findBlog;
        localStorage.setItem('blog', JSON.stringify(this.blog))
        this.showBlogs()

    }

}

window.addEventListener('load', ()=>{
    const data = new UserData();
    data.showData();
    data.showBlogs();
})

function likeBlogBtn(id){
    const bl = new UserData('');
    bl.likeBlog(id)
}

function readMoreBtn(e){
    if(e.target.parentElement.children[2].style.height == '' || e.target.parentElement.children[2].style.height == '63px'){
        e.target.parentElement.children[2].style.height = 'auto';
        e.target.innerHTML = 'Show Less'
    }else{
        e.target.parentElement.children[2].style.height = '63px'
        e.target.innerHTML = 'read more'


    }
    
}









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