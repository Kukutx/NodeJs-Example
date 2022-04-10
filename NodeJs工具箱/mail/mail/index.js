var mail = require("./mail");

mail.send({  
    from: '"Du Peiduo" <peiduodu@gmail.com>',  
    to: 'bbb@gmail.com',  
    subject: 'Login success',  
    text: 'Some simple words.',  
    html: '<b>The main content of the mail</b>'  
});  