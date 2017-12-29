import { Injectable } from '@angular/core';
import { WakandaClient } from "wakanda-client/browser/no-promise";

const client = new WakandaClient({});

@Injectable()
export class WakandaService {
  private ds: Promise<any>;

  catalog(): Promise<any>{
    if(!this.ds){
      this.ds = client.getCatalog();
    }

    return this.ds;
  }

  constructor() {

  }

}
