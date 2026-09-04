# Usar servidor web ultraligero Nginx alpine
FROM nginx:alpine

# Copiar archivos estáticos al directorio público de Nginx
COPY . /usr/share/nginx/html

# Copiar configuración personalizable de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar servidor web
CMD ["nginx", "-g", "daemon off;"]
