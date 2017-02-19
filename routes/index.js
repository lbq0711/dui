exports.index = function(req,res) {
	res.render('index',{title:'Index',layout:false});
};

exports.home = function(req,res) {

	res.render('home',{user:req.user.username});
};