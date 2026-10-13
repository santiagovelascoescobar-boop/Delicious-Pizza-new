// ==========================================================================
// GESTOR DE ADMINISTRACIÓN Y CATÁLOGO DINÁMICO - DELICIOUS PIZZA
// ==========================================================================

const ADMIN_CREDENTIALS = {
    email: "santiagovelascoescobar@gmail.com",
    pass: "parra2821"
};

const STORAGE_KEYS = {
    PRODUCTS: "dp_products_data",
    SESSION: "dp_admin_session"
};

// --- 1. GESTIÓN DE PRODUCTOS (LOCALSTORAGE) ---
function getStoredProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Error al leer productos de localStorage:", e);
    }
    // Si no hay productos guardados, inicializar con DEFAULT_PRODUCTS
    saveStoredProducts(DEFAULT_PRODUCTS);
    return [...DEFAULT_PRODUCTS];
}

function saveStoredProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
        console.error("Error al guardar productos en localStorage:", e);
        showToast("Error de almacenamiento local (almacenamiento lleno o deshabilitado)", "error");
    }
}

function resetProductsToDefault() {
    if (confirm("¿Está seguro de que desea restablecer todo el catálogo al menú original por defecto? Esta acción sobrescribirá sus cambios locales.")) {
        saveStoredProducts(DEFAULT_PRODUCTS);
        renderCatalog();
        renderAdminProductList();
        showToast("Catálogo restablecido al menú original", "success");
    }
}

// --- 2. GESTIÓN DE SESIÓN ADMINISTRATIVA ---
function isAdminLoggedIn() {
    return sessionStorage.getItem(STORAGE_KEYS.SESSION) === "true";
}

function loginAdmin(email, password) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && cleanPass === ADMIN_CREDENTIALS.pass) {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, "true");
        updateAdminUIState();
        closeLoginModal();
        openAdminModal();
        showToast("¡Bienvenido, Administrador!", "success");
        return true;
    } else {
        showToast("Correo o contraseña incorrectos", "error");
        return false;
    }
}

function logoutAdmin() {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    updateAdminUIState();
    closeAdminModal();
    renderCatalog();
    showToast("Sesión de administrador cerrada", "info");
}

function updateAdminUIState() {
    const isLogged = isAdminLoggedIn();
    const adminBar = document.getElementById("adminStatusBar");
    const navAdminLink = document.getElementById("navAdminLink");
    const footerAdminLink = document.getElementById("footerAdminLink");

    if (adminBar) {
        adminBar.style.display = isLogged ? "flex" : "none";
    }

    if (navAdminLink) {
        if (isLogged) {
            navAdminLink.innerHTML = '<i class="fas fa-tools"></i> Panel Admin';
            navAdminLink.classList.add("admin-active");
        } else {
            navAdminLink.innerHTML = '<i class="fas fa-lock"></i> Admin';
            navAdminLink.classList.remove("admin-active");
        }
    }

    if (footerAdminLink) {
        footerAdminLink.textContent = isLogged ? "⚙️ Administrar Productos (Activo)" : "🔒 Acceso Administrador";
    }

    renderCatalog();
}

// --- 3. RENDERIZADO DEL CATÁLOGO DINÁMICO ---
function formatPrice(price) {
    const num = Number(price) || 0;
    return `$${num.toLocaleString("es-CO")}`;
}

function renderCatalog() {
    const products = getStoredProducts();
    const isLogged = isAdminLoggedIn();

    const pizzasContainer = document.getElementById("pizzasContainer");
    const snacksContainer = document.getElementById("snacksContainer");
    const bebidasContainer = document.getElementById("bebidasContainer");

    if (!pizzasContainer || !snacksContainer || !bebidasContainer) return;

    pizzasContainer.innerHTML = "";
    snacksContainer.innerHTML = "";
    bebidasContainer.innerHTML = "";

    products.forEach(prod => {
        const isDrink = prod.category === "bebidas";
        const card = document.createElement("div");
        card.className = `product-card ${isDrink ? "drink-card" : ""} ${!prod.available ? "product-unavailable" : ""}`;
        card.dataset.id = prod.id;

        const badgeHtml = prod.badge 
            ? `<span class="product-badge">${escapeHtml(prod.badge)}</span>` 
            : (!prod.available ? '<span class="product-badge badge-soldout">Agotado</span>' : '');

        const adminButtonsHtml = isLogged ? `
            <div class="product-admin-actions">
                <button class="btn-admin-action btn-admin-edit" onclick="handleEditProductClick('${prod.id}')" title="Editar Producto">
                    <i class="fas fa-pen"></i> Editar
                </button>
                <button class="btn-admin-action btn-admin-toggle" onclick="handleToggleProductClick('${prod.id}')" title="${prod.available ? 'Pausar' : 'Activar'}">
                    <i class="fas ${prod.available ? 'fa-eye-slash' : 'fa-eye'}"></i>
                </button>
                <button class="btn-admin-action btn-admin-del" onclick="handleDeleteProductClick('${prod.id}')" title="Eliminar Producto">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="product-img-wrapper ${isDrink ? "drink-img-wrapper" : ""}">
                <img src="${escapeHtml(prod.image)}" alt="${escapeHtml(prod.name)}" class="product-img ${isDrink ? "drink-img" : ""}" onerror="this.src='imagen/pizza_artesanal.jpg'">
                ${badgeHtml}
            </div>
            <div class="product-info">
                <h4>${escapeHtml(prod.name)}</h4>
                <p>${escapeHtml(prod.description)}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(prod.price)}</span>
                    <button class="btn btn-primary btn-sm btn-order" onclick="selectProductForOrder('${escapeHtml(prod.name)}', ${prod.price})" ${!prod.available ? 'disabled' : ''}>
                        ${prod.available ? '<i class="fas fa-shopping-bag"></i> Pedir Ahora' : 'Agotado'}
                    </button>
                </div>
                ${adminButtonsHtml}
            </div>
        `;

        if (prod.category === "pizzas") {
            pizzasContainer.appendChild(card);
        } else if (prod.category === "snacks") {
            snacksContainer.appendChild(card);
        } else if (prod.category === "bebidas") {
            bebidasContainer.appendChild(card);
        } else {
            // Por defecto pizzas si no coincide
            pizzasContainer.appendChild(card);
        }
    });
}

// Acción al hacer clic en "Pedir Ahora": autocompletar detalle en formulario
function selectProductForOrder(productName, price) {
    const messageField = document.getElementById("message");
    const priceText = formatPrice(price);
    const itemText = `1x ${productName} (${priceText})`;

    if (messageField) {
        if (!messageField.value.trim()) {
            messageField.value = itemText;
        } else {
            messageField.value += `, ${itemText}`;
        }
    }

    // Scroll suave hacia el formulario de contacto
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }

    showToast(`¡Añadido "${productName}" al pedido!`, "info");
}

// --- 4. PANEL DE ADMINISTRACIÓN CRUD ---
function renderAdminProductList(filterQuery = "") {
    const listBody = document.getElementById("adminProductList");
    if (!listBody) return;

    const products = getStoredProducts();
    const query = filterQuery.toLowerCase().trim();

    const filtered = products.filter(p => {
        if (!query) return true;
        return p.name.toLowerCase().includes(query) || 
               p.category.toLowerCase().includes(query) ||
               (p.badge && p.badge.toLowerCase().includes(query));
    });

    listBody.innerHTML = "";

    if (filtered.length === 0) {
        listBody.innerHTML = `<tr><td colspan="6" class="text-center text-gray py-4">No se encontraron productos que coincidan.</td></tr>`;
        return;
    }

    filtered.forEach(prod => {
        const tr = document.createElement("tr");
        const categoryLabels = {
            pizzas: "Pizza",
            snacks: "Snack / Entrada",
            bebidas: "Bebida"
        };
        const catLabel = categoryLabels[prod.category] || prod.category;

        tr.innerHTML = `
            <td>
                <img src="${escapeHtml(prod.image)}" alt="${escapeHtml(prod.name)}" class="admin-table-thumb" onerror="this.src='imagen/pizza_artesanal.jpg'">
            </td>
            <td>
                <strong>${escapeHtml(prod.name)}</strong>
                ${prod.badge ? `<span class="admin-badge-tag">${escapeHtml(prod.badge)}</span>` : ''}
            </td>
            <td><span class="admin-category-pill">${escapeHtml(catLabel)}</span></td>
            <td><strong>${formatPrice(prod.price)}</strong></td>
            <td>
                <span class="status-indicator ${prod.available ? 'status-active' : 'status-inactive'}">
                    ${prod.available ? 'Disponible' : 'Pausado'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-icon-edit" onclick="handleEditProductClick('${prod.id}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-toggle" onclick="handleToggleProductClick('${prod.id}')" title="${prod.available ? 'Pausar' : 'Activar'}">
                        <i class="fas ${prod.available ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="btn-icon btn-icon-delete" onclick="handleDeleteProductClick('${prod.id}')" title="Eliminar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        `;
        listBody.appendChild(tr);
    });
}

function initImageSelector() {
    const selectEl = document.getElementById("productImageSelect");
    const previewImg = document.getElementById("productImagePreview");
    const customInput = document.getElementById("productImageCustom");

    if (!selectEl) return;

    selectEl.innerHTML = '<option value="">-- Seleccionar imagen de la pizzería --</option>';
    if (typeof AVAILABLE_IMAGES !== "undefined") {
        AVAILABLE_IMAGES.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.path;
            opt.textContent = item.label;
            selectEl.appendChild(opt);
        });
    }

    selectEl.addEventListener("change", () => {
        if (selectEl.value) {
            customInput.value = selectEl.value;
            if (previewImg) {
                previewImg.src = selectEl.value;
                previewImg.style.display = "block";
            }
        }
    });

    customInput.addEventListener("input", () => {
        if (previewImg && customInput.value) {
            previewImg.src = customInput.value;
            previewImg.style.display = "block";
        }
    });
}

function handleFileUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        // Límite de tamaño para evitar sobrecargar localStorage (1.5MB)
        if (file.size > 1.5 * 1024 * 1024) {
            alert("La imagen seleccionada supera 1.5 MB. Por favor elija una imagen más ligera o seleccione una de las imágenes existentes.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            document.getElementById("productImageCustom").value = dataUrl;
            const preview = document.getElementById("productImagePreview");
            if (preview) {
                preview.src = dataUrl;
                preview.style.display = "block";
            }
            showToast("Imagen cargada con éxito", "info");
        };
        reader.readAsDataURL(file);
    }
}

// Abrir formulario para crear nuevo producto
function openNewProductForm() {
    const form = document.getElementById("productForm");
    if (!form) return;

    form.reset();
    document.getElementById("productId").value = "";
    document.getElementById("formTitle").textContent = "Nuevo Producto";
    document.getElementById("productAvailable").checked = true;

    const preview = document.getElementById("productImagePreview");
    if (preview) {
        preview.src = "imagen/pizza_artesanal.jpg";
        preview.style.display = "block";
    }

    // Scroll hacia el formulario
    form.scrollIntoView({ behavior: "smooth" });
}

// Cargar producto existente para edición
function handleEditProductClick(productId) {
    if (!isAdminLoggedIn()) {
        openLoginModal();
        return;
    }

    openAdminModal();

    const products = getStoredProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    document.getElementById("productId").value = prod.id;
    document.getElementById("productName").value = prod.name;
    document.getElementById("productCategory").value = prod.category;
    document.getElementById("productPrice").value = prod.price;
    document.getElementById("productDescription").value = prod.description;
    document.getElementById("productBadge").value = prod.badge || "";
    document.getElementById("productImageCustom").value = prod.image;
    document.getElementById("productAvailable").checked = prod.available !== false;

    // Sincronizar select si existe
    const select = document.getElementById("productImageSelect");
    if (select) {
        select.value = prod.image || "";
    }

    const preview = document.getElementById("productImagePreview");
    if (preview) {
        preview.src = prod.image;
        preview.style.display = "block";
    }

    document.getElementById("formTitle").textContent = "Modificar Producto";
    
    // Enfocar el formulario
    document.getElementById("productForm").scrollIntoView({ behavior: "smooth" });
}

// Alternar disponibilidad rápida
function handleToggleProductClick(productId) {
    if (!isAdminLoggedIn()) {
        openLoginModal();
        return;
    }

    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index].available = !products[index].available;
        saveStoredProducts(products);
        renderCatalog();
        renderAdminProductList();
        showToast(`Producto "${products[index].name}" ${products[index].available ? 'disponible' : 'pausado'}`, "info");
    }
}

// Eliminar producto
function handleDeleteProductClick(productId) {
    if (!isAdminLoggedIn()) {
        openLoginModal();
        return;
    }

    const products = getStoredProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`¿Está seguro de eliminar "${prod.name}" del catálogo?`)) {
        const updated = products.filter(p => p.id !== productId);
        saveStoredProducts(updated);
        renderCatalog();
        renderAdminProductList();
        showToast(`Producto "${prod.name}" eliminado correctamente`, "success");
    }
}

// Guardar producto (Crear o Editar)
function handleProductFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = parseInt(document.getElementById("productPrice").value, 10);
    const description = document.getElementById("productDescription").value.trim();
    const badge = document.getElementById("productBadge").value.trim();
    let image = document.getElementById("productImageCustom").value.trim();
    const available = document.getElementById("productAvailable").checked;

    if (!image) {
        image = "imagen/pizza_artesanal.jpg";
    }

    if (!name || isNaN(price)) {
        showToast("Por favor complete el nombre y precio válido", "error");
        return;
    }

    const products = getStoredProducts();

    if (id) {
        // Modificar existente
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                category,
                price,
                description,
                badge,
                image,
                available
            };
            showToast(`Producto "${name}" actualizado exitosamente`, "success");
        }
    } else {
        // Crear nuevo
        const newProduct = {
            id: "prod-" + Date.now(),
            name,
            category,
            price,
            description,
            badge,
            image,
            available
        };
        products.push(newProduct);
        showToast(`Producto "${name}" creado exitosamente`, "success");
    }

    saveStoredProducts(products);
    renderCatalog();
    renderAdminProductList();
    openNewProductForm(); // Limpiar formulario
}

// Exportar datos actuales a archivo productos.js descargable o copiar al portapapeles
function exportProductsCode() {
    const products = getStoredProducts();
    const fileContent = `// Catálogo Actualizado de Productos - Delicious Pizza Tocaima\n// Exportado el: ${new Date().toLocaleString()}\nconst DEFAULT_PRODUCTS = ${JSON.stringify(products, null, 4)};\n\nconst AVAILABLE_IMAGES = ${JSON.stringify(AVAILABLE_IMAGES, null, 4)};\n`;

    // Crear descarga automática
    const blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "productos.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Descargando productos.js para subir al repositorio de GitHub", "success");
}

function copyProductsJson() {
    const products = getStoredProducts();
    const jsonStr = JSON.stringify(products, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
        showToast("JSON copiado al portapapeles con éxito", "success");
    }).catch(err => {
        console.error("Error al copiar al portapapeles:", err);
        showToast("No se pudo copiar automáticamente", "error");
    });
}

// --- 5. CONTROL DE MODALES ---
function openLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.add("modal-open");
        document.getElementById("loginEmail").focus();
    }
}

function closeLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.remove("modal-open");
    }
}

function openAdminModal() {
    if (!isAdminLoggedIn()) {
        openLoginModal();
        return;
    }
    const modal = document.getElementById("adminModal");
    if (modal) {
        modal.classList.add("modal-open");
        renderAdminProductList();
        openNewProductForm();
    }
}

function closeAdminModal() {
    const modal = document.getElementById("adminModal");
    if (modal) {
        modal.classList.remove("modal-open");
    }
}

// --- 6. TOAST NOTIFICACIONES FLOTANTES ---
function showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    const icons = {
        success: "fa-check-circle",
        error: "fa-exclamation-circle",
        info: "fa-info-circle"
    };
    const iconClass = icons[type] || "fa-bell";

    toast.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("toast-show");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Utilidad para escape de HTML
function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- 7. INICIALIZACIÓN GLOBAL ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar Catálogo
    renderCatalog();
    updateAdminUIState();

    // 2. Selectores de imágenes
    initImageSelector();

    // 3. Formulario de Login
    const loginForm = document.getElementById("adminLoginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const pass = document.getElementById("loginPass").value;
            loginAdmin(email, pass);
        });
    }

    // 4. Formulario de Productos (CRUD)
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", handleProductFormSubmit);
    }

    // 5. Filtro de búsqueda en el panel admin
    const adminSearch = document.getElementById("adminSearchInput");
    if (adminSearch) {
        adminSearch.addEventListener("input", (e) => {
            renderAdminProductList(e.target.value);
        });
    }

    // 6. Cierre de modales con clic fuera (overlay)
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("modal-open");
            }
        });
    });

    // 7. Cierre con tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLoginModal();
            closeAdminModal();
        }
    });
});
