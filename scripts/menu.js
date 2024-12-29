
console.log('Um projeto criado por fã para fãs de RPG ❤.');

document.addEventListener("DOMContentLoaded", () => {
    const avisoAjuda = document.querySelector(".aviso-ajuda");
    const btnAjuda = document.querySelector(".button-ajuda");
    const btnFechar = document.getElementById("btnexit");

    btnAjuda.addEventListener("click", () => {
        avisoAjuda.classList.remove("hidden", "fade-out");
        avisoAjuda.classList.add("fade-in");
    });

    btnFechar.addEventListener("click", () => {
        avisoAjuda.classList.remove("fade-in");
        avisoAjuda.classList.add("fade-out");

        avisoAjuda.addEventListener("animationend", () => {
            if (avisoAjuda.classList.contains("fade-out")) {
                avisoAjuda.classList.add("hidden");
            }
        }, { once: true });
    });
});
