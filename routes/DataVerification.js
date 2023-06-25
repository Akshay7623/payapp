const isNull = (data)=>{
    if (typeof data === 'object') {
        return true;
    }else{
        return false;
    }
};

const isUndefined = (data)=>{
    if (typeof data === 'undefined') {
        return true;
    }else{
        return false;
    }
}

module.exports = {isNull, isUndefined};