export const calcTotalPrice = (product) => {
  return product.reduce((acc, el) => {
    console.log(el, "el");

    return +acc + +el.subPrice;
  }, 0);
};

export const calcSubPrice = (product) => +product.count * +product.item.price;
