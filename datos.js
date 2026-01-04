

const metas = [
    {
        id: 1,
        meta: "Calidad de los laboratorios y equipamiento tecnológico",
        descripcion: "Modernización de infraestructura tecnológica y digitalización.",
        iconName: "wifi",
        theme: "blue",
        iconColor: "text-blue-600",
        color: "border-l-4 border-blue-500",
        bgColor: "bg-blue-50",

    },
    {
        id: 2,
        meta: "Consolidar el Ecosistema I+D+I+E",
        descripcion: "Fomento a la investigación, innovación y publicaciones científicas.",
        iconName: "flask-conical",
        iconColor: "text-purple-600",
        color: "border-l-4 border-purple-500",
        bgColor: "bg-purple-50",

    },
    {
        id: 3,
        meta: "Calidad de la comunicación",
        descripcion: "Fortalecimiento de la imagen institucional y proyección externa.",
        iconName: "megaphone",
        iconColor: "text-orange-600",
        color: "border-l-4 border-orange-500",
        bgColor: "bg-orange-50",

    },
    {
        id: 4,
        meta: "Fortalecer alianzas nacionales e internacionales",
        descripcion: "Vinculación con el sector productivo y colocación laboral.",
        iconName: "users",
        iconColor: "text-green-600",
        color: "border-l-4 border-green-500",
        bgColor: "bg-green-50",

    },
    {
        id: 5,
        meta: "Calidad de la gestión administrativa y financiera",
        descripcion: "Eficiencia en compras, inventarios y documentación.",
        iconName: "file-text",
        iconColor: "text-gray-600",
        color: "border-l-4 border-gray-500",
        bgColor: "bg-gray-50",

    },
    {
        id: 6,
        meta: "Calidad de la infraestructura física",
        descripcion: "Mantenimiento, seguridad perimetral y vigilancia.",
        iconName: "shield-check",
        iconColor: "text-red-600",
        color: "border-l-4 border-red-500",
        bgColor: "bg-red-50",

    },
    {
        id: 7,
        meta: "Calidad Académica y mejora de la gestión",
        descripcion: "Excelencia en los procesos de enseñanza y aprendizaje.",
        iconName: "graduation-cap",
        theme: "indigo",
        iconColor: "text-indigo-600",
        color: "border-l-4 border-indigo-500",
        bgColor: "bg-indigo-50",

    },
    {
        id: 8,
        meta: "Calidad de la planificación en todas las áreas",
        descripcion: "Alineación estratégica y seguimiento de objetivos.",
        iconName: "calendar-days",
        iconColor: "text-teal-600",
        color: "border-l-4 border-teal-500",
        bgColor: "bg-teal-50",

    },
    {
        id: 9,
        meta: "Calidad de la gestión humana",
        descripcion: "Desarrollo integral y bienestar de los colaboradores.",
        iconName: "heart-handshake",
        iconColor: "text-pink-600",
        color: "border-l-4 border-pink-500",
        bgColor: "bg-pink-50",

    },
    {
        id: 10,
        meta: "Calidad de la educación virtual",
        descripcion: "Fortalecimiento de plataformas y metodologías online.",
        iconName: "monitor-play",
        iconColor: "text-cyan-600",
        color: "border-l-4 border-cyan-500",
        bgColor: "bg-cyan-50",

    },
    {
        id: 11,
        meta: "Incrementar el sentido de pertenencia en ITSC",
        descripcion: "Fomento de la identidad y cultura institucional.",
        iconName: "heart",
        iconColor: "text-rose-600",
        color: "border-l-4 border-rose-500",
        bgColor: "bg-rose-50",

    },
    {
        id: 12,
        meta: "Disminuir la deserción a un 15%",
        descripcion: "Estrategias de retención y acompañamiento estudiantil.",
        iconName: "user-minus",
        iconColor: "text-amber-600",
        color: "border-l-4 border-amber-500",
        bgColor: "bg-amber-50"

    },
    {
        id: 13,
        meta: "Aumentar ingreso de Estudiantes a 8,000",
        descripcion: "Captación y matriculación de nuevos alumnos.",
        iconName: "user-plus",
        iconColor: "text-emerald-600",
        color: "border-l-4 border-emerald-500",
        bgColor: "bg-emerald-50"

    },
    {
        id: 14,
        meta: "Aumento del presupuesto en 80%",
        descripcion: "Gestión de recursos y eficiencia financiera.",
        iconName: "pie-chart",
        iconColor: "text-slate-600",
        color: "border-l-4 border-slate-500",
        bgColor: "bg-slate-50",

    }
];

const llamar = async (dirreccion) => {
    try {
        const response = await fetch(dirreccion);
        const data = await response.json();
        return data;
        console.log(data);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
};





const MetasProductos = async () => {
    const productos = await llamar('./mETA_PRODUCTO.json');

    productos.sort((a, b) => b.costo - a.costo);

    const metas_productos = metas.map(meta => {
        meta['areas'] = []
        meta['presupuestoTotal'] = 0
        meta['productos'] = []

        for (const producto of productos) {
            if (producto.meta === meta.meta) {
                
                meta['presupuestoTotal'] += producto.costo
                meta.productos.push({
                    nombre: producto.producto,
                    costo: producto.costo
                });

                if (producto.area && !meta.areas.includes(producto.area)) {
                    meta.areas.push(producto.area);
                }
            }
        }
        return meta

    }
    ).sort((a, b) => b.presupuestoTotal - a.presupuestoTotal);
    return metas_productos;
}

const Productos = async () => {
    const productos = await llamar('./mETA_PRODUCTO.json');
    return productos;
}

const MetasProductosTablero = async () => {
    const productos = await llamar('./mETA_PRODUCTO.json');
productos.sort((a, b) => b.costo - a.costo);
    const metas_productos = metas.map(meta => {
        meta['icon'] = meta.iconName;
        meta['theme'] = meta.iconColor.split('-')[1];
        meta['areas'] = []
        meta['presupuestoTotal'] = 0
        meta['productos'] = []

        for (const producto of productos) {
            if (producto.meta === meta.meta) {
                
                meta.productos.push({
                    nombre: producto.producto,
                    costo: producto.costo
                });
                if (producto.area && !meta.areas.includes(producto.area)) {
                    meta.areas.push(producto.area);
                }   
                meta['presupuestoTotal'] += producto.costo
            }
        }   
        return meta

    }
    ).sort((a, b) => b.presupuestoTotal - a.presupuestoTotal);
    return metas_productos;
}
