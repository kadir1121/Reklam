import { musteri } from './../../models/musteri';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { is } from 'src/app/models/is';
import { ApiService } from 'src/app/services/api.service';
import { musteri } from 'src/app/models/musteri';

@Component({
  selector: 'app-musteri',
  templateUrl: './musteri.component.html',
  styleUrls: ['./musteri.component.css']
})
export class musteriComponent implements OnInit {
  musteriadi: string;
  musteriId: number;
  isler: is[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.this.musteriId = p.musteriId;
        ) {
        this.musteriId = p.musteriId;
        this.isListeByMusteriId();
        this.MusteriById();
      }
    });
  }
  MusteriById() {
    this.apiServis.MusteriById(this.musteriadi).subscribe((d: musteri) => {
      this.musteri = d;
    });
  }
  isListeByMusteriId() {
    this.apiServis.isListeByMusteriId(this.musteriId).subscribe((d: is[]) => {
      this.isler = d;
    });
  }
}
