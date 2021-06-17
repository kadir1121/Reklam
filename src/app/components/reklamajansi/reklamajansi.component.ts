import { Sonuc } from '../../models/Sonuc';
import { Uye } from '../../models/Uye';
import { musteri } from '../../models/is';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-musteri',
  templateUrl: './musteri.component.html',
  styleUrls: ['./musteri.component.css']
})
export class musteriComponent implements OnInit {
  musteriId: number;
  musteri: musteri;
  yorumlar: Yorum[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.musteriId) {
        this.musteriId = p.musteriId;
        this.MusteriByAd();
      }
    });
  }

  MusteriByAd() {
    this.apiServis.musteriByAd(this.musteriadi).subscribe((d: musteri) => {
      this.musteri = d;      
      this.MusteriListe();
    });
  }
   
  MusteriListe() {
    this.apiServis.MusteriListe(this.musteriId).subscribe((d: musteri) => {
      this.musteriId = d;
    });
  }
    
    });
  }
}
