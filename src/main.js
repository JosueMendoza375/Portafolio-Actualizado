document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const menu = header.querySelector("ul");
  const enlaces = header.querySelectorAll('a[href^="#"]');
  const secciones = document.querySelectorAll("main section");

  if (secciones.length === 0) return;

  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  const indicador = document.createElement("span");
  indicador.className = "indicador";
  indicador.setAttribute("aria-hidden", "true");
  header.appendChild(indicador);

  let colocado = false;

  function enlaceActivo() {
    return header.querySelector('a[aria-current="true"]');
  }

  function moverIndicador(enlace, animar = true) {
    if (!enlace) return;

    const h = header.getBoundingClientRect();
    const r = enlace.getBoundingClientRect();
    const destino = {
      transform: `translate(${r.left - h.left}px, ${r.bottom - h.top - 2}px)`,
      width: `${r.width}px`,
    };

    if (animar && colocado && !reducirMovimiento.matches) {
      const estilo = getComputedStyle(indicador);
      const desde = { transform: estilo.transform, width: estilo.width };

      indicador.getAnimations().forEach((animacion) => animacion.cancel());
      Object.assign(indicador.style, destino);
      indicador.animate([desde, destino], {
        duration: 300,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      });
    } else {
      Object.assign(indicador.style, destino);
    }

    indicador.style.opacity = "1";
    colocado = true;
  }

  function pulso(enlace) {
    if (reducirMovimiento.matches) return;

    enlace.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.9)" },
        { transform: "scale(1)" },
      ],
      { duration: 200, easing: "ease-out" }
    );
  }

  function mostrar(id) {
    secciones.forEach((seccion) => {
      seccion.hidden = seccion.id !== id;
    });

    enlaces.forEach((enlace) => {
      if (enlace.getAttribute("href") === `#${id}`) {
        enlace.setAttribute("aria-current", "true");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });

    moverIndicador(enlaceActivo());
  }

  function idInicial() {
    const id = location.hash.slice(1);
    const existe = Array.from(secciones).some((seccion) => seccion.id === id);
    return existe ? id : secciones[0].id;
  }

  enlaces.forEach((enlace) => {
    enlace.addEventListener("mouseenter", () => moverIndicador(enlace));
    enlace.addEventListener("focus", () => moverIndicador(enlace));
    enlace.addEventListener("blur", () => moverIndicador(enlaceActivo()));

    enlace.addEventListener("click", (evento) => {
      evento.preventDefault();
      const id = enlace.getAttribute("href").slice(1);
      mostrar(id);
      history.replaceState(null, "", `#${id}`);
      pulso(enlace);
    });
  });


  menu.addEventListener("mouseleave", () => moverIndicador(enlaceActivo()));

  window.addEventListener("resize", () => moverIndicador(enlaceActivo(), false));
  window.addEventListener("load", () => moverIndicador(enlaceActivo(), false));

  window.addEventListener("hashchange", () => mostrar(idInicial()));

  mostrar(idInicial());
});