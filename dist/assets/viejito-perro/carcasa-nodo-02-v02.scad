/*
  Viejito-Perro · Nodo 02 · carcasa v0.2
  Revision orientada a impresion sin soportes.
  Unidades: mm.

  piezas: ensamble, cuerpo_frontal, cuerpo_trasero, tapa,
  puerta_izquierda, puerta_derecha, bisagra_marco, bisagra_puerta,
  bandeja, soporte_botones, tirador, inserto_usb, volumenes, despiece.
*/

pieza = "ensamble";
$fn = 40;

// Envolvente: se conserva la identidad de v0.1
ancho = 190;
fondo = 120;
alto = 104;
radio = 14;
pared = 3;
piso = 3;
espesor_tapa = 4;
corte_y = 60;

// Tolerancias de partida para FDM; calibrar con la impresora real
holgura_encaje = 0.35;
holgura_deslizante = 0.45;
holgura_puerta = 0.6;
filamento_eje_d = 1.75;
agujero_eje_d = 2.10;
separacion_bisagra = 0.45;

// E-ink Waveshare 2.9 inch
epd_placa = [89.5,38,4.5];
epd_visible = [68.5,30.5];
epd_centro = [73,65];

// Dos pulsadores tactiles 12 x 12 x 7.3 mm
pulsador = [12,12,7.3];
pulsador_holgura = 0.35;
// La pareja queda centrada sobre la rejilla del SPS30 (x=139..176).
pulsador_centros = [[148.5,68],[166.5,68]];

// LED: azul, rojo, amarillo, blanco
led_d = 5.4;
led_centros_x = [48,64,80,96];
led_z = 25;

// Sensores y bandeja
sps = [41.6,41.6,12.6];
sps_origen = [139,49,17];
bme = [4,16,12];
bme_origen = [pared+2,76,55];
bandeja = [118,85,2.4];
bandeja_origen = [15,14,piso+6];

// Puertas traseras
puerta_total_ancho = 176;
puerta_alto = 74;
puerta_espesor = 3;
puerta_x = (ancho-puerta_total_ancho)/2;
puerta_z = 20;
junta_puertas = 1;
hoja_ancho = (puerta_total_ancho-junta_puertas)/2;

// USB reemplazable
usb_abertura = [14,9];
usb_marco = [26,15,2.5]; // ancho, alto, profundidad
usb_centro = [ancho/2,8.5];
usb_holgura = 0.35;

// Bisagras independientes en dos piezas; se pegan dentro de alojamientos
bisagra_largo = 54;
bisagra_placa_ancho = 11;
bisagra_placa_espesor = 3;
bisagra_barril_d = 6;
bisagra_llave = [7,1.5,8];
bisagra_eje_y = fondo + 3.2;
bisagra_z = puerta_z + (puerta_alto-bisagra_largo)/2;
bisagra_nudillo_extremo = 13;
bisagra_nudillo_central = bisagra_largo
                          - 2*bisagra_nudillo_extremo
                          - 2*separacion_bisagra;

// Tiradores de gabinete; imprimir dos unidades
tirador_cabeza_d = 12;
tirador_cuello_d = 7;
tirador_largo = 8;
tirador_inserto_d = 4.6;
tirador_inserto_prof = 5;

module rect_redondeado_2d(x,y,r) {
  translate([r,r]) offset(r=r) square([x-2*r,y-2*r]);
}

module caja_redondeada(x,y,z,r) {
  linear_extrude(height=z) rect_redondeado_2d(x,y,r);
}

module cilindro_y(d,h) {
  rotate([-90,0,0]) cylinder(d=d,h=h);
}

module tirador() {
  difference() {
    union() {
      cylinder(d1=tirador_cuello_d,d2=tirador_cabeza_d,h=tirador_largo-3);
      translate([0,0,tirador_largo-3]) cylinder(d=tirador_cabeza_d,h=3);
    }
    translate([0,0,-.1])
      cylinder(d=tirador_inserto_d,h=tirador_inserto_prof+.1);
  }
}

module cuerpo_base_sin_accesorios() {
  difference() {
    caja_redondeada(ancho,fondo,alto-espesor_tapa,radio);
    translate([pared,pared,piso])
      caja_redondeada(ancho-2*pared,fondo-2*pared,alto-piso,max(2,radio-pared));

    // Frente
    translate([epd_centro[0]-epd_visible[0]/2,-1,
               epd_centro[1]-epd_visible[1]/2])
      cube([epd_visible[0],pared+2,epd_visible[1]]);
    translate([epd_centro[0]-epd_placa[0]/2,pared-1,
               epd_centro[1]-epd_placa[1]/2])
      cube([epd_placa[0],epd_placa[2]+1,epd_placa[1]]);
    for (c=pulsador_centros)
      translate([c[0]-(pulsador[0]+2*pulsador_holgura)/2,-1,
                 c[1]-(pulsador[1]+2*pulsador_holgura)/2])
        cube([pulsador[0]+2*pulsador_holgura,pared+2,
              pulsador[1]+2*pulsador_holgura]);
    for (x=led_centros_x)
      translate([x,-1,led_z]) cilindro_y(led_d,pared+2);
    for (z=[20:8:44])
      translate([139,-1,z]) cube([37,pared+2,3]);

    // Vano posterior y USB en zocalo fijo
    translate([puerta_x+3,fondo-pared-1,puerta_z+3])
      cube([puerta_total_ancho-6,pared+2,puerta_alto-6]);
    translate([usb_centro[0]-usb_marco[0]/2-usb_holgura,
               fondo-pared-1,
               usb_centro[1]-usb_marco[1]/2-usb_holgura])
      cube([usb_marco[0]+2*usb_holgura,pared+2,
            usb_marco[1]+2*usb_holgura]);

    // Aire del BME280
    for (y=[78:5:88],z=[57:5:67])
      translate([-1,y,z]) rotate([0,90,0]) cylinder(d=2,h=pared+2);

    // Alojamientos de las llaves de las bisagras independientes en el marco.
    for (x=[1.5,ancho-1.5-bisagra_llave[0]],
         z=[bisagra_z+6,bisagra_z+bisagra_largo-14])
      translate([x,fondo-bisagra_llave[1],z])
        cube([bisagra_llave[0],bisagra_llave[1]+.1,bisagra_llave[2]]);
  }
}

module postes_tapa() {
  for (p=[[13,13],[ancho-13,13],[13,fondo-13],[ancho-13,fondo-13]])
    translate([p[0],p[1],piso-.5])
      difference() {
        cylinder(d=8,h=alto-piso-espesor_tapa-holgura_encaje+.5);
        translate([0,0,alto-piso-espesor_tapa-6-holgura_encaje+.5])
          cylinder(d=4.6,h=6.2);
      }
}

module guias_y_retencion() {
  largo=98;
  for (x=[bandeja_origen[0]-2,bandeja_origen[0]+bandeja[0]-3]) {
    translate([x,bandeja_origen[1]-2,piso-.5])
      cube([5,largo,bandeja_origen[2]-(piso-.5)]);
    translate([x,bandeja_origen[1]-2,
               bandeja_origen[2]+bandeja[2]+holgura_deslizante])
      cube([5,largo,2]);
    // Costilla exterior que une apoyo y labio; evita piezas flotantes.
    translate([x,bandeja_origen[1]-2,piso-.5])
      cube([2,largo,bandeja_origen[2]+bandeja[2]+holgura_deslizante+2-(piso-.5)]);
  }
  translate([bandeja_origen[0],bandeja_origen[1]-2,bandeja_origen[2]])
    cube([bandeja[0],2,5]);
  translate([bandeja_origen[0]+bandeja[0]/2,
             bandeja_origen[1]+bandeja[1]-7,piso])
    difference() {
      cylinder(d=8,h=bandeja_origen[2]-piso);
      translate([0,0,-.1]) cylinder(d=2.7,h=bandeja_origen[2]-piso+.2);
    }
}

module soportes_bme() {
  for (y=[bme_origen[1]+2,bme_origen[1]+bme[1]-2])
    translate([pared-.5,y,bme_origen[2]+bme[2]/2])
      rotate([0,90,0]) cylinder(d=4,h=3.5);
}

module lenguetas_cierre() {
  for (x=[puerta_x+hoja_ancho-14,
          puerta_x+hoja_ancho+junta_puertas+14])
    difference() {
      translate([x-5,fondo-7,puerta_z+puerta_alto-15])
        cube([10,7,alto-espesor_tapa-(puerta_z+puerta_alto-15)]);
      translate([x,fondo-2.2,puerta_z+puerta_alto-11])
        cilindro_y(6.2,2.3);
    }
}

module cuerpo_completo() {
  union() {
    cuerpo_base_sin_accesorios();
    postes_tapa();
    guias_y_retencion();
    soportes_bme();
    lenguetas_cierre();
  }
}

// Collar interior: alinea ambas mitades sin modificar la silueta exterior.
module collar_union() {
  largo=6;
  e=1.6;
  x0=pared+holgura_encaje;
  x1=ancho-pared-holgura_encaje;
  translate([x0,corte_y,e+piso]) cube([e,largo,alto-espesor_tapa-piso-2*e]);
  translate([x1-e,corte_y,e+piso]) cube([e,largo,alto-espesor_tapa-piso-2*e]);
  translate([x0,corte_y,piso+holgura_encaje]) cube([x1-x0,largo,e]);
}

module pines_union() {
  // Centros próximos a las paredes para que cada pin quede estructuralmente unido.
  for (x=[4.5,ancho-4.5],z=[26,76])
    translate([x,corte_y,z]) cilindro_y(4,6);
}

module receptores_union() {
  difference() {
    union()
      for (x=[4.5,ancho-4.5],z=[26,76])
        // 0.6 mm de solape evita una union meramente coplanar con el cuerpo.
        translate([x,corte_y-.6,z]) cilindro_y(8,8.6);
    for (x=[4.5,ancho-4.5],z=[26,76])
      translate([x,corte_y-.7,z])
        cilindro_y(4+2*holgura_encaje,8.8);
  }
}

module cuerpo_frontal() {
  union() {
    intersection() {
      cuerpo_completo();
      translate([-2,-2,-2]) cube([ancho+4,corte_y+2,alto+4]);
    }
    collar_union();
    pines_union();
  }
}

module cuerpo_trasero() {
  union() {
    intersection() {
      cuerpo_completo();
      translate([-2,corte_y,-2]) cube([ancho+4,fondo-corte_y+8,alto+4]);
    }
    receptores_union();
  }
}

module tapa() {
  difference() {
    caja_redondeada(ancho,fondo,espesor_tapa,radio);
    translate([89,22,-1]) cube([12,8,espesor_tapa+2]);
    // Rejilla circular del INMP441
    for (dx=[-9:6:9],dy=[-9:6:9])
      if (dx*dx+dy*dy<=170)
        translate([38+dx,35+dy,-1]) cylinder(d=2,h=espesor_tapa+2);
    for (p=[[13,13],[ancho-13,13],[13,fondo-13],[ancho-13,fondo-13]])
      translate([p[0],p[1],-1]) cylinder(d=3.4,h=espesor_tapa+2);
  }
}

module puerta_izquierda() {
  difference() {
    union() {
      cube([hoja_ancho,puerta_espesor,puerta_alto]);
      // Solape interior sobre la junta central
      translate([hoja_ancho-2,-1.5,3]) cube([7,1.5,puerta_alto-6]);
    }
    translate([hoja_ancho-14,-.1,puerta_alto-11]) cilindro_y(6.2,2.2);
    translate([hoja_ancho-14,-1,37]) cilindro_y(3.4,puerta_espesor+2);
    // Dos alojamientos poco profundos para las llaves de bisagra
    for (z=[bisagra_z-puerta_z+6,
            bisagra_z-puerta_z+bisagra_largo-14])
      translate([5,puerta_espesor-bisagra_llave[1],z])
        cube([bisagra_llave[0]+.2,bisagra_llave[1]+.1,bisagra_llave[2]]);
  }
}

module puerta_derecha() {
  difference() {
    cube([hoja_ancho,puerta_espesor,puerta_alto]);
    translate([14,-.1,puerta_alto-11]) cilindro_y(6.2,2.2);
    translate([14,-1,37]) cilindro_y(3.4,puerta_espesor+2);
    for (z=[bisagra_z-puerta_z+6,
            bisagra_z-puerta_z+bisagra_largo-14])
      translate([hoja_ancho-12.2,
                 puerta_espesor-bisagra_llave[1],z])
        cube([bisagra_llave[0]+.2,bisagra_llave[1]+.1,bisagra_llave[2]]);
  }
}

// Hojas de bisagra universales. El agujero se resta DESPUES de unir placa y
// barriles, evitando la obstruccion detectada en v0.1.
module bisagra_marco() {
  difference() {
    union() {
      cube([bisagra_placa_ancho,bisagra_placa_espesor,bisagra_largo]);
      for (z=[0,bisagra_largo-bisagra_nudillo_extremo])
        translate([0,bisagra_placa_espesor,z])
          cylinder(d=bisagra_barril_d,
                   h=bisagra_nudillo_extremo);
      translate([2,-bisagra_llave[1],6]) cube(bisagra_llave);
      translate([2,-bisagra_llave[1],bisagra_largo-14]) cube(bisagra_llave);
    }
    translate([0,bisagra_placa_espesor,-.1])
      cylinder(d=agujero_eje_d,h=bisagra_largo+.2);
  }
}

module bisagra_puerta() {
  difference() {
    union() {
      cube([bisagra_placa_ancho,bisagra_placa_espesor,bisagra_largo]);
      translate([0,bisagra_placa_espesor,
                 bisagra_nudillo_extremo+separacion_bisagra])
        cylinder(d=bisagra_barril_d,
                 h=bisagra_nudillo_central);
      translate([2,-bisagra_llave[1],6]) cube(bisagra_llave);
      translate([2,-bisagra_llave[1],bisagra_largo-14]) cube(bisagra_llave);
    }
    translate([0,bisagra_placa_espesor,-.1])
      cylinder(d=agujero_eje_d,h=bisagra_largo+.2);
  }
}

module bandeja_electronica() {
  columnas=5;
  filas=3;
  paso=24;
  ranura_largo=8;
  ranura_d=3.2;
  patron_x0=(bandeja[0]-((columnas-1)*paso+ranura_largo+ranura_d))/2
            + ranura_d/2;
  patron_y0=(bandeja[1]-((filas-1)*paso+ranura_d))/2+ranura_d/2;
  difference() {
    cube(bandeja);
    for (ix=[0:columnas-1],iy=[0:filas-1])
      let(x=patron_x0+ix*paso,y=patron_y0+iy*paso)
      translate([x,y,-1]) hull() {
        cylinder(d=ranura_d,h=bandeja[2]+2);
        translate([ranura_largo,0,0])
          cylinder(d=ranura_d,h=bandeja[2]+2);
      }
    translate([bandeja[0]/2,bandeja[1]-7,-1])
      cylinder(d=3.4,h=bandeja[2]+2);
  }
}

module soporte_botones() {
  // Soporte horizontal para una pequeña PCB con los dos pulsadores.
  difference() {
    cube([44,3,28]);
    for (x=[13,31])
      translate([x,-1,14]) cilindro_y(4.5,5);
    for (x=[5,39])
      translate([x,-1,14]) cilindro_y(3.4,5);
  }
}

module inserto_usb() {
  difference() {
    cube([usb_marco[0],usb_marco[2],usb_marco[1]]);
    translate([(usb_marco[0]-usb_abertura[0])/2,-1,
               (usb_marco[1]-usb_abertura[1])/2])
      cube([usb_abertura[0],usb_marco[2]+2,usb_abertura[1]]);
  }
}

module volumenes() {
  color([.84,.60,.12,.7]) translate(sps_origen) cube(sps);
  color([.18,.36,.45,.7])
    translate([epd_centro[0]-epd_placa[0]/2,pared+.5,
               epd_centro[1]-epd_placa[1]/2]) cube(epd_placa);
  color([.18,.55,.32,.8]) translate(bme_origen) cube(bme);
  color([.55,.55,.55,.45]) translate(bandeja_origen)
    cube([bandeja[0],bandeja[1],18]);
  for (c=pulsador_centros)
    color([.25,.25,.25,.8])
      translate([c[0]-pulsador[0]/2,pared,c[1]-pulsador[1]/2])
        cube([pulsador[0],pulsador[2],pulsador[1]]);
}

module ensamble() {
  color([.91,.88,.78]) cuerpo_frontal();
  color([.88,.85,.75]) cuerpo_trasero();
  color([.84,.60,.12]) translate([0,0,alto-espesor_tapa+8]) tapa();
  color([.82,.30,.15])
    translate([puerta_x,fondo+.3,puerta_z]) puerta_izquierda();
  color([.72,.22,.11])
    translate([puerta_x+hoja_ancho+junta_puertas,fondo+.3,puerta_z])
      puerta_derecha();
  for (x=[puerta_x+hoja_ancho-14,
          puerta_x+hoja_ancho+junta_puertas+14])
    color([.72,.53,.22])
      translate([x,fondo+.3+puerta_espesor,puerta_z+37])
        rotate([-90,0,0]) tirador();
  color([.75,.72,.65]) translate(bandeja_origen) bandeja_electronica();
  color([.18,.18,.18])
    translate([usb_centro[0]-usb_marco[0]/2,
               fondo-usb_marco[2],
               usb_centro[1]-usb_marco[1]/2]) inserto_usb();
  volumenes();
}

module despiece() {
  color([.91,.88,.78]) translate([0,-90,0]) cuerpo_frontal();
  color([.88,.85,.75]) translate([0,90,0]) cuerpo_trasero();
  color([.84,.60,.12]) translate([0,0,alto+35]) tapa();
  color([.82,.30,.15]) translate([-35,235,0]) puerta_izquierda();
  color([.72,.22,.11]) translate([135,235,0]) puerta_derecha();
  color([.75,.72,.65]) translate([35,-175,0]) bandeja_electronica();
  color([.3,.3,.3]) translate([ancho+25,20,0]) bisagra_marco();
  color([.4,.4,.4]) translate([ancho+45,20,0]) bisagra_puerta();
  color([.72,.53,.22]) translate([ancho+65,20,0]) tirador();
  color([.18,.18,.18]) translate([ancho+85,20,0]) inserto_usb();
}

if (pieza=="cuerpo_completo") cuerpo_completo();
else if (pieza=="cuerpo_frontal") cuerpo_frontal();
else if (pieza=="cuerpo_trasero") cuerpo_trasero();
else if (pieza=="tapa") tapa();
else if (pieza=="puerta_izquierda") puerta_izquierda();
else if (pieza=="puerta_derecha") puerta_derecha();
else if (pieza=="bisagra_marco") bisagra_marco();
else if (pieza=="bisagra_puerta") bisagra_puerta();
else if (pieza=="bandeja") bandeja_electronica();
else if (pieza=="soporte_botones") soporte_botones();
else if (pieza=="tirador") tirador();
else if (pieza=="inserto_usb") inserto_usb();
else if (pieza=="volumenes") volumenes();
else if (pieza=="despiece") despiece();
else ensamble();
