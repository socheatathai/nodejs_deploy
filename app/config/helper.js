
const config =  {
    local_token :"asdfghjkl"
}
const isEmpty = (value)=>{
    if(value == null || value == undefined || value == ""){
        return true
    }
    return false;
} 
module.exports = {isEmpty,config};