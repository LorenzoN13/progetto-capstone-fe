import { Iprodotto } from "./iprodotto";

export class Prodotto implements Iprodotto{
 constructor(
  public titolo: string,
  public descrizione: string,
  public prezzo: number,
  public brand: string,
  public colore: string,
  public immagineUrl: URL,
  public categoria: string,
  public quantita: number,
  public prezzoScontato?: number,
  public percentualeSconto?: number
 ){}
}
