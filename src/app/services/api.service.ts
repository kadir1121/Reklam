import { is } from './../models/is';
import { Uye } from './../models/Uye';
import { reklamajansi } from './../models/reklamajansi';
import { musteri } from '../models/musteri';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:xxx/api/";

  constructor(
    public http: HttpClient
  ) { }

  

  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    var sonuc: boolean = false;
    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });

    }

    return sonuc;
  }


 


  

  MusteriListe() {
    return this.http.get(this.apiUrl + "/musteriliste")
  }
  MusteriById(katId: number) {
    return this.http.get(this.apiUrl + "musteribyid/" + katId);
  }
  MusteriEkle(kat: musteri) {
    return this.http.post(this.apiUrl + "/musteriekle", kat);
  }
  MusteriDuzenle(kat: musteri) {
    return this.http.put(this.apiUrl + "/musteriduzenle", kat);
  }
  MusteriSil(katId: number) {
    return this.http.delete(this.apiUrl + "/musterisil/" + katId);
  }

  reklamajansiListe() {
    return this.http.get(this.apiUrl + "/liste")
  }
  reklamajansiListeByAjans(ajans: string) {
    return this.http.get(this.apiUrl + "/reklamajansilistebyajans/" + ajans)
  }
  reklamajansiListeBySehir(sehir: string) {
    return this.http.get(this.apiUrl + "/reklamajansilistebysehir/" + sehir)
  }
  reklamajansiListeBySahibi(sahibi: string) {
    return this.http.get(this.apiUrl + "/reklamajansilistebysahibi/" + sahibi)
  }
  reklamajansiById(reklamajansiId: number) {
    return this.http.get(this.apiUrl + "reklamajansibyid/" + reklamajansiId);
  }
  reklamajansiEkle(reklamajansi: reklamajansi) {
    return this.http.post(this.apiUrl + "/reklamajansiekle", reklamajansi);
  }
  reklamajansiDuzenle(reklamajansi: reklamajansi) {
    return this.http.put(this.apiUrl + "/reklamajansiduzenle", reklamajansi);
  }
  reklamajansiSil(reklamajansiId: number) {
    return this.http.delete(this.apiUrl + "/reklamajansisil/" + reklamajansiId);
  }

  

  isListe() {
    return this.http.get(this.apiUrl + "/isListe")
  }
  isListeByAd(isadi: string) {
    return this.http.get(this.apiUrl + "/isAdaGoreListele/" + isadi)
  }   
  isListeByMusteriAdi(MusteriAdi: string) {
    return this.http.get(this.apiUrl + "/isListeByMusteriGoreListele/" + MusteriAdi)
  }
  isReklamaGoreListele(İsReklam: number) {
    return this.http.get(this.apiUrl + "isReklamaGoreListele/" + İsReklam);
  }
  isEkle(is: is) {
    return this.http.post(this.apiUrl + "/isEkle", is);
  }
  isDuzenle(is: is) {
    return this.http.put(this.apiUrl + "/isDuzenle", is);
  }
  isSil(isId: number) {
    return this.http.delete(this.apiUrl + "/isSil/" + isId);
  }


  UyeListe() {
    return this.http.get(this.apiUrl + "/uyeliste")
  }
  UyeByKullaniciAdi(uyeKullanıcıAdi: number) {
    return this.http.get(this.apiUrl + "uyebykullaniciadi/" + uyeKullanıcıAdi);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "/uyesil/" + uyeId);
  }
}
