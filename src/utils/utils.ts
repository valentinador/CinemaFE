  export const getUserInfoByStorage = () => {
    if(localStorage.getItem('loginState') !==null){
        return JSON.parse(localStorage.getItem('loginState') || "");
    } else {
        return { name: "", surname: "", email: "", role: "", password: "", createdAt:null }
    }
  
  }