import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  id: any;
  products: any;

  addCart = {
    product_id: 0,
    qty: 1,
    is_collage: 0,
    is_offer: 0
  }
  addWishList={
    producID:0,
  }

  constructor(private product: ProductService, private activated: ActivatedRoute, private router: Router, private cart: CartService, private global: GlobalService , private wishlistService:WishlistService) {
  }
  addToWishlist(id: number) {
    if(this.global.is_login){
      this.addWishList.producID = id
      this.wishlistService.addToWishlist(this.addWishList).subscribe(res => {
        Swal.fire({
          title:"Success!",
          text:res.message,
          icon: "success",
          
        })
      })
    }
  }

  isInWishlist(productId: any): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  ngOnInit() {
    this.activated.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.product.products(this.id).subscribe(res => {
        this.products = res.data
      })
    });
  }

  addToCart(id: number) {
    if (this.global.is_login) {
      this.addCart.product_id = id
      this.cart.addToCart(this.addCart).subscribe(res => {
        Swal.fire({
          title: 'Success!',
          text: res.message,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please Login First',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      this.router.navigateByUrl('/login');
    }
  }
}
