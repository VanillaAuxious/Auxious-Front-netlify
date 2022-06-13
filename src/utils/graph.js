export function getGraphData(data) {
  let tempConnoisseur = 0;
  let tempLowestPrice = 0;
  let tempAveragePrice = 0;
  let connoisseurSum = 0;
  let lowestPriceSum = 0;
  let averagePriceSum = 0;

  for (let i = 0; i < data.auctions.length; i++) {
    tempConnoisseur = data.auctions[i].connoisseur.replaceAll(',', '');
    tempConnoisseur = data.auctions[i].connoisseur.replaceAll('원', '');
    tempLowestPrice = data.auctions[i].lowestPrice.replaceAll(',', '');
    tempLowestPrice = data.auctions[i].lowestPrice.replaceAll('원', '');
    tempLowestPrice = tempLowestPrice.split(' ')[1];

    connoisseurSum += parseInt(tempConnoisseur);
    lowestPriceSum += parseInt(tempLowestPrice);
  }

  for (let i = 0; i < data.forSales.length; i++) {
    tempAveragePrice = data.forSales[i].price.replaceAll(',', '');
    tempAveragePrice = data.forSales[i].price.replaceAll('원', '');

    averagePriceSum += +parseInt(tempAveragePrice);
  }

  return [
    { name: '감정가', value: connoisseurSum / data.auctions.length },
    { name: '최저가', value: lowestPriceSum / data.auctions.length },
    { name: '평균가', value: averagePriceSum / data.forSales.length },
  ];
}

export function getMinMaxData(data) {
  let max = 0;
  let min = 0;
  for (let i = 0; i < data.data.length; i++) {
    if (isNaN(data.data[i].value)) break;
    max = Math.max(parseInt(data.data[i].value), max);
    min = Math.min(parseInt(data.data[i].value), min);
  }

  return [min, max];
}
