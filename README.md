# PopupJs ![GitHub license](https://img.shields.io/github/license/ZayBit/PopupJs) ![](https://img.shields.io/badge/size-50.4%20kB-yellowgreen)

## Incluyendo archivos:
```html
    <head>
        <link rel="stylesheet" type="text/css" href="./dist/styles/popup.css" />
    </head>
    <body>
        <script src="./dist/js/popup.js"></script>
    </body>
```
Para utilizar el projecto solo haria falta crear un nuevo objeto
llamado **Popup** seguido de definir la clase del elemento y una direccion
> El tiempo 
``` js
    Popup('.popup', {
      direction: 'center'
    })
```
## Direcciones:
* **topLeft**
* **topRight**
* **center**
* **midLeft**
* **midRight**
* **topCenter**
* **bottomLeft**
* **bottomRight**
* **bottomCenter**

Una vez definida una direccion ya estaria pero de igual manera existen mas opciones como la **transición** del elemento o oscurecer el fondo con **lightbox** entre otras opciones

---
# Opciones basicas :page_with_curl:
| Tipo     | Nombre   | Descripcion |
| :---     |  :--     |    :---    |
| **string**   | **btnOpen**  | Boton de apertura del mensaje emergente. **si no se asigna un boton se abrira automaticamente**  
| **string**    | **btnClose** | Boton para cerrar el mensaje emergente. por defecto **.btn-close** 
| **boolean**    | **closeBtnDisable** | Inhabilitar el boton de cerrar **.btn-close** 
| **boolean**  | **fadeEffect** | Activar o Desactivar el efecto de desvanecimiento. por defecto **true** 
|**boolean**|**destroy**|'destroy' para eliminar el mensaje emergente una vez cerrado. por defecto **false**|
| **boolean**  | **lightbox** |  Activar o Desactivar el efecto lightbox (fondo oscuro). por defecto **false** 
| **number**  | **lightboxTransition** |  transición de lightbox. por defecto **600** 
| **string**  | **direction** | Direccion de donde surgira el mensaje emergente. **Es necesario asignar una direccion** 
| **number**  | **transition** | transición de el mensaje emergente. por defecto **600** 
---
# Opciones adicionales :scroll:
  > ### **Slideshow**

  | Tipo     | Nombre   | Descripcion |
  | :---     |  :--     |    :---   |
  | string |mainSlideshow|Clase del contenedor principal. por defecto **.slideshow**|
  | string |slideShowContent|Clase del contenedor de los elementos. por defecto **.slides-container**|
  | number |slide_transition|transición al cambiar de una a otra. por defecto **600**|
  | boolean |autoPlay|Cambiar automaticamente de una a otra. por defecto **false**|
  | boolean |infinite|Cambio continuo e interminable. por defecto **false**|
  | string |classBtnNext|Boton de siguiente. por defecto **.btn-next**|
  | string |classBtnPrev|Boton de atras. por defecto **.btn-prev**|
  ### HTML estructura basica
  ```html
        <div class="popup">
            <div class="slideshow">
                <div class="slides-container">
                    <div>
                        <h1>Title #1</h1>
                    </div>
                    <div>
                        <h1>Title #2</h1>
                    </div>
                </div>
                <button class="btn-prev">Prev</button>
                <button class="btn-next">Next</button>
            </div>
        </div>
```
  ### JS
  > Tan solo con utilizar slideConfig vacio utilizara todos los valores por defecto.
```js
    Popup('.popup', {
        direction:'midRight',
        slideConfig:{}
    })
```
---
  > ### **Asignar una posicion personalizada**.

  > :heavy_exclamation_mark: Ya no seria necesaria la direccion antes creada, solo la direccion dentro de moveTo

  | Tipo     | Nombre   | Descripcion |
  | :---     |  :--     |    :---   |
  |number|x|Posicion en horizontal en pixeles, 1 = 1px . por defecto 0|
  |number|y|Posicion en vertical en pixeles, 1 = 1px . por defecto 0|
  |string|direction|La direccion de donde saldra el mensaje emergente|
  ## Direcciones:
  * **left**
  * **right**
  * **top**
  * **bottom**
```js
    Popup('.popup', {
        moveTo: {
        x: 50
        y: 10
        direction: 'left'
    }})
```

  > ### **Establecer tiempo**
  
   si se requiere cerrar el mensaje emergente en determinado tiempo o deshabilitar el boton de cierre por cierto tiempo.
  
  | Tipo     | Nombre   | Descripcion |
  | :---     |  :--     |    :---   |
  | number | time |Tiempo en el que la accion se realizara|
  |string|action|Accion que se realizara una vez el tiempo termine|
  |string|progressBar|Mostrar una barra progresiva llamando un elemento por su clase|
  ## Acciones:
  * **close**
  * **activeBtn**
```js
   optionsTime: {
        time: 600
        action: 'close',
        progressBar:'.progress_bar'
    }
```