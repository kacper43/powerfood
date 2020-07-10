import { Injectable } from '@angular/core';
import { MenuItem } from './menuItem.model';
import { Topping } from './topping.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

constructor() { }

private toppings: Topping[] = [
  {
    id: 1,
    name: 'pieczarki',
    sizes: [
      {
        size: '30cm',
        price: 3
      },
      {
        size: '40cm',
        price: 4
      },
      {
        size: '50cm',
        price: 5
      }
    ]
  },
  {
    id: 2,
    name: 'pomidor',
    sizes: [
      {
        size: '30cm',
        price: 3
      },
      {
        size: '40cm',
        price: 4
      },
      {
        size: '50cm',
        price: 5
      }
    ]
  },
  {
    id: 3,
    name: 'szynka',
    sizes: [
      {
        size: '30cm',
        price: 4
      },
      {
        size: '40cm',
        price: 5
      },
      {
        size: '50cm',
        price: 6
      }
    ]
  }
];

 private menu: MenuItem[] = [
  {id: 1,
    name: 'Margaretka',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, aromatyczne zioła',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Classic'
  },
  {id: 2,
    name: 'Salami',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, salami',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Classic'
  },
  {id: 3,
    name: 'Capriciosa',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, szynka, pieczarki',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Classic'
  },
  {id: 4,
    name: 'Hawajska',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, szynka, ananas',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Classic'
  },
  {id: 5,
    name: 'Corn & Ham',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, szynka, pieczarki, kukurydza',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Classic'
  },
  {id: 6,
    name: 'Funghi',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, pieczarki',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Wege'
  },
  {id: 7,
    name: 'X-Szpinak',
    toppings: 'Ziołowy sos pomidorowy, ser mozzarella, szpinak, ser feta, gorgonzola DOP, czosnek',
    sizes: [
      {
        size: '30cm',
        price: 19
      },
      {
        size: '40cm',
        price: 25
      },
      {
        size: '50cm',
        price: 38
      }
    ],
    category: 'Wege'
  }
];

  getMenu() {
    return this.menu;
  }

  getToppings() {
    return this.toppings;
  }
}
