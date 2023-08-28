export class GetAllBooks {
    static readonly type = '[App] Get Books';
    constructor(public pageNumber : any) { }
  }
  export class ClearState {
    static readonly type = '[App] Clear State';
  }

  export class SearchBooks {
    static readonly type = '[App] Seacrh AllBooks'
    constructor(public query: any) { }
  }

  export class filterBooks {
    static readonly type = '[App] filter AllBooks'
    constructor(public query: any) { }
  }

  export class addToCart {
    static readonly type = '[App] add To Cart'
    constructor(public userId: any, public body : any) { }
  }

  export class getCartItems {
    static readonly type = '[App] Get Cart Items'
    constructor(public userId: any ) { }
  }
  
  export class removeCartItem {
    static readonly type = '[App] remove Cart Items'
    constructor(public userId: any,public body : any ) { }
  }
  export class login {
    static readonly type = '[App] login'
    constructor(public body: any ) { }
  }

  export class findBookById{
    static readonly type = '[App] find a book'
    constructor(public bookid: any){}
  }
  

  export class setAuth{
    static readonly type = '[App] set  a auth'
    constructor(){}
  } 
  
  export class decreaseItemFromCart{
    static readonly type = '[App] decrase item'
    constructor(public userId: any,public body : any){}
  } 
  
  export class increaseItemFromCart{
    static readonly type = '[App] increase item'
    constructor(public userId: any,public body : any){}
  } 
  
  