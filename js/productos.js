// Catálogo Inicial de Productos - Delicious Pizza Tocaima
const DEFAULT_PRODUCTS = [
    // --- PIZZAS DESTACADAS ---
    {
        id: "prod-1",
        name: "Pizza Familiar Artesanal",
        category: "pizzas",
        price: 38000,
        description: "Abundante queso fundido, maíz tierno dulce y topping crocante de nachos. Receta artesanal de 20 años.",
        image: "imagen/pizza_artesanal.jpg",
        badge: "Especial",
        available: true
    },
    {
        id: "prod-2",
        name: "Rueda de Pizza Familiar",
        category: "pizzas",
        price: 48000,
        description: "Pizza gigante de masa crujiente, perfecta para compartir en reuniones familiares.",
        image: "imagen/RUEDA DE PIZZA FAMILIAR.jpg",
        badge: "Familiar",
        available: true
    },
    {
        id: "prod-3",
        name: "Porción Hawaiana",
        category: "pizzas",
        price: 7000,
        description: "La clásica combinación de piña calada dulce, jamón seleccionado y queso derretido.",
        image: "imagen/Porcion hawaiana.jpg",
        badge: "Clásica",
        available: true
    },
    {
        id: "prod-4",
        name: "Porción Peperoni",
        category: "pizzas",
        price: 7500,
        description: "Rodajas de pepperoni premium ligeramente dorado con especias tradicionales.",
        image: "imagen/Porcion Peperoni.jpg",
        badge: "Favorita",
        available: true
    },
    {
        id: "prod-5",
        name: "Porción Especial de Carnes",
        category: "pizzas",
        price: 8000,
        description: "Cargada con carne desmechada, tocineta, salchicha y jamón con queso mozzarella.",
        image: "imagen/Porcion carnes.jpg",
        badge: "Especial",
        available: true
    },
    {
        id: "prod-6",
        name: "Porción Ranchera",
        category: "pizzas",
        price: 8000,
        description: "Sabor ahumado intenso con salchicha ranchera, maíz tierno y tocineta crocante.",
        image: "imagen/Porcion ranchera.jpg",
        badge: "Popular",
        available: true
    },
    {
        id: "prod-7",
        name: "Porción Criolla",
        category: "pizzas",
        price: 7500,
        description: "Ingredientes locales seleccionados con la sazón tradicional de la casa.",
        image: "imagen/Porcion criolla.jpg",
        badge: "",
        available: true
    },
    {
        id: "prod-8",
        name: "Porción Mexicana",
        category: "pizzas",
        price: 8000,
        description: "Un toque picante con carne molida sazonada, jalapeños y frijol refrito.",
        image: "imagen/Porcion mexicana.jpg",
        badge: "Picante",
        available: true
    },

    // --- SNACKS Y ENTRADAS ---
    {
        id: "prod-9",
        name: "Panzerottis Rellenos",
        category: "snacks",
        price: 9000,
        description: "Horneados doraditos, rellenos de mucho queso fundido y jamón o carne de tu elección.",
        image: "imagen/Panzerotis.jpg",
        badge: "Horneado",
        available: true
    },

    // --- BEBIDAS REFRESCANTES ---
    {
        id: "prod-10",
        name: "Quatro Toronja 1.5L",
        category: "bebidas",
        price: 7500,
        description: "Gaseosa de toronja súper refrescante para acompañar tus pizzas.",
        image: "imagen/quatro_15l.jpg",
        badge: "1.5 Litros",
        available: true
    },
    {
        id: "prod-11",
        name: "Quatro Toronja Vidrio 350ml",
        category: "bebidas",
        price: 3500,
        description: "Presentación personal en botella de vidrio helada.",
        image: "imagen/quatro_350ml.jpg",
        badge: "Personal",
        available: true
    },
    {
        id: "prod-12",
        name: "Sprite Lima-Limón 1.5L",
        category: "bebidas",
        price: 7500,
        description: "Gaseosa familiar fresca y burbujeante sabor a lima-limón.",
        image: "imagen/sprite_15l.jpg",
        badge: "1.5 Litros",
        available: true
    },
    {
        id: "prod-13",
        name: "Sprite 400ml",
        category: "bebidas",
        price: 3500,
        description: "Botella personal práctica para llevar contigo.",
        image: "imagen/sprite_400ml.jpg",
        badge: "Personal",
        available: true
    },
    {
        id: "prod-14",
        name: "Coca-Cola 1.5L",
        category: "bebidas",
        price: 8500,
        description: "El sabor clásico de Coca-Cola en presentación familiar.",
        image: "imagen/Coca-Cola 1.5L.jpg",
        badge: "Familiar",
        available: true
    },
    {
        id: "prod-15",
        name: "Avena Cubana Helada",
        category: "bebidas",
        price: 5000,
        description: "Cremosa avena tradicional preparada con la receta secreta de la casa.",
        image: "imagen/Avena cubana.jpg",
        badge: "Casera",
        available: true
    }
];

// Lista de imágenes disponibles en el proyecto para selección rápida en el panel
const AVAILABLE_IMAGES = [
    { label: "Pizza Artesanal", path: "imagen/pizza_artesanal.jpg" },
    { label: "Rueda de Pizza Familiar", path: "imagen/RUEDA DE PIZZA FAMILIAR.jpg" },
    { label: "Porción Hawaiana", path: "imagen/Porcion hawaiana.jpg" },
    { label: "Porción Peperoni", path: "imagen/Porcion Peperoni.jpg" },
    { label: "Porción Carnes", path: "imagen/Porcion carnes.jpg" },
    { label: "Porción Ranchera", path: "imagen/Porcion ranchera.jpg" },
    { label: "Porción Criolla", path: "imagen/Porcion criolla.jpg" },
    { label: "Porción Mexicana", path: "imagen/Porcion mexicana.jpg" },
    { label: "Porción Tropical", path: "imagen/Porcion  tropical.jpg" },
    { label: "Porción Carbonara", path: "imagen/Porcion carbonara.jpg" },
    { label: "Porción Napolitana", path: "imagen/Porcion napolitana.jpg" },
    { label: "Porción Tentación", path: "imagen/Porcion tentacion.jpg" },
    { label: "Panzerottis Rellenos", path: "imagen/Panzerotis.jpg" },
    { label: "Quatro 1.5L", path: "imagen/quatro_15l.jpg" },
    { label: "Quatro Vidrio 350ml", path: "imagen/quatro_350ml.jpg" },
    { label: "Sprite 1.5L", path: "imagen/sprite_15l.jpg" },
    { label: "Sprite 400ml", path: "imagen/sprite_400ml.jpg" },
    { label: "Sprite Vidrio 350ml", path: "imagen/Sprite vidrio 350ml.jpg" },
    { label: "Coca-Cola 1.5L", path: "imagen/Coca-Cola 1.5L.jpg" },
    { label: "Coca-Cola 1L", path: "imagen/Coca-Cola 1L.jpg" },
    { label: "Coca-Cola 2.25L", path: "imagen/Coca-Cola 2.25L.jpg" },
    { label: "Coca-Cola 400ml", path: "imagen/Coca-Cola 400ml.jpg" },
    { label: "Coca-Cola Vidrio 350ml", path: "imagen/Coca-Cola vidrio 350ml.jpg" },
    { label: "Avena Cubana Helada", path: "imagen/Avena cubana.jpg" },
    { label: "Colombiana 400ml", path: "imagen/Colombiana  400ml.jpg" },
    { label: "Freskola Vidrio 350ml", path: "imagen/Freskola vidrio 350ml.jpg" },
    { label: "Fuzetea Durazno 600ml", path: "imagen/Fuzetea Durasno 600ml.jpg" },
    { label: "Fuzetea Limón 600ml", path: "imagen/Fuzetea Limon 600ml.jpg" },
    { label: "Kola Sol 1L", path: "imagen/Kola Sol 1L.jpg" },
    { label: "Manzana 400ml", path: "imagen/Manzana  400ml.jpg" },
    { label: "Pony Malta 330ml", path: "imagen/Pony Malta 330ml.jpg" },
    { label: "Agua Brisa", path: "imagen/Agua Brisa.jpg" },
    { label: "Agua con gas Brisa", path: "imagen/Agua con gas Brisa.jpg" }
];
