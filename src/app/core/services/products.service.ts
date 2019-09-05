import {State} from '../store';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {coldObservable} from '../util/cold-observable';
import {DataService} from './data.service';
import {PageRequest} from '../models/page-request.model';
import {selectProducts, selectAllProducts, UpsertManyProducts, RemoveAllProducts} from '../store/products.store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private store: Store<State>,
              private data: DataService) {
  }

  products$ = coldObservable<Product[], Product[]>(
    this.store.select(selectAllProducts),
    product => product.length < 1,
    this.store.select(selectAllProducts),
    () => this.data.get('assets/products.json', {}, '/'),
    response => this.store.dispatch(new UpsertManyProducts(JSON.parse(JSON.stringify(response.body))))
  );

  refreshProducts() {
    this.store.dispatch(new RemoveAllProducts());
  }

  next$ = (page: PageRequest) => coldObservable<Product[], Product[]>(
    this.store.select(selectProducts(page.ids)),
    product => !product,
    this.store.select(selectProducts(page.ids)),
    () => this.data.get('products/page/' + page.number + '/items/' + page.count),
    response => this.store.dispatch(new UpsertManyProducts(response.body as Product[]))
  );


}
