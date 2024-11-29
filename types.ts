import{OptionalId} from 'mongodb';

export type VueloModel=OptionalId<{
    origen:string,
    destino:string,
    fecha_hora:string,
}>;

export type Vuelo={
    id:string,
    origen:string,
    destino:string,
    fecha_hora:string,
}