import { Vuelo,VueloModel } from "./types.ts";

export const fromVuelotoModel=(vuelomodel:VueloModel):Vuelo=>{
    return{
        id:vuelomodel._id!.toString(),
        origen:vuelomodel.origen,
        destino:vuelomodel.destino,
        fecha_hora:vuelomodel.fecha_hora,
    }

}