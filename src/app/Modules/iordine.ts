import { Idettaglipagamento } from "./idettaglipagamento";
import { Iordinearticolo } from "./iordinearticolo";
import { Iprodotto } from "./iprodotto";

export interface Iordine {
  id?:number;
  dataOrdine: string;
  dataConsegna: string;
  prezzoTotale: number;
  PrezzoScontatoTotale?: number;
  sconto?: number;
  statoOrdine: string;
  articoloFinale: Iprodotto;
  dettagliPagamento: Idettaglipagamento;
  ordineArticoli: Iordinearticolo[];
  idUtente?:string;
  idIndirizzo?: string;
  idOrdineArticolo?: string;
  idDettaglioPagamento?: string;
}
