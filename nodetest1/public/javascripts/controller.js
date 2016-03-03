(function(){
var app=angular.module('myapp',[])
app.controller('Appctrl',['$http',function($http){
console.log('hello');


var list=this;

$http.get('/personlist').success(function(response){
console.log('success http');
list.personlist=response;
});

$http.get('/login').success(function(reponse){
console.log('login called');
});

var list=this;
list.addApp=function(response){

$http({
method:'POST',url:'/personlist',data:list.person,
headers:{'Content-Type':'application/json'}
}).success(function(response){
console.log(response);
});
console.log(list.person);
$http.get('/personlist').success(function(response){
console.log('success http');
list.personlist=response;
});
};

var list=this;
list.remove=function(id){
$http.delete('/personlist/'+id).success(function(response){
console.log('deleted perfectly');
$http.get('/personlist').success(function(response){
console.log('success http');
list.personlist=response;
});
});
};

var list=this;
list.edit=function(id){
console.log(id);
$http.get('/personlist/'+id).success(function(response){
list.person=response;
//list.person="";
});
};


var list=this;
list.update=function(){
console.log(list.person._id);
$http.put('/personlist/'+list.person._id,list.person).success(function(response){
list.personlist=response;
});

$http.get('/personlist').success(function(response){
console.log('success http');
list.personlist=response;
});

};

var list=this;
list.deselect=function(){
list.person="";
};

}]);

app.controller('Authentication',[$http,function($http){
	
	
	
}]);

})();