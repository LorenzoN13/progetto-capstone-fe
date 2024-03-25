import { Iordine } from "./iordine";
import { Iprodotto } from "./iprodotto";

export interface Iordinearticolo {
  totalPrice: number;
  ordine: Iordine;
  prodotto: Iprodotto;
  dimensione: string;
  quantita: number;
  prezzo: number;
  idProdotto?: number;
  idOrdine?: number;
}
