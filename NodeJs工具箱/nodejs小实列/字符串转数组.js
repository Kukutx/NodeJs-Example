// // slice() - 切片
// /*slice() 方法會回傳一個新陣列物件，
// 為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）
// 。而原本的陣列將不會被修改。 */
// var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
// //['ant', 'bison', 'camel', 'duck', 'elephant'];
// //沒參數就沒變
// console.log(animals.slice());
// //['ant'];
// //取陣列中0的位置
// console.log(animals.slice(0,1));
// // expected output: Array ["camel", "duck", "elephant"]
// // 取陣列中2的位置但未給end參數，所以默認從2取到最後一個值
// console.log(animals.slice(2));
// // expected output: Array ["camel", "duck"]
// // 取陣列中2到3(4不包含)的位置
// console.log(animals.slice(2, 4));
// // expected output: Array ["bison", "camel", "duck", "elephant"]
// // 取陣列中1到4的位置
// console.log(animals.slice(1, 5));

//splice() -拼接
/*splice() 方法可以藉由刪除既有元素並/或加入新元素來改變一個陣列的內容。
白話文: splice我個人的理解是他與slice不同的地方在於他可以指定要在陣列的第幾號位置上做 加入/刪除 N個物件
而slice 只能指定兩個位置之後做出陣列的切割
,简单的说就是在指定位置插入或者替换*/
// var months = ['Jan', 'March', 'April', 'June'];
// // inserts at 1st index position
// //在1的位置插入'feb'
// months.splice(1, 0, 'Feb');
// // expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']
// console.log(months);
// // replaces 1 element at 4th index
// //在4的位置插入'May'，因此取代了'June'
// months.splice(4, 1, 'May');
// // expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
// console.log(months);

//String.prototype.split() — 分裂
/*split() 方法使用指定的分隔符字符串將一個String對象分割成字符串數組，
以將字符串分隔為子字符串，以確定每個拆分的位置。*/
// // ["Webkit", "Moz", "O", "ms", "Khtml"]
// console.log("Webkit Moz O ms Khtml".split( " " ));  
// // ["Webkit", "Moz", "O"]
// console.log("Webkit Moz O ms Khtml".split( " ", 3 ));

let str = "hellow  world!"            //注意hellow与world之前有两个空格
console.log(str.trim().split(" "))
console.log(str.trim().split(" ").length)

console.log(str.trim().split(/\s+/))
console.log(str.trim().split(/\s+/).length)

