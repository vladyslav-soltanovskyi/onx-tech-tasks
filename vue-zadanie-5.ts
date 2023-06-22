// sposob 1
const getUniqueValues = (arrA: any[], arrB: any[]): any[] => {
  const uniqueValuesArrA = arrA.filter(x => !arrB.includes(x));
  const uniqueValuesArrB = arrB.filter(x => !arrA.includes(x));
  
  // return [...uniqueValuesArrA, ...uniqueValuesArrB]; // ta opcja z mojej strony pasuje ale
  return uniqueValuesArrA.concat(uniqueValuesArrB); // wynik ten jest troszeczke lepszy
}

// sposob 2 
// ale lepszy wynik daje ta funkcja pod względem wydajności
function symmetricDifference(arrA: any[], arrB: any[]): any[] {
  const setA = new Set(arrA);
  const setB = new Set(arrB);
  
  const diffA = arrA.filter(x => !setA.has(x));
  const diffB = arrB.filter(x => !setB.has(x));
  
  return diffA.concat(diffB);
}