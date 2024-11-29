import { Collection, ObjectId } from "mongodb";
import { VueloModel, Vuelo } from "./types.ts";
import { fromVuelotoModel } from "./utilts.ts";

export const resolvers={
    Query:{
        getFlights:async(
            _:unknown,
            args:{origen?:string,destino?:string},//son opcionales
            contexto:{VuelosCollection:Collection<VueloModel>}
        ):Promise<Vuelo[]>=>{
            const vuelos=await contexto.VuelosCollection.find(args).toArray();
            return vuelos.map((vuelomodel)=>fromVuelotoModel(vuelomodel));
        },

        getFlight:async(
            _:unknown,
            {id}:{id:string},
            contexto:{VuelosCollection:Collection<VueloModel>},
        ):Promise<Vuelo|null>=>{

            const vuelomodel=await contexto.VuelosCollection.findOne(
            {
                _id:new ObjectId(id)       
                
            });

                if(!vuelomodel){
                    return null;
                }
                    
            return fromVuelotoModel(vuelomodel);
        }

    },
    Mutation:{
        addFlight:async(
            _:unknown,
            args:{origen:string,destino:string,fecha_hora:string},        
            contexto:{VuelosCollection:Collection<VueloModel>}
        ):Promise<Vuelo>=>{
            const {origen,destino,fecha_hora}=args;
            const {insertedId}=await contexto.VuelosCollection.insertOne(
                {
                    origen,
                    destino,
                    fecha_hora
                });
            const vuelomodel={
                _id:insertedId,
                origen,
                destino,
                fecha_hora
            }
            return fromVuelotoModel(vuelomodel);

        }
    }
}