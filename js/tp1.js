"use strict";

// 2) rectángulo dibujado desde el contexto

let canvas2 = document.getElementById("Canvas2");
let ctx2 = canvas2.getContext("2d");
ctx2.fillStyle = "#FF0000";
ctx2.fillRect(0,0,400,200);

// 3) rectángulo dibujado con imageData

let canvas3 = document.getElementById("Canvas3");
let ctx3 = canvas3.getContext("2d");
let width = canvas3.width;
let height = canvas3.height;
let imageData3 = ctx3.createImageData(width,height);

let r = 255;        
let g = 0;
let b = 255;
let a = 255; 
let x = 0;
let y = 0;

function drawRect(imageData,r,g,b,a){       // toma la matriz del contexto y setea cada pixel con el color
     for (let x = 0; x < width; x++)
          for (let y = 0; y < height; y++)
               setPixel(imageData, x, y, r, g, b, a);
       
   }

function setPixel(imageData,x,y,r,g,b,a){       //Setea un pixel teniendo en cuenta que son 4 index por cada color (rgba)

        let index = (x+ y * imageData.width)*4;
        imageData.data[index+0]= r;
        imageData.data[index+1]= g;
        imageData.data[index+2]= b;
        imageData.data[index+3]= a;
}
    
drawRect(imageData3,r,g,b,a);    //llama a la función draw rect
ctx3.putImageData(imageData3,0,0);  //dibuja la imagen en el contexto3

//4) pintar un cuadrado utilizando un gradiente

let canvas4 = document.getElementById("Canvas4");
let ctx4 = canvas4.getContext("2d");
let width4 = canvas4.width;
let height4 = canvas4.height;
let imageData4 = ctx4.createImageData(width4,height4);

function drawRectGrad(){
    let color;
        for (let x = 0; x < width4; x++){
          for (let y = 0; y < height4; y++){
             color = y * 255/ (height4 -1);     //va del 0 (negro) al 255  (blanco) sobre las y
              setPixel(imageData4, x, y ,color, color, color, a);
              
          }
        }
      
    }

drawRectGrad();
ctx4.putImageData(imageData4,0,0);

//otro

let canvas4A = document.getElementById("Canvas4A");
let ctx4A = canvas4A.getContext("2d");
let width4A = canvas4A.width;
let height4A = canvas4A.height;
let imageData4A = ctx4A.createImageData(width4A,height4A);

function drawRectGrad2(){
    let coeficiente = 255 / width4A; //para que no se pase del ancho del canva, el tope de color va a estar en el 300
     
       for (let x = 0; x < width4A; x++){
           r = 255-coeficiente *x;
           g = 100-coeficiente *x;
           b = coeficiente *x;
           a = 255;
          for (let y = 0; y < height4A; y++){
                                                     
              setPixel(imageData4A, x, y ,r, g, b, a);
              
          }
        }
}

drawRectGrad2();
ctx4A.putImageData(imageData4A,0,0);

//5) Gradiante a la mitad con tres colores: negro a amarillo - amarillo a rojo

let canvas5 = document.getElementById("Canvas5");
let ctx5 = canvas5.getContext("2d");
let width5 = canvas5.width;
let height5 = canvas5.height;
let imageData5 = ctx5.createImageData(width5,height5);

function drawRectGrad3(){
     
    let mitad =  width5/2;
    let coeficiente = 255 / mitad;
  
    
    for (let x = 0; x < mitad; x++){
          for (let y = 0; y < height5; y++){
            r = coeficiente *x;
            g = coeficiente *x;
            b = 0;
            a = 255;                                       
              setPixel(imageData5, x, y ,r, g, b, a);
              
          }
        }
       
    for (let x = mitad; x < width5; x++){
            for (let y = 0; y < height5; y++){
              r = coeficiente *x;           // a 255
              g = coeficiente *(width5-x);              // ancho total - x para que vaya restando
              b = 0;
              a = 255;                                       
                setPixel(imageData5, x, y ,r, g, b, a);
                
            }
    }
}
drawRectGrad3();
ctx5.putImageData(imageData5,0,0);

//6) Gradiante a la mitad con tres colores: armonías tonales

let canvas6 = document.getElementById("Canvas6");
let ctx6 = canvas6.getContext("2d");
let width6 = canvas6.width;
let height6 = canvas6.height;
let imageData6 = ctx6.createImageData(width6,height6);

function drawRectGrad4(){
     
    let mitad =  width6/2;
    let coeficiente = 255 / mitad;
        
    for (let x = 0; x < mitad; x++){
          for (let y = 0; y < height6; y++){
            r = coeficiente *x;                                  //verde-> 0,255,0 al rojo -> 255,0,0
            g = coeficiente *(mitad-x);
            b = 0;
            a = 255;                                       
              setPixel(imageData6, x, y ,r, g, b, a);
              
          }
        }
       
    for (let x = mitad; x < width6; x++){
            for (let y = 0; y < height6; y++){
              r = coeficiente *(width6-x);           
              g = 0;                             // del rojo -> 255,0,0 al azul-> 0,0,255
              b = coeficiente *(x-mitad);
              a = 255;                                       
                setPixel(imageData6, x, y ,r, g, b, a);
                
            }
    }
}
drawRectGrad4();
ctx6.putImageData(imageData6,0,0);

// 7) Cargar una Imagen desde disco o URL, funcion de filtro de escala de grises

let btn=document.getElementById("addImage");
btn.addEventListener("change",addImage);            //se activa cuando termina de subir el archivo
let canvas7 = document.getElementById("Canvas7");
let ctx7 = canvas7.getContext("2d");
let width7 = canvas7.width;
let height7 = canvas7.height;
let imageData7 = ctx7.createImageData(width7,height7);

function addImage(e){
    let urlImagen = e.target.files[0];
    let reader = new FileReader();
    let image = new Image();
    image.title = urlImagen.name;
    reader.onload = function (event) {
      image.src = event.target.result;
      image.onload = function () {

        let imgWidth = image.width;
        let imgHeight = image.height;
        if(width7 < imgWidth)
            imgWidth = width7;

        if (height7<imgHeight)
            imgHeight = height7;
        
        ctx7.drawImage(image, 0, 0, imgWidth, imgHeight);
        
      };
    };
    reader.readAsDataURL(urlImagen);
    
}

// filreo escala de grises


let btn2 = document.getElementById("btnGrey");
btn2.addEventListener("click",greyScale);


function greyScale(){
    imageData7 = ctx7.getImageData(0, 0, width, height);  //trae lo que se encuentra en Imagedata

    let grey;
    for (let x = 0; x < width7; x++) {
        for (let y = 0; y < height7; y++) {
          r = getRed(imageData7, x, y);
          g = getGreen(imageData7, x, y);
          b = getBlue(imageData7, x, y);
          grey = generateAverageGray(r, g, b);
          setPixel(imageData7, x, y, grey, grey, grey, a);
        }
      }
      ctx7.putImageData(imageData7, 0, 0);
}

function getRed(image, x, y) {      //devuelve el valor en rojo
    let index = (x + y * image.width) * 4;
    return image.data[index];
  }
  function getGreen(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index + 1];       //devuelve el valor en verde
  }
  function getBlue(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index + 2];       //devuelve el valor en blue
  }
  
  function generateAverageGray(r, g, b) {
    return (r + g + b) / 3;     //para llevarlo a gris los tres valores deben ser iguales
   
  }