
class AvtoritetActions {

  buyFromPopup(price, id = '60200030df84ef24d5f285d9') {
    if (price && id) {
     new NetworkInterface('POST',{
       price:price,
       userId: id
     },'/avtoritet-buy').sendAjax()
   }
  }

  bindingPopupEvents() {
    const avtoritetBlock = document.querySelector('.js-buy-avtoritet')
    const avtNodes = avtoritetBlock.closest('.app')
    avtNodes.querySelector('[data-confirm=true]').addEventListener('click',(event)=> {
      const price = avtNodes.querySelector('#confirmAvtoritet').getAttribute('data-price-ajax')
      this.buyFromPopup(price)})
  }
}

new AvtoritetActions().bindingPopupEvents()
