# Sitio Web Responsivo - Paleta Azul, Blanco & Negro

Este proyecto contiene el código completo para tu página web con un diseño visual moderno en **Azul, Blanco y Negro**, junto con las configuraciones necesarias para realizar el **despliegue (deployment)** en las principales plataformas de alojamiento web.

---

## 🎨 Código para Cambiar el Color de Letra y Fondo

El sitio utiliza **Variables Nativas de CSS** (`:root`) dentro del archivo [`styles.css`](styles.css). Puedes modificar o ajustar los colores de fondo y texto desde allí.

### 1. Variables CSS de Color (`styles.css`)

```css
:root {
    /* --- COLORES DE FONDO (BACKGROUNDS) --- */
    --color-fondo-blanco: #ffffff;      /* Fondo Blanco Principal */
    --color-fondo-negro: #0a0a0c;       /* Fondo Negro Principal */
    --color-fondo-negro-card: #121824;  /* Fondo Tarjetas Oscuras */
    --color-fondo-gris-claro: #f8fafc;  /* Fondo Secundario */

    /* --- COLORES DE AZUL (BLUE ACCENTS) --- */
    --color-azul-principal: #2563eb;   /* Azul Real / Primario */
    --color-azul-brillante: #3b82f6;   /* Azul Brillante para Hovers */

    /* --- COLORES DE LETRA (TEXT COLORS) --- */
    --color-texto-negro: #000000;      /* Letra Negra (en fondos claros) */
    --color-texto-blanco: #ffffff;     /* Letra Blanca (en fondos oscuros) */
    --color-texto-gris: #94a3b8;      /* Letra Gris Suave */
}
```

### 2. Ejemplo de Uso de Clases CSS Rápidas

| Tipo | Clase CSS | Ejemplo de Aplicación | Resultado |
| :--- | :--- | :--- | :--- |
| **Color de Letra** | `.text-black` | `<p class="text-black">Texto en Negro</p>` | Texto color **#000000** |
| **Color de Letra** | `.text-white` | `<p class="text-white">Texto en Blanco</p>` | Texto color **#FFFFFF** |
| **Color de Letra** | `.text-blue` | `<p class="text-blue">Texto en Azul</p>` | Texto color **#2563EB** |
| **Color de Fondo** | `.bg-black` | `<div class="bg-black">...</div>` | Fondo **Negro** con letra **Blanca** |
| **Color de Fondo** | `.bg-white` | `<div class="bg-white">...</div>` | Fondo **Blanco** con letra **Negra** |
| **Color de Fondo** | `.bg-blue` | `<div class="bg-blue">...</div>` | Fondo **Azul** con letra **Blanca** |

---

## 🚀 Código e Instrucciones para el Despliegue (Deployment)

El proyecto incluye archivos listos para desplegar en 4 plataformas diferentes:

### Opción 1: Despliegue en Vercel (Recomendado - Gratuito)
1. Instala la herramienta de Vercel (opcional) o conecta tu repositorio de GitHub en [vercel.com](https://vercel.com).
2. Si usas la consola de comandos, ejecuta:
   ```bash
   npx vercel
   ```
3. Vercel detectará automáticamente el archivo [`vercel.json`](vercel.json) y desplegará tu sitio web en segundos.

---

### Opción 2: Despliegue en Netlify (Gratuito)
1. Ve a [netlify.com](https://www.netlify.com/) y arrastra la carpeta completa `PAGINA WEB` a la consola de Netlify, o conecta tu repositorio de GitHub.
2. Netlify utilizará automáticamente las reglas del archivo [`netlify.toml`](netlify.toml).

---

### Opción 3: Despliegue en GitHub Pages (Gratuito)
1. Sube tu proyecto a un repositorio de GitHub (rama `main`).
2. Ve a **Settings > Pages** en tu repositorio de GitHub.
3. En **Source**, selecciona **GitHub Actions**. El workflow automatizado [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compilará y publicará tu sitio automáticamente en cada `git push`.

---

### Opción 4: Despliegue con Docker / Servidor VPS
Si deseas publicar en tu propio servidor VPS o contenedor Docker:
1. Construye la imagen de Docker usando el [`Dockerfile`](Dockerfile):
   ```bash
   docker build -t mi-pagina-web .
   ```
2. Ejecuta el contenedor exponiendo el puerto 80:
   ```bash
   docker run -d -p 80:80 mi-pagina-web
   ```

---

## 💻 Vista Previa Local (Desarrollo)
Para probar la página en tu máquina antes de subirla a internet:
```bash
npm start
```
O simplemente abre el archivo [`index.html`](index.html) haciendo doble clic sobre él en tu navegador web.
