/* js eccos */

/* navegacion */

/* ir a seccion */
function irA(id) {
  setTimeout(function () {
    var seccion = document.getElementById(id);
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }, 150);
}

/* ir a productos */
function irTab(cat) {
  cambiarTab(cat); /* cambia tab */
  setTimeout(function () {
    var seccion = document.getElementById('productos');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }, 150);
}

/* abrir proveedor */
function irProv(id) {
  abrirModal(id); /* carga datos */
  setTimeout(function () {
    /* modal */
    var modal = new bootstrap.Modal(document.getElementById('modalProv'));
    modal.show();
  }, 150);
}


/* tabs */

/* cambiar tab */
function cambiarTab(cat) {
  /* tabs y paneles */
  var tabs   = document.querySelectorAll('.cat-tab');
  var panels = document.querySelectorAll('.cat-panel');

  /* limpia */
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('activo');
  }
  for (var i = 0; i < panels.length; i++) {
    panels[i].classList.remove('activo');
  }

  /* activa */
  var tabSeleccionada = document.querySelector('.cat-tab[data-cat="' + cat + '"]');
  var panelSeleccionado = document.getElementById('panel-' + cat);

  if (tabSeleccionada)   tabSeleccionada.classList.add('activo');
  if (panelSeleccionado) panelSeleccionado.classList.add('activo');
}


/* detalle clientes */

/* ver detalle */
function verMas(id, btn) {
  var detalle = document.getElementById(id);

  /* abre/cierra */
  var abierto = detalle.classList.toggle('abierto');

  /* texto boton */
  if (abierto) {
    btn.innerHTML = 'Ver menos <i class="bi bi-chevron-up"></i>';
  } else {
    btn.innerHTML = 'Ver más <i class="bi bi-chevron-down"></i>';
  }
}


/* proveedores */

/* datos */
var proveedores = {
  gibson: {
    nombre: 'GIBSON',
    ano: '1902',
    pais: 'Nashville, Tennessee — EE.UU.',
    web: 'https://www.gibson.com',
    descripcion: 'Gibson es uno de los fabricantes de guitarras más reconocidos del mundo. Fundada en 1902 por Orville Gibson, es responsable de instrumentos icónicos como la Les Paul, la SG, la ES-335 y la J-45 acústica. Sus guitarras han sido tocadas por Jimmy Page, Slash y B.B. King.',
    productos: ['Les Paul Standard', 'SG Standard', 'ES-335 Semi-Hollow', 'J-45 Acoustic', 'Flying V', 'Explorer']
  },
  yamaha: {
    nombre: 'YAMAHA',
    ano: '1887',
    pais: 'Hamamatsu, Shizuoka — Japón',
    web: 'https://www.yamaha.com',
    descripcion: 'Yamaha Corporation es el fabricante de instrumentos musicales más grande del mundo. Fundada en 1887, produce pianos, sintetizadores, guitarras, baterías electrónicas y equipos de audio profesional reconocidos por su calidad e innovación.',
    productos: ['Piano P-145', 'Sintetizador MODX8+', 'Batería DTX10', 'Mixer MG12XU', 'Guitarra Pacifica', 'Saxofón YAS-280']
  },
  fender: {
    nombre: 'FENDER',
    ano: '1946',
    pais: 'Scottsdale, Arizona — EE.UU.',
    web: 'https://www.fender.com',
    descripcion: 'Fender fue fundada por Leo Fender en 1946. Es responsable de las guitarras más icónicas de la historia: la Telecaster (1950) y la Stratocaster (1954), además del Jazz Bass y Precision Bass. Favoritos de Jimi Hendrix, Eric Clapton y Kurt Cobain.',
    productos: ['Stratocaster Player', 'Telecaster American Pro II', 'Jazz Bass MX', 'Precision Bass', 'Blues Junior Amp', 'Acoustic CD-60S']
  }
};

/* llenar modal */
function abrirModal(id) {
  var p = proveedores[id];

  /* titulo */
  document.getElementById('modalTitulo').textContent = p.nombre;

  /* tags */
  var badges = '';
  for (var i = 0; i < p.productos.length; i++) {
    badges += '<span class="prov-m-badge">' + p.productos[i] + '</span>';
  }

  /* contenido */
  document.getElementById('modalCuerpo').innerHTML =
    '<div class="row g-4">' +
      '<div class="col-md-4 text-center" style="border-right: 1px solid #222; padding-right: 24px;">' +
        '<p class="prov-m-nombre">' + p.nombre + '</p>' +
        '<p class="prov-m-pais">' + p.pais + '</p>' +
        '<p style="font-size: .7rem; color: #444;">Fundada en <span style="color: var(--dorado);">' + p.ano + '</span></p>' +
        '<a href="' + p.web + '" target="_blank" style="font-size: .72rem; color: var(--dorado); text-decoration: none;">' +
          'Visitar sitio oficial <i class="bi bi-box-arrow-up-right"></i>' +
        '</a>' +
      '</div>' +
      '<div class="col-md-8">' +
        '<p class="prov-m-desc">' + p.descripcion + '</p>' +
        '<div class="prov-m-prods">' +
          '<h6>Productos disponibles en ECCOS</h6>' +
          badges +
        '</div>' +
      '</div>' +
    '</div>';
}


/* musica */

/* elementos */
var audioFondo = document.getElementById('audioFondo');
var btnMusica  = document.getElementById('btnMusica');
var volSlider  = document.getElementById('volSlider');

/* inicio */
var reproduciendo = false;
audioFondo.volume = 0.18; /* volumen */

/* boton musica */
btnMusica.addEventListener('click', function () {
  if (reproduciendo) {
    audioFondo.pause();
    btnMusica.innerHTML = '<i class="bi bi-music-note-beamed"></i> Música';
  } else {
    /* por si se bloquea */
    audioFondo.play().catch(function () {});
    btnMusica.innerHTML = '<i class="bi bi-pause-fill"></i> Pausar';
  }
  reproduciendo = !reproduciendo; /* cambia */
});

/* volumen */
volSlider.addEventListener('input', function () {
  audioFondo.volume = parseFloat(volSlider.value);
});


/* animacion al bajar */

/* cuando aparece */
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
    }
  });
}, { threshold: 0.08 });

/* activa animacion */
var elementosFI = document.querySelectorAll('.fi');
elementosFI.forEach(function (el) {
  observer.observe(el);
});


