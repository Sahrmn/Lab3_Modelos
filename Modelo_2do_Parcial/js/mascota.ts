///<reference path="animal.ts"/>

namespace Clases{

    export class Mascota extends Animal{
        public id:number;
        public tipo:tipoMascota;

        constructor(id:number, nombre:string, edad:number, patas:number, tipo:tipoMascota){
         super(nombre, edad, patas);
         this.id = id;   
         this.tipo = tipo;
        }

        public toJSON():string{
        let json: string = `{"id":${this.id}, "nombre":"${this.nombre}", "edad":${this.edad},"patas":${this.patas}, "tipo":${this.tipo}}`;
        return json;
    }
    }
}

