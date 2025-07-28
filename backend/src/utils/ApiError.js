class ApiError extends Error{
    constructor(
        status,
        message = "Unexpected Behavior of API.",
        erros = [],
        stack = ""
    ){
        super(message);
        this.status = status;
        this.data = null;
        this.message = message;
        this.sucess = false;
        this.erros = erros;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}