import { reklamajansi } from './../../models/reklamajansi';
import { ApiService } from 'src/app/services/api.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  makaleler: reklamajansi[];
  constructor(
    public apiServis: ApiService
  ) { }

  ngOnInit() {
    this.ReklamajansiListe();
  }
  ReklamajansiListe() {
    this.apiServis.reklamajansiListe(10).subscribe((d: reklamajansi[]) => {
      this.makaleler = d;
    });
  }

}
