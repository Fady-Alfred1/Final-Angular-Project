import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  total = 0
  products : any
  constructor(private wishlistService: WishlistService) { }
  ngOnInit(): void {
    this.getWishList();
  }
  getWishList(){
    this.wishlistService.getWishlist().subscribe(res => {
      this.total = res.total_cart
      this.products = res.products
    })
  }
  addToWishlist(product: any) {
    this.wishlistService.addToWishlist(product);
  }

  removeItem(itemId: any) {
    this.wishlistService.removeFromWishlist(itemId);
  }
}
