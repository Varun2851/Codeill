module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for codiel</h1>');
    console.log(req.cookies);
    //res.cookie('user_id');
    return res.render('home',{
        title : "Home"
    });
} 
//module.export.actionName = function(req,res){}