/**
 * 存储localStorage值
 * @param key 
 * @param value 
 */
export function setItem(key:string,value:any) {
  return window.localStorage.setItem(key,value);
}

/**
 * 获取localStorage值
 * @param key 
 */
export function getItem(key:string){
  return window.localStorage.getItem(key);
}

/**
 * 删除localStorage值
 * @param key 
 */
export function removeItem(key:string){
  return window.localStorage.removeItem(key);
}

/**
 * 清空localStorage值
 */
export function clearItem(){
    let storage = window.localStorage;
    storage.clear();
}