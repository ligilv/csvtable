export function toObj(array) {
  const TempArr = [];
  //i=1 to avoid first row as they are column name
  for (let i = 1; i < array.length; i++) {
    const tempObj = {};
    for (let j = 0; j < array[i].length; j++) {
      switch (j) {
        case 0:
          tempObj.orderId = array[i][j];
          break;
        case 1:
          tempObj.customerId = array[i][j];
          break;
        case 2:
          tempObj.deliveryPincode = array[i][j];
          break;
        case 3:
          tempObj.orderDate = array[i][j];
          break;
        case 4:
          const splitItem = array[i][j].split(";");
          //remove last item which is ''
          splitItem.pop();
          //   console.log(splitItem);

          tempObj.items = splitItem;
          break;

        default:
          break;
      }
    }
    TempArr.push(tempObj);
  }
  return TempArr;
}
