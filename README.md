# primerthemetienda
## Inicio y catálogo

Estas secciones usan clases descriptivas y un bloque `<style>` en el mismo archivo. Los colores se escriben directamente en CSS; los ajustes del editor se limitan al contenido.

| Sección | Archivo | Ajustes |
| --- | --- | --- |
| Banner de inicio | `sections/home-banner.liquid` | Imagen o video, textos, enlace y detalles |
| Promoción | `sections/home-promotion.liquid` | Textos y enlace |
| Productos destacados | `sections/product-list.liquid` | Título, colección y cantidad |
| Encabezado de colección | `sections/collection-header.liquid` | Título opcional y descripción visible |
| Catálogo | `sections/main-collection.liquid` | Filtros visibles y productos por página |
| Lista de colecciones | `sections/main-collection-list.liquid` | Título |

Las tarjetas se generan en `snippets/catalog-card.liquid`. Sus estilos están dentro de `product-list.liquid` y `main-collection.liquid`; al cambiar su diseño, actualiza ambos bloques `<style>`.

El catálogo usa formularios GET para filtrar y ordenar, y enlaces de paginación. El botón de un producto sin opciones usa el formulario de producto de Shopify y navega al carrito. Los productos con variantes o planes de compra llevan a la ficha para elegir opciones. No necesita los bloques configurables de tarjetas del tema original.

Los textos de interfaz están en español, incluido el archivo de idioma predeterminado usado por la tienda actual. `snippets/menu-label.liquid` traduce nombres estándar como Home, Catalog y Contact sin modificar los enlaces. Los nombres y descripciones de productos, colecciones y páginas personalizados deben traducirse en el administrador de Shopify.

La ficha de producto, el carrito y la estructura del encabezado y pie conservan sus componentes originales. Los listados de productos que aparecen en carrito y página 404 también usan la sección compartida simplificada.
