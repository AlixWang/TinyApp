

/*function reduceDimension(arr){
    var reduced = [];
    for(var i = 0; i<arr.length;i++){
        for(var j = 0;j<arr[i].length;j++){
            reduced.push(arr[i][j]);
        }
    }
    return reduced;
}
*/

/*function reduceDimension(arr) {
    var reduced = [];
    for(var i = 0;i<arr.length;i++){
        reduced = reduced.concat(arr[i]);
    }
    return reduced;
}
*/

/*function reduceDimension(arr) {
    return Array.prototype.concat.apply([],arr);
}
*/
//console.log(reduceDimension([[1,2],[1,2,2]]));

function fruits() {}
    fruits.prototype = {
        color:'red',
        say:function(){
            console.log(this.color);
        }
    }
var apple = new fruits;

colors = {
    color:'yellow'
}

console.log(apple.say.apply(colors));