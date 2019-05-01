

// various random functions

function nsRandRange(min, max){
    return Math.random()*(+max - +min) + +min; 
}

function nsRandRangeInt(min, max){
    return Math.floor(Math.random()*(+max - +min) + +min);
}

function nsRandomShuffleArr(arr){
    for(var i=arr.length-1; i>0; i--){
        var j=arr[i];
        var t=arr[i];
        arr[i]=arr[j];
        arr[j]=t;
    }
    return arr;
}