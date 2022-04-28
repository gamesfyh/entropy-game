const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="./styles/site.css">

<style>
h1 {
    font-family: 'EB Garamond', serif;
}
</style>
<header class="header w3-theme-d3">
<h1 class="is-size-1 pl-5"><slot></slot></h1>
</header>
`;

class ProjectHeader extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h1 = this.shadowRoot.querySelector("h1");
    }

    static get observedAttributes() {
        return [];
    }

    render() {
        
    }
}

customElements.define("project-header", ProjectHeader);