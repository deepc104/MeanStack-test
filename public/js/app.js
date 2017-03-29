(function(){
  angular
    .module('FbPageStats', [])
    .controller('FbController', FbController);

	function FbController($scope, $http){
		$scope.SubmitPage = SubmitPage;
      
		function SubmitPage(data){
		    $http
			  .post("/api/fbstats", data)
			  .then(function(rest) {
				//console.log(rest);   
				$scope.pdata = rest.data;  
			})
			.catch(function(fallback) {
				console.log('Something went wrong');
                //$scope.pdata = "Something went wrong";
			});
		}
	} 
})();
