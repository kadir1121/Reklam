import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from '../../../models/Sonuc';
import { musteriDialogComponent } from '../../dialogs/musteri-dialog/musteri-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from '../../../services/myAlert.service';
import { ApiService } from '../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { musteri } from 'src/app/models/musteri';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-musteri',
  templateUrl: './admin-musteri.component.html',
  styleUrls: ['./admin-musteri.component.css']
})
export class AdminmusteriComponent implements OnInit {
  musteriler: musteri[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatSort;
  displayedColumns = ['musteriAdi', 'musteriİs', 'detay'];
  dialogRef: MatDialogRef<musteriDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.musteriListele();
  }

  musteriListele() {
    this.apiServis.musteriListe().subscribe((d: musteri[]) => {
      this.musteriler = d;
      this.dataSource = new MatTableDataSource(this.musteriler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  Ekle() {
    var yeniKayit: musteri = new musteri();
    this.dialogRef = this.matDialog.open(musteriDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.musteriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.musteriListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: musteri) {
    this.dialogRef = this.matDialog.open(musteriDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.musteriAdi = d.musteriAdi;
        this.apiServis.musteriDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.musteriListele();
          }
        });
      }
    });
  }
  Sil(kayit: musteri) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.musteriAdi + " musterisi Silinecektir onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {

        this.apiServis.musteriSil(kayit.musteriId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.musteriListele();
          }
        });
      }
    });

  }
}
