function setEmail() {
    const elements = document.querySelectorAll("[data-email]");
    elements.forEach(element => {
        const encoded = element.dataset.email;
        const value = encoded.split(/(\w\w)/g)
            .filter(p => !!p)
            .map(c => String.fromCharCode(parseInt(c, 16)))
            .join("");
        element.href = "mailto:" + value;
        element.textContent = value;
    });
}

addEventListener('DOMContentLoaded', setEmail)
