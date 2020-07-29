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
  },
  {
    id: 3,
    name: 'rukola',
    sizes: [
      {
        size: '30cm',
        price: 2
      },
      {
        size: '40cm',
        price: 3
      },
      {
        size: '50cm',
        price: 4
      },
      {
        size: '500ml',
        price: 2
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
    category: 'Pizza'
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
    category: 'Pizza'
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
    category: 'Pizza'
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
    category: 'Pizza'
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
    category: 'Pizza'
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
    category: 'Pizza'
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
    category: 'Pizza'
  },
  {id: 8,
    name: 'Bolognese',
    toppings: 'Sos boloński, parmezan, pietruszka',
    sizes: [
      {
        size: '500ml',
        price: 19
      }
    ],
    category: 'Makarony'
  },
  {id: 9,
    name: 'Carbonara',
    toppings: 'Sos śmietanowy, boczek wędzony, czosnek, parmezan',
    sizes: [
      {
        size: '500ml',
        price: 22
      }
    ],
    category: 'Makarony'
  },
  {id: 10,
    name: 'Spinaci con polo',
    toppings: 'Sos śmietanowy, szpinak, kurczak, suszone pomidory, czosnek, gorgonzola D.O.P.',
    sizes: [
      {
        size: '500ml',
        price: 24
      }
    ],
    category: 'Makarony'
  },
  {id: 11,
    name: 'Sos pomidorowy',
    toppings: '',
    sizes: [
      {
        size: '80ml',
        price: 2
      }
    ],
    category: 'Sosy i napoje'
  },
  {id: 12,
    name: 'Sos czosnkowy',
    toppings: '',
    sizes: [
      {
        size: '80ml',
        price: 2
      }
    ],
    category: 'Sosy i napoje'
  },
  {id: 13,
    name: 'Sos barbeque',
    toppings: '',
    sizes: [
      {
        size: '80ml',
        price: 2
      }
    ],
    category: 'Sosy i napoje'
  },
  {id: 14,
    name: 'Sos ostry',
    toppings: '',
    sizes: [
      {
        size: '80ml',
        price: 2
      }
    ],
    category: 'Sosy i napoje'
  },
  {id: 15,
    name: 'Pepsi',
    toppings: '',
    sizes: [
      {
        size: '330ml',
        price: 3
      },
      {
        size: '850ml',
        price: 6
      }
    ],
    category: 'Sosy i napoje'
  }
];

categories: Array<{id: number, name: string, sizes: Array<string>}> = [
  {
    id: 1,
    name: 'Pizza',
    sizes: ['30cm', '40cm', '50cm']
  },
  {
    id: 2,
    name: 'Makarony',
    sizes: ['500ml']
  },
  {
    id: 3,
    name: 'Sosy i napoje',
    sizes: ['80ml', '0,33L', '0,85L']
  },
];

  getMenu() {
    return this.menu;
  }

  getToppings() {
    return this.toppings;
  }

  deletePosition(id) {
    // deleting position via firebase
  }
  getCategories() {
    return this.categories;
  }
}
