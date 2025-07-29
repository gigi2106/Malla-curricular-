// Espera a que todo el contenido del HTML se haya cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINICIÓN DE DATOS DE LA MALLA CURRICULAR ---
    // Cada ramo es un objeto con su id, nombre, semestre y un array de requisitos.
    // El 'id' es un identificador único y se usa para las dependencias.
    const ramos = [
        // Semestre 1
        { id: 'desarrollo-personal-autoconocimiento', nombre: 'Desarrollo personal y autoconocimiento', semestre: 1, requisitos: [] },
        { id: 'fundamentos-to', nombre: 'Fundamentos de la Terapia Ocupacional', semestre: 1, requisitos: [] },
        { id: 'estudios-ocupacion-to', nombre: 'Estudios en Ocupación y Terapia Ocupacional', semestre: 1, requisitos: [] },
        { id: 'anatomia-humana', nombre: 'Anatomía Humana', semestre: 1, requisitos: [] },
        { id: 'psicologia-curso-vida', nombre: 'Psicología en el curso de la vida', semestre: 1, requisitos: [] },
        { id: 'biologia-celular-histomorfologia', nombre: 'Biología Celular e Histomorfología', semestre: 1, requisitos: [] },

        // Semestre 2
        { id: 'participacion-ocupacional-1', nombre: 'Participación Ocupacional I', semestre: 2, requisitos: ['fundamentos-to'] },
        { id: 'desarrollo-creatividad', nombre: 'Desarrollo de la Creatividad', semestre: 2, requisitos: ['desarrollo-personal-autoconocimiento'] },
        { id: 'filosofia-ocupacion', nombre: 'Filosofía de la Ocupación', semestre: 2, requisitos: ['estudios-ocupacion-to'] },
        { id: 'ciencias-sociales-to', nombre: 'Ciencias Sociales para la Terapia Ocupacional', semestre: 2, requisitos: ['anatomia-humana', 'psicologia-curso-vida', 'biologia-celular-histomorfologia'] },
        { id: 'fisiologia-general', nombre: 'Fisiología General', semestre: 2, requisitos: ['anatomia-humana', 'psicologia-curso-vida', 'biologia-celular-histomorfologia'] },
        { id: 'electivo-1', nombre: 'Electivo I', semestre: 2, requisitos: [] },

        // Semestre 3
        { id: 'participacion-ocupacional-2', nombre: 'Participación Ocupacional II', semestre: 3, requisitos: ['participacion-ocupacional-1'] },
        { id: 'razonamiento-situado-1', nombre: 'Razonamiento Situado y Estrategias Terapéuticas I', semestre: 3, requisitos: [] }, // No tiene requisito explícito en la lista
        { id: 'salud-basada-evidencias', nombre: 'Salud Basada en Evidencias', semestre: 3, requisitos: ['filosofia-ocupacion'] },
        { id: 'anatomia-funcional-1', nombre: 'Anatomía Funcional y Biomecánica I', semestre: 3, requisitos: ['ciencias-sociales-to', 'fisiologia-general'] },
        { id: 'gerontologia-social', nombre: 'Gerontología Social y Ocupacional', semestre: 3, requisitos: ['ciencias-sociales-to', 'fisiologia-general'] },
        { id: 'electivo-2', nombre: 'Electivo II', semestre: 3, requisitos: ['electivo-1'] },

        // Semestre 4
        { id: 'practica-integrada-inicial', nombre: 'Práctica Integrada Inicial', semestre: 4, requisitos: ['participacion-ocupacional-2'] },
        { id: 'enfoques-modelos', nombre: 'Enfoques y Modelo de la Práctica', semestre: 4, requisitos: ['razonamiento-situado-1'] },
        { id: 'desarrollo-persona-terapeuta', nombre: 'Desarrollo de la Persona del Terapeuta', semestre: 4, requisitos: ['desarrollo-creatividad'] },
        { id: 'anatomia-funcional-2', nombre: 'Anatomía Funcional y Biomecánica II', semestre: 4, requisitos: ['anatomia-funcional-1', 'gerontologia-social'] },
        { id: 'psicomotricidad', nombre: 'Psicomotricidad en el Curso de la Vida', semestre: 4, requisitos: ['anatomia-funcional-1', 'gerontologia-social'] },
        { id: 'neurociencia-aplicada', nombre: 'Neurociencia Aplicada', semestre: 4, requisitos: ['anatomia-funcional-1', 'gerontologia-social'] },
        { id: 'electivo-3', nombre: 'Electivo III', semestre: 4, requisitos: ['electivo-2'] },

        // Semestre 5
        { id: 'participacion-ocupacional-inclusion', nombre: 'Participación Ocupacional e Inclusión', semestre: 5, requisitos: ['practica-integrada-inicial'] },
        { id: 'razonamiento-situado-2', nombre: 'Razonamiento Situado y Estrategias Terapéuticas II', semestre: 5, requisitos: ['desarrollo-persona-terapeuta'] },
        { id: 'diseno-investigacion-cuantitativa', nombre: 'Diseños de Investigación Cuantitativa', semestre: 5, requisitos: ['salud-basada-evidencias'] },
        { id: 'procesos-salud-ninez', nombre: 'Procesos de Salud y Enfermedad en Niñez y Juventud', semestre: 5, requisitos: ['practica-integrada-inicial'] },
        { id: 'procesos-salud-adultos', nombre: 'Procesos de Salud y Enfermedad en Adultos y Personas Mayores', semestre: 5, requisitos: ['practica-integrada-inicial'] },
        { id: 'electivo-4', nombre: 'Electivo IV', semestre: 5, requisitos: ['electivo-3'] },

        // Semestre 6
        { id: 'practica-integrada-perspectiva', nombre: 'Práctica Integrada y Perspectiva Situada', semestre: 6, requisitos: ['participacion-ocupacional-inclusion'] },
        { id: 'diseno-investigacion-cualitativa', nombre: 'Diseño de Investigación Cualitativa', semestre: 6, requisitos: ['diseno-investigacion-cuantitativa'] },
        { id: 'desafios-ocupacionales-infancia', nombre: 'Desafíos Ocupacionales en Infancia y Juventud', semestre: 6, requisitos: ['procesos-salud-ninez'] },
        { id: 'salud-publica', nombre: 'Salud Pública', semestre: 6, requisitos: ['anatomia-funcional-2', 'psicomotricidad', 'neurociencia-aplicada'] },
        { id: 'bioetica', nombre: 'Bioética', semestre: 6, requisitos: ['anatomia-funcional-2', 'psicomotricidad', 'neurociencia-aplicada'] },
        
        // Semestre 7
        { id: 'procesos-to-comunidad', nombre: 'Procesos de Terapia Ocupacional y Comunidad', semestre: 7, requisitos: ['enfoques-modelos'] },
        { id: 'ortotica-1', nombre: 'Ortótica y Tecnología Aplicada I', semestre: 7, requisitos: ['practica-integrada-perspectiva', 'desafios-ocupacionales-infancia'] }, // Simplificado, ya que el otro requisito no estaba en la lista de ramos
        { id: 'ergonomia-aplicada', nombre: 'Ergonomía Aplicada a la Ocupación', semestre: 7, requisitos: ['practica-integrada-perspectiva', 'desafios-ocupacionales-infancia'] },
        { id: 'procesos-to-ninez', nombre: 'Procesos de Terapia Ocupacional en Niñez y Juventud', semestre: 7, requisitos: ['practica-integrada-perspectiva', 'desafios-ocupacionales-infancia'] },
        { id: 'procesos-to-adultos', nombre: 'Procesos de Terapia Ocupacional en Adultos y Personas Mayores', semestre: 7, requisitos: ['practica-integrada-perspectiva', 'desafios-ocupacionales-infancia'] },
        { id: 'ia-salud', nombre: 'Inteligencia Artificial Aplicada a la Salud', semestre: 7, requisitos: ['practica-integrada-perspectiva', 'desafios-ocupacionales-infancia'] },

        // Semestre 8
        { id: 'practica-integrada-sistematizacion', nombre: 'Práctica Integrada y Perspectiva Situada II', semestre: 8, requisitos: ['ortotica-1', 'ergonomia-aplicada', 'procesos-to-ninez', 'procesos-to-adultos', 'ia-salud'] }, // Renombrado de la lista
        { id: 'ortotica-2', nombre: 'Ortótica y Tecnología Aplicada II', semestre: 8, requisitos: ['ortotica-1'] },
        { id: 'proyecto-investigacion', nombre: 'Proyecto de Investigación', semestre: 8, requisitos: ['diseno-investigacion-cualitativa'] }, // Asumido desde "proyecto aplicado"
        { id: 'practica-ninez-juventud', nombre: 'Práctica Integrada en Niñez y Juventud', semestre: 8, requisitos: ['procesos-to-ninez'] },
        { id: 'emprendimiento-innovacion', nombre: 'Emprendimiento e Innovación', semestre: 8, requisitos: ['procesos-to-comunidad'] },
        { id: 'electivo-5', nombre: 'Electivo V', semestre: 8, requisitos: ['electivo-4'] },

        // Semestre 9
        { id: 'practica-profesional-1', nombre: 'Práctica Profesional I', semestre: 9, requisitos: ['practica-integrada-sistematizacion', 'ortotica-2', 'practica-ninez-juventud'] },
        { id: 'practica-profesional-2', nombre: 'Práctica Profesional II', semestre: 9, requisitos: ['emprendimiento-innovacion'] },
        { id: 'practica-profesional-3', nombre: 'Práctica Profesional III', semestre: 9, requisitos: ['practica-integrada-sistematizacion', 'ortotica-2', 'practica-ninez-juventud'] },
        { id: 'practica-profesional-4', nombre: 'Práctica Profesional IV', semestre: 9, requisitos: ['emprendimiento-innovacion'] },
        { id: 'desarrollo-profesional-1', nombre: 'Desarrollo Profesional I', semestre: 9, requisitos: ['razonamiento-situado-2'] },
        { id: 'proyecto-titulo-1', nombre: 'Proyecto de Título I', semestre: 9, requisitos: ['proyecto-investigacion'] },
        
        // Semestre 10
        { id: 'practica-profesional-10-1', nombre: 'Práctica Profesional I', semestre: 10, requisitos: [] }, // Nombres repetidos, se asume son continuaciones
        { id: 'practica-profesional-10-2', nombre: 'Práctica Profesional II', semestre: 10, requisitos: [] },
        { id: 'practica-profesional-10-3', nombre: 'Práctica Profesional III', semestre: 10, requisitos: [] },
        { id: 'practica-profesional-10-4', nombre: 'Práctica Profesional IV', semestre: 10, requisitos: [] },
        { id: 'desarrollo-profesional-2', nombre: 'Desarrollo Personal II', semestre: 10, requisitos: ['desarrollo-profesional-1'] }, // Corregido según lógica
        { id: 'proyecto-titulo-2', nombre: 'Proyecto de Título II', semestre: 10, requisitos: ['proyecto-titulo-1'] }
    ];

    // --- 2. ESTADO DE LA APLICACIÓN ---
    // Un conjunto (Set) para almacenar los IDs de los ramos aprobados.
    // Usamos un Set porque es más eficiente para añadir, eliminar y comprobar la existencia de un elemento.
    let aprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobadosTO')) || []);

    // --- 3. ELEMENTOS DEL DOM ---
    const mallaContainer = document.getElementById('malla-curricular');
    const modal = document.getElementById('modal-requisitos');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    const listaRequisitosFaltantes = document.getElementById('lista-requisitos-faltantes');
    const limpiarProgresoBtn = document.getElementById('limpiar-progreso');

    // --- 4. FUNCIONES ---

    /**
     * Guarda el conjunto de ramos aprobados en el localStorage del navegador.
     */
    const guardarProgreso = () => {
        // Convertimos el Set a un Array para poder usar JSON.stringify.
        localStorage.setItem('ramosAprobadosTO', JSON.stringify(Array.from(aprobados)));
    };

    /**
     * Comprueba si todos los requisitos de un ramo están aprobados.
     * @param {object} ramo - El objeto del ramo a comprobar.
     * @returns {Array} - Un array con los IDs de los requisitos que faltan. Si no falta ninguno, devuelve un array vacío.
     */
    const obtenerRequisitosFaltantes = (ramo) => {
        return ramo.requisitos.filter(reqId => !aprobados.has(reqId));
    };

    /**
     * Actualiza la apariencia de todos los ramos en la página (aprobado, bloqueado, pendiente).
     */
    const actualizarEstadoVisualRamos = () => {
        ramos.forEach(ramo => {
            const elRamo = document.getElementById(ramo.id);
            if (!elRamo) return;

            const requisitosFaltantes = obtenerRequisitosFaltantes(ramo);

            elRamo.classList.remove('aprobado', 'bloqueado');

            if (aprobados.has(ramo.id)) {
                elRamo.classList.add('aprobado');
            } else if (requisitosFaltantes.length > 0) {
                elRamo.classList.add('bloqueado');
            }
        });
    };

    /**
     * Muestra el modal con la lista de requisitos que faltan para un ramo.
     * @param {Array} faltantesIds - Array de IDs de los ramos faltantes.
     */
    const mostrarModalRequisitos = (faltantesIds) => {
        // Limpiamos la lista anterior.
        listaRequisitosFaltantes.innerHTML = '';
        
        faltantesIds.forEach(id => {
            // Buscamos el nombre completo del ramo a partir de su ID.
            const ramoFaltante = ramos.find(r => r.id === id);
            if (ramoFaltante) {
                const li = document.createElement('li');
                li.textContent = ramoFaltante.nombre;
                listaRequisitosFaltantes.appendChild(li);
            }
        });
        
        modal.classList.remove('modal-oculto');
        modal.classList.add('modal-visible');
    };

    /**
     * Maneja el evento de clic sobre un ramo.
     * @param {object} ramo - El objeto del ramo que fue clickeado.
     */
    const onRamoClick = (ramo) => {
        const requisitosFaltantes = obtenerRequisitosFaltantes(ramo);

        if (aprobados.has(ramo.id)) {
            // Si ya está aprobado, lo des-aprobamos (y a todos los que dependen de él).
            // Esta es una simplificación: solo lo des-aprobamos a él.
            aprobados.delete(ramo.id);
        } else if (requisitosFaltantes.length === 0) {
            // Si no está aprobado y no tiene requisitos faltantes, lo aprobamos.
            aprobados.add(ramo.id);
        } else {
            // Si está bloqueado, mostramos el modal con los requisitos.
            mostrarModalRequisitos(requisitosFaltantes);
            return; // Detenemos la ejecución para no actualizar ni guardar nada.
        }

        guardarProgreso();
        actualizarEstadoVisualRamos();
    };

    /**
     * Crea y muestra todos los elementos de la malla en el DOM.
     */
    const renderizarMalla = () => {
        // Limpiamos el contenedor por si acaso.
        mallaContainer.innerHTML = '';
        const numeroSemestres = Math.max(...ramos.map(r => r.semestre));

        // Creamos una columna por cada semestre.
        for (let i = 1; i <= numeroSemestres; i++) {
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            
            const tituloSemestre = document.createElement('h2');
            tituloSemestre.textContent = `Semestre ${i}`;
            semestreDiv.appendChild(tituloSemestre);

            // Filtramos y añadimos los ramos correspondientes a este semestre.
            ramos.filter(ramo => ramo.semestre === i).forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.id = ramo.id;
                ramoDiv.className = 'ramo';
                ramoDiv.textContent = ramo.nombre;
                
                ramoDiv.addEventListener('click', () => onRamoClick(ramo));
                
                semestreDiv.appendChild(ramoDiv);
            });

            mallaContainer.appendChild(semestreDiv);
        }
    };
    
    // --- 5. INICIALIZACIÓN Y EVENTOS ---
    
    // Renderizamos la malla al cargar la página.
    renderizarMalla();
    // Aplicamos los estilos iniciales según el progreso guardado.
    actualizarEstadoVisualRamos();

    // Evento para cerrar el modal al hacer clic en la 'X'.
    cerrarModalBtn.addEventListener('click', () => {
        modal.classList.add('modal-oculto');
        modal.classList.remove('modal-visible');
    });

    // Evento para cerrar el modal al hacer clic fuera del contenido.
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('modal-oculto');
            modal.classList.remove('modal-visible');
        }
    });

    // Evento para el botón de limpiar progreso.
    limpiarProgresoBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
            aprobados.clear();
            guardarProgreso();
            actualizarEstadoVisualRamos();
        }
    });
});
