
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM users',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('users',{page_title:"User Index",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_user',{page_title:"Add users"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_user',{page_title:"Edit User ",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the user*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            email   : input.email,
            phone   : input.phone,
            gender  :input.gender

        
        };
        
        var query = connection.query("INSERT INTO users set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('users');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            email   : input.email,
            phone   : input.phone,
            gender  :input.gender
        
        };
        
        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/users');
          
        });
    
    });
};


exports.delete_user = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/users');
             
        });
        
     });
};

exports.signup = function(req,res) {



            var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = { 
             
            first_name  : input.first_name,
            last_name  : input.last_name,
            password   : input.password
        };
                
           
          res.render('signup');

      req.getConnection(function(err,connection){

        var query = connection.query("insert into user set ? ",data,function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/signup');
          
        });
        
       // console.log(query.sql); get raw query
    
     });
});



exports.login =  function(req,res) {
            res.render('login',{page_title:"Edit User ",data:rows});


    
    req.getConnection(function(err,connection){

  connection.query('SELECT * FROM user WHERE id = ?',[id], function (err, rows) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    });
  }
  else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"


            });
      }
        else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
        }
         else{
      res.send({
        "code":204,
        "success":"Email does not exits"

      
        
                })
    }
  }
})})}};
     



