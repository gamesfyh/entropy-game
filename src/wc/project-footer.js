const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="./styles/site.css">
<style>
strong {
  color: #fff
}
</style>
<footer class="footer pt-5 pb-5 w3-theme-d5">
  <div class="content has-text-centered">
    <p>
      &copy; 2022 <strong><slot></slot></strong>
    </p>
  </div>
</footer>
`;

class ProjectFooter extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h1 = this.shadowRoot.querySelector("h1");
    }
}

customElements.define("project-footer", ProjectFooter);