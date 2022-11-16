// cookie
const cookieParserr = require('cookie-parser');
const { credentials } = require('./config');

app.use(cookieParserr(credentials.cookieSecret));
// - truy xuất giá trị của cookie dc gửi từ máy khách (nếu có) -
const monster = req.cookie.monster;
const signMonster = req.signMCookies.sign_monster;
// - Xóa cookie -
res.clearCookie('monster');


//session
const expressSession = require('express-session');
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))

// - using session -
const colorSchema = req.session.colorSchema || 'dark';
// - delete session -
delete req.session.colorSchema;