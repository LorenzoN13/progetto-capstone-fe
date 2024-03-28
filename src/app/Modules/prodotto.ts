import { Iprodotto } from "./iprodotto";

export class Prodotto implements Iprodotto{
 constructor(
  public id:number,
  public titolo: string,
  public descrizione: string,
  public prezzo: number,
  public dimensione: string,
  public brand: string,
  public colore: string,
  public immagineUrl: string,
  public categoria: string,
  public quantita: number,
  public prezzoScontato?: number,
  public percentualeSconto?: number,

 ){}
}
