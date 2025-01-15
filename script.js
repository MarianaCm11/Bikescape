var swiper = new Swiper(" .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    grabCursor: true,
    loop:true,
    breakpoints : {
        991: {
            slidesPerView:3
        }
    }
});

// Obtener el nombre de la página actual
const pageName = window.location.pathname.split('/').pop().split('.').shift();

// Cargar testimonios desde el almacenamiento local
document.querySelectorAll('.testimonios .lista-testimonios').forEach(lista => {
    let testimonios = JSON.parse(localStorage.getItem('testimonios_' + pageName)) || [];
    testimonios.forEach(testimonio => {
        let testimonioDiv = document.createElement('div');
        testimonioDiv.classList.add('testimonio');
        testimonioDiv.innerHTML = `<p><strong>${testimonio.nombre}:</strong> ${testimonio.mensaje}</p>
                                   <p><small>${testimonio.fecha}</small></p>`;
        lista.appendChild(testimonioDiv);
    });
});

// Manejar el envío de testimonios
document.querySelectorAll('.testimonios form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let nombre = form.querySelector('input[name="nombre"]').value;
        let mensaje = form.querySelector('textarea[name="mensaje"]').value;
        let fecha = new Date().toLocaleString('es-ES', { hour12: false });

        if (nombre && mensaje) {
            let testimonio = { nombre, mensaje, fecha };
            let testimonios = JSON.parse(localStorage.getItem('testimonios_' + pageName)) || [];
            testimonios.push(testimonio);
            localStorage.setItem('testimonios_' + pageName, JSON.stringify(testimonios));

            let testimonioDiv = document.createElement('div');
            testimonioDiv.classList.add('testimonio');
            testimonioDiv.innerHTML = `<p><strong>${nombre}:</strong> ${mensaje}</p>
                                       <p><small>${fecha}</small></p>`;
            form.parentElement.querySelector('.lista-testimonios').appendChild(testimonioDiv);

            // Limpiar el formulario
            form.reset();
        }
    });
});