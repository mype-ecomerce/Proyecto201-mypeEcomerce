# Proyecto201-mypeEcomerce

## Integrantes

- Matias Carrillo
- Yulber Espinoza
- Vladimir Jauregui

## Descripción del proyecto

 Ofrecemos es una página web de ventas que opera 24/7, eliminando costos de personal, alquiler y mantenimiento de inventario.

## Wireframe

 ![image](https://github.com/user-attachments/assets/013958a2-2762-4b4c-b04a-10d7290326e3)

## Historias de usuario
### 1
Título: Página de Presentación de la Tienda

Historia de Usuario: Como visitante, quiero poder ver una página de presentación de la tienda para conocer más sobre la tienda de ropa y su historia.

Tareas de Funcionalidad:

Diseñar y desarrollar la página de presentación con información sobre la tienda.

Incluir imágenes de alta calidad de la tienda y sus productos.

Implementar enlaces de navegación a otras secciones del sitio web.

Pruebas de Aceptación:

Los enlaces de navegación deben funcionar correctamente.

### 2
Título: Visualización del Catálogo de Prendas

Historia de Usuario: Como usuario, quiero ver un catálogo con las diferentes prendas disponibles y sus precios para poder explorar las opciones de ropa.

Tareas de Funcionalidad:

Crear una página de catálogo con todas las prendas disponibles.

Mostrar imágenes, nombres, descripciones y precios

Implementar un sistema de filtrado por tipo de prenda (e.g., camisas, pantalones, vestidos).

Pruebas de Aceptación:

Todas las prendas deben aparecer en el catálogo con la información correcta.

El sistema de filtrado debe funcionar correctamente, mostrando solo las prendas del tipo seleccionado.

### 3

Título: Añadir Prendas al Carrito de Compras

Historia de Usuario: Como usuario, quiero poder añadir prendas al carrito de compras para poder comprarlas más tarde.

Tareas de Funcionalidad:

Implementar un botón "Añadir al Carrito" en cada prenda del catálogo.

Crear una página de carrito de compras donde se muestren todas las prendas añadidas.

Mostrar el nombre, imagen, precio y cantidad de cada prenda en el carrito.

Pruebas de Aceptación:

El usuario debe poder añadir prendas al carrito desde la página del catálogo.

Las prendas añadidas deben aparecer correctamente en la página del carrito.

El usuario debe poder ajustar la cantidad de cada prenda en el carrito.*

### 4

Título: Visualización del Total en el Carrito de Compras

Historia de Usuario: Como usuario, quiero ver el costo total de todas las prendas en mi carrito de compras para saber cuánto gastaré.

Tareas de Funcionalidad:

Implementar la funcionalidad para calcular el costo total de las prendas en el carrito.

Mostrar el costo total en la página del carrito.

Actualizar el costo total en tiempo real cuando se añadan o eliminen prendas del carrito.

Pruebas de Aceptación:

El costo total debe calcularse y mostrarse correctamente.

El total debe actualizarse en tiempo real cuando el usuario añada o elimine prendas del carrito.

El costo total debe reflejar con precisión el precio y la cantidad de las prendas en el carrito.

## Modelo de Dominio

### Objeto constructor

- Nombre
- Precio
- Img
- .Prototype
    1. - Event listener
    document.getElementbyID(Nombre)
    Añadir el objeto al carrito (Stringify)

### Funciones "Catalogo"

- Crear()
- Renderizar()

### Funciones "Carrito"

- Listadido(), Listaria los objetos con un (parse)
- SumaTotal()
