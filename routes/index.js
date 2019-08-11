module.exports = {
    getHomePage: (req, res) => {
       
            res.render('index.ejs', {
                title: "Welcome to customer support ticket system"
            });
    },
};