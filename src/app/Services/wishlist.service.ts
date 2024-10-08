import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl = 'http://techs-experts.net/public/api/';


  private wishlist: any[] = [];

  constructor(private Http: HttpClient) { }

  getWishlist(): Observable<any> {
    return this.Http.get(`${this.baseUrl}client/user-likes`);
  }

  addToWishlist(item: any) : Observable<any> {
    return this.Http.post(`${this.baseUrl}client/user-likes`, item)
  }

  removeFromWishlist(itemId: any) :Observable<any>{
    return this.Http.delete(`${this.baseUrl}client/user-likes/${itemId}`)
  }

  isInWishlist(itemId: any): boolean {
    return this.wishlist.some(item => item.id === itemId);
  }
}
