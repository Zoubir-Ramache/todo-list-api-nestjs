export interface JwtRequest extends Request{
    user : {
        username:string , 
        userId:string
    }
} 