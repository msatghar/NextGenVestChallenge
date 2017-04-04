const request = require('request');
const cheerio = require('cheerio');

const constructorMethod = (app) => {
    // app.use("/recipes", recipeRoutes);
    app.get("/", (req, res) => {
        res.render("form", { roiList: [{ id: 1, roi: 5 }, { id: 2, roi: 7 }] });
    });

    app.get("/roi/:id", (req, res) => {
       let url = 'http://studentaid.ed.gov/sa/types/loans/interest-rates';

        request(url, function (error, response, html) {
            if (!error) {
                let $ = cheerio.load(html);

                let subROI, unsubROI;

                $('tbody').each(function(i,elem){
                    if(i == 0){
                    subROI = this.children[2].children[4].children[1].children[0].data;
                    unsubROI = this.children[3].children[4].children[1].children[0].data;
                    }
                });

                if (req.params.id == "1")
                res.json({ roi: subROI.substring(0,subROI.length -1) });
                if (req.params.id == "2")
                res.json({ roi: unsubROI.substring(0,unsubROI.length -1)  });

            }});
            });

        app.use("*", (req, res) => {
            res.redirect("/");
        })
    };

    module.exports = constructorMethod;