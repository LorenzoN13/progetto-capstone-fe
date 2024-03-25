export interface Iprodotto {
  titolo: string;
  descrizione: string;
  prezzo: number;
  prezzoScontato?: number;
  percentualeSconto?: number;
  brand: string;
  colore: string;
  immagineUrl: URL;
  categoria: string;
  quantita: number;
}