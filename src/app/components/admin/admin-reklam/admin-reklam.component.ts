import { musteri } from './../../../models/musteri';

import { RekalmAjansi } from '../../../models/is';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Musteri } from 'src/app/models/musteri';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { RekalmAjansiDialogComponent } from '../../dialogs/RekalmAjansi-dialog/RekalmAjansi-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-RekalmAjansi',
  templateUrl: './admin-reklam.component.html',
  styleUrls: ['./admin-reklam.component.css']
})
export class AdminRekalmAjansiComponent implements OnInit {
  musteriler: musteri[];
  RekalmAjansiler: RekalmAjansi[];
  katId: number;
  uyeId: number;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatSort;
  displayedColumns = ['Baslik', 'Tarih', 'UyeKadi', 'Okunma', 'detay'];
  dialogRef: MatDialogRef<RekalmAjansiDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.uyeId = parseInt(localStorage.getItem("uyeid"));
    this.musteriListele();

    this.route.params.subscribe(p => {
      if (p.musteriID) {
        this.musteriID = parseInt(p.musteriID);
        this.RekalmAjansiListele();
      }

    });

  }

  musteriListele() {
    this.apiServis.musteriListe().subscribe((d: musteri[]) => {
      this.musteriler = d;

    });
  }

  RekalmAjansiListele() {
    this.apiServis.RekalmAjansiListeByMusteriID(this.musteriID).subscribe((d: RekalmAjansi[]) => {
      this.RekalmAjansiler = d;
      this.dataSource = new MatTableDataSource(this.RekalmAjansiler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  musteriSec(musteriID: number) {
    this.musteriID = musteriID;
    this.RekalmAjansiListele();
  }
  Ekle() {
    var yeniKayit: RekalmAjansi = new RekalmAjansi();
    this.dialogRef = this.matDialog.open(RekalmAjansiDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        yeniKayit.reklamajansi = d.reklamajansi;
        yeniKayit.reklamsehir = d.reklamsehir;
        yeniKayit.reklamtel = d.reklamtel;
        yeniKayit.reklameposta = d.reklameposta;
        yeniKayit.reklamadres = d.reklamadres);
        yeniKayit.reklamsahibi = d.reklamsahibi;
        yeniKayit.Okunma = 0;
        this.apiServis.RekalmAjansiEkle(yeniKayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.RekalmAjansiListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: RekalmAjansi) {
    this.dialogRef = this.matDialog.open(RekalmAjansiDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.Baslik = d.Baslik;
        kayit.reklamID = d.reklamID;
        kayit.Icerik = d.Icerik;
        this.apiServis.RekalmAjansiDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.RekalmAjansiListele();
          }
        });
      }
    });
  }
  Detay(kayit: RekalmAjansi) {
    this.dialogRef = this.matDialog.open(RekalmAjansiDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'detay'
      }
    });
  }
  Sil(kayit: RekalmAjansi) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = "RekalmAjansi Silinecektir onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {

        this.apiServis.RekalmAjansiSil(kayit.reklamID).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.RekalmAjansiListele();
          }
        });
      }
    });

  }
}
