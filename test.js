const arr=[1,2,34,5,-4,3]
var res=[];
let len=arr.length
for(var i=0;i<arr.length;i++){
  getResByI(i)
}
console.log(res)

// 0=>i>len
function getResByI(index){
  let add=0
  for(let i=0;i<len;i++){
    add+=arr[index]
    res.push(add)
  }
}

一个控制元素个数 
一个控制起始数
一个控制循环