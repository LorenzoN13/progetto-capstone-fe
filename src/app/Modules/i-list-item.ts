import { Iprodotto } from "./iprodotto";

export interface IListItem {
  id: number;
  prodottoId: number;
  utenteId: number;
  prodotto :Iprodotto | null
}
