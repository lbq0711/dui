function passready(app,passport,LocalStrategy) {

	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.use('local',new LocalStrategy(
		function (username,password,done) {
			var user = {
				id:'1',
				username:'admin',
				password:'pass'			
			};

			if (username !== user.username) {
				return done(null,false,{message:'Incorrect username.'});
			}
			if (password !== user.password) {
				return done(null,false,{message:'Incorrect password.'});
			}
			return done(null,user);
		}
	));

	passport.serializeUser(function(user,done) {
		done(null,user);
	});

	passport.deserializeUser(function(user,done) {
		done(null,user);
	});
	

}
exports.passready=passready;