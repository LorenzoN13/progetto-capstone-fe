import { Component, Input } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { Iordine } from '../../Modules/iordine';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';
import { OrdineService } from '../../services/ordine.service';
import { Iordinearticolo } from '../../Modules/iordinearticolo';
import { ICreateProdotto } from '../../Modules/i-create-prodotto';

@Component({
  selector: 'app-add-to-shop',
  templateUrl: './add-to-shop.component.html',
  styleUrl: './add-to-shop.component.scss'
})
export class AddToShopComponent {
  
}
