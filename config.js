module.exports = {
    ROLE: {
        ADMIN: 1 ,
        EMPLOYEE: 2 ,
        CUSTOMER: 3
    } ,
    SALT_LENGTH: 8 ,
    CARD_LENGTH: 16 ,
    JWT_SECRET: "thisisasampleproject" ,
    RESPONSE: {
        USER_ACCESS: {
            code: 1000 ,
            msg: "Access not Provided"
        } ,
        INVALID: {
            code: 1001 ,
            msg: "Invalid Credentials"
        } ,
        USER_NOT_FOUND: {
            code: 1002 ,
            msg: "User not Found!"
        } ,
        USER_EXISTS: {
            code: 1003 ,
            msg: "User already Exists!"
        } ,
        INVALID_ID: {
            code: 1004 ,
            msg: "Please provide a Valid ID!"
        } ,
        SHOW_NOT_FOUND: {
            code: 1005 ,
            msg: "Show not Found!"
        } ,
        SEAT_NOT_FOUND: {
            code: 1006 ,
            msg: "Seat not Found!"
        } ,
        SCREEN_NOT_FOUND: {
            code: 1007 ,
            msg: "Screen not Found!"
        } ,
        CARD_NO: {
            code: 1008 ,
            msg: "Invalid card number!"
        } ,
        MOVIE_NOT_FOUND: {
            code: 1009 ,
            msg: "Movie not Found!"
        } ,
        CINEMA_NOT_FOUND: {
            code: 1010 ,
            msg: "Cinema not Found!"
        } ,
        PASSWORD: {
            code: 1011 ,
            msg: "Incorrect Password"
        }
    }
}