import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  readonly baseUrl = 'http://127.0.0.1:5000';
  constructor(public httpClient: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.httpClient.get(this.baseUrl + '/piu/get_all_items') as Observable<Item[]>;
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get(
      this.baseUrl + '/piu/get_item_by_id/' + id
    ) as Observable<Item>;
  }

  createItem(item: Item): Observable<string> {
    return this.httpClient.post(
      this.baseUrl + '/piu/create_item',
      item
    ) as Observable<string>;
  }

  deleteItem(id: number): Observable<string> {
    return this.httpClient.delete(
      this.baseUrl + '/piu/delete_item_by_id/' + id
    ) as unknown as Observable<string>;
  }

  editItem(item: Item): Observable<string> {
    return this.httpClient.put(
      this.baseUrl + '/piu/update_item/' + item._id,
      item
    ) as unknown as Observable<string>;
  }
}
