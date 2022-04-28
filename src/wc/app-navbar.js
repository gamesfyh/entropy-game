const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="./styles/site.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap" rel="stylesheet">

<style>
* {
    background-color: #131722;
}
nav {
    font-family: 'Open Sans', sans-serif;
}
.navbar {
    border-bottom: 5px solid grey;
}

.navbar-item:hover {
    background-color: #333e5b !important;
}

</style>


<nav class="navbar">

    <div class="navbar-brand">
        <a class="navbar-item" href="home.html">
            <i class="fas fa-user"></i>
        </a>
        <a class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>

    <div class="navbar-menu" id="nav-links">
        <div class="navbar-start">
            <a class="navbar-item is-hoverable has-text-light" href="home.html">
            Home
            </a>
        
            <a class="navbar-item is-hoverable has-text-light" href="app.html">
            App
            </a>
        
            <a class="navbar-item is-hoverable has-text-light" href="documentation.html">
            Documentation
            </a>
        </div> 
    </div>
    
</nav>
`

class AppNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    connectedCallback() {
        let page = this.dataset.page || "home";
        let button = this.shadowRoot.querySelector(`.navbar-start > [href='${page}.html']`);
        button.classList.remove("is-hoverable");
        button.classList.add("has-text-weight-bold");
        button.classList.add("has-background-grey-dark");
        button.removeAttribute("href");

        
        this.burgerIcon = this.shadowRoot.querySelector("#burger");
        this.navbarMenu = this.shadowRoot.querySelector("#nav-links");
        this.burgerIcon.addEventListener("click", () => {this.navbarMenu.classList.toggle("is-active")});
    }
}

customElements.define("app-navbar", AppNavbar)