import { Iordine } from "./iordine";
import { Iprodotto } from "./iprodotto";

export interface Iordinearticolo {
  ordine: Iordine;
  prodotto: Iprodotto;
  dimensione: string;
  quantita: number;
  prezzo: number;
  idProdotto?: number;
  idOrdine?: number;
}
