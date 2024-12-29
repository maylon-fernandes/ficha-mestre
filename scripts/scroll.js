document.addEventListener("DOMContentLoaded", (event) => {
    const lenis = new Lenis({
        lerp: 0.1, // quão suave será o scroll (0 = sem suavização, 1 = suavização máxima)
        smooth: true, // ativa o scroll suave
        smoothTouch: true // ativa o scroll suave para dispositivos móveis
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

});
