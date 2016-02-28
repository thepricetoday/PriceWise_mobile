angular.module('starter.controllers', ['ionic'])

.controller('TabsCtrl', function($scope, $timeout,$ionicLoading,$ionicPopup,$http,$location,$rootScope,sessionService,loginService,MakeListService) {
  
  sessionService.set('islogin','FALSE');
  $scope.purchases = []; 
  $scope.cashout =[];
  $scope.purchased_Items = [];
  $scope.unpurchased_Items = [];

//Get Total Price
  $scope.getCartPrice = function () {
    var total = 0;

    $rootScope.cart.forEach(function (product) {
     // console.log(product);
      total += product.price * product.quantity;
    });
    return total;
  };

 $scope.getCashOut = function () {
    var total = 0;
    $scope.cashout.forEach(function (product) {
      total += product.price * product.quantity;
    });
    return total;
  };
//Add List to user
$scope.addtoAccount = function(){
$scope.resp = false;
  if($scope.purchases.length > 0 ){
     if (sessionService.get('islogin') == 'TRUE') {
            var ID = sessionService.get('userID');
            $http.post("http://localhost/PriceWiseWeb/productprice/saveListuserID/"+ID)
                .then(function(response) {
                    console.log(response.data);
                    var ListUserID = response.data
                    console.log( $scope.purchases);  
                    angular.forEach( $scope.purchases,function(value,index){
                      console.log(value); 
                    $http.post("http://localhost/PriceWiseWeb/productprice/saveList/"+ListUserID , value)
                    .then(function(response) {
                      $scope.resp = response.data;
                        console.log($scope.resp);  
                      }, function(response) {
                        console.log(response);
                      }); 
                    }) 
                }, function(response) {
                    console.log(response);
              }); 
                if($scope.resp = true){
                 var confirmPopup = $ionicPopup.confirm({
    cssClass: 'SuccessFirstPopup',
     title: 'Successfully Save to your Account',
     template: 'Do you want to clear all?',
     cancelText: 'No',
        okText: 'Yes'
      }); 
      confirmPopup.then(function(res) {
     if(res) {
        for (var i=0; i<$rootScope.cart.length; i++) {
                    $rootScope.cart.splice(i,$rootScope.cart.length);
                  }
    
                  for (var i=0; i<$scope.purchases.length; i++) {
                    $scope.purchases.splice(i,$scope.purchases.length);
                  }
                  for (var i=0; i<$scope.purchased_Items.length; i++) {
                    $scope.purchased_Items.splice(i,$scope.purchased_Items.length);
                  }
                  for (var i=0; i<$scope.unpurchased_Items.length; i++) {
                    $scope.unpurchased_Items.splice(i,$scope.unpurchased_Items.length);
                  }
    console.log($scope.purchase);
    $scope.getCartPrice = function () {
    var total = 0;
    return total;
  };


 $scope.getCashOut = function () {
    var total = 0;
    return total;
  };
     } else {
       console.log('You are not sure');
     }
   });
                }

           console.log($scope.resp);
            }
      else{    

    var confirmPopup = $ionicPopup.confirm({
     title: 'Login First',
     template: 'Please signin First before saving.',
     cssClass: 'LoginFirstPopup',
      }); 
      confirmPopup.then(function(res) {
     if(res) {
        $location.path('/login')
     } else {
       console.log('You are not sure');
     }
   }); 
       
      };
    }
    else{
      $ionicPopup.alert({
      title: 'Alert',
     template: 'No data',
     cssClass: 'AlterPopup',
   });
    }
} 
$http.get('http://localhost/PriceWiseWeb/productprice/Option/1').
    then(function(response) { 
      $rootScope.Option = response.data;
      //console.log($rootScope.Option);
    }, function(response) {
      //console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

$scope.budget = function() {
     $scope.bud = {};

  // An elaborate, custom popup
  var myPopupBudget = $ionicPopup.show({
    template: '<input type="text" ng-model="bud.amount">',
    title: 'Budget Amount',
    subTitle: 'Enter budget amount for this list.',
    cssClass: 'BudgetPopup',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.bud.amount) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.bud.amount;
          }
        }
      }
    ]
  });
 myPopupBudget.then(function(res) {
     $rootScope.amountBudget = res;
     console.log(res);
     console.log($rootScope.amountBudget);
  });
    };
$scope.getBudgetAmount = function () {
   
    return $rootScope.amountBudget;
  };
 


}) 







.controller('DashCtrl', function($scope,$http,$timeout,$ionicPopup,$rootScope,MakeListService,AddCuzFactory) {
 $scope.selected= {};
 $scope.provinceSelect = {};

 //Get places in databse
$scope.provincelist = $http.get('http://localhost/PriceWiseWeb/productprice/place').
    then(function(response) { 
      $scope.provinces = response.data;

    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  

  // Popup for section of place/province, this popup show after loading
  var myPopup = $ionicPopup.show({
    template: '<select  name="provinceSelect" id="provinceSelect" ng-model="provinceSelect.ID"><option ng-repeat="province in provinces"  ng-model="selectedprovince" value="{{province.ID}}">{{ province.placeNAME }}</option></select>',
    title: 'Where are you from?',
    subTitle: 'Only for Region 10',
    scope: $scope,
    cssClass: 'myPopup',
    buttons: [
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.provinceSelect.ID) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
            console.log('ayu');
          } else {
            return $scope.provinceSelect.ID;
            console.log('guba');
          }
        }
      }
    ]
  });

  //Popup for section of place/province, this shows when click button paceModal
  $scope.placeModal = function(){
  var myPopup = $ionicPopup.show({
    template: '<select  name="provinceSelect" id="provinceSelect" ng-model="provinceSelect.ID"><option selected>Select</option><option ng-repeat="province in provinces"  ng-model="selectedprovince" value="{{province.ID}}">{{ province.placeNAME }}</option></select>',
    title: 'Where are you from?',
    subTitle: 'Only for Region 10',
    scope: $scope,
    cssClass: 'myPopup',
    buttons: [
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.provinceSelect.ID) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.provinceSelect.ID;
          }
        }
      }
    ]
  });

//Response of the popup for place
   myPopup.then(function(res) {
     $scope.uploaddata = $http.get('http://localhost/PriceWiseWeb/productprice/uploaddata/'+res).
    then(function(response) { 
      $scope.updata = response.data;
    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
     $scope.uploaddata = $http.get('http://localhost/PriceWiseWeb/productprice/placeid/'+res).
    then(function(response) { 
      $scope.places = response.data;

    }, function(response) {
     console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    $scope.pricelist = $http.get('http://localhost/PriceWiseWeb/productprice/pricebyplace/'+res).
    then(function(response) { 
      $scope.list = response.data;
    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  });
  }
  myPopup.then(function(res) {
     $scope.bud = {};
    var myPopupBudget = $ionicPopup.show({
    template: '<input type="text" ng-model="bud.amount">',
    title: 'Budget Amount',
    subTitle: 'Enter budget amount for this list.',
    cssClass: 'BudgetPopup',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.bud.amount) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.bud.amount;
          }
        }
      }
    ]
  });
 myPopupBudget.then(function(res) {
     $rootScope.amountBudget = res;
     console.log(res);
     console.log($rootScope.amountBudget);
  });
     $scope.uploaddata = $http.get('http://localhost/PriceWiseWeb/productprice/uploaddata/'+res).
    then(function(response) { 
      $scope.updata = response.data;

    }, function(response) {
      //console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
     $scope.uploaddata = $http.get('http://localhost/PriceWiseWeb/productprice/placeid/'+res).
    then(function(response) { 
      $scope.places = response.data;

    }, function(response) {
     console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    $scope.pricelist = $http.get('http://localhost/PriceWiseWeb/productprice/pricebyplace/'+res).
    then(function(response) { 
      $scope.list = response.data;
    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  });




 $scope.addToCart = function(product){
   MakeListService.add(product);
  };




 
  
})









.controller('ChatsCtrl', function($scope, $ionicPopup,$rootScope,AddCuzFactory,MakeListService) {
//$rootScope.cart = [];  
$rootScope.remainingBal = 0;
// $scope.cartList=ListCart;
// console.log(ListCart);
// console.log($scope.cartList);
$scope.cartList = MakeListService.getList();

//Push purchased/unpurchased product to $scope.purchase
  $scope.purchased = function(product) {
     product.status = 'purchased';
    $scope.purchased_Items.push(product); 
    $scope.cashout.push(angular.extend(product)); 
    $rootScope.cart.splice($rootScope.cart.indexOf(product), 1);
    $scope.purchases.push(angular.extend(product));
    console.log( $scope.purchases);
    console.log( $scope.purchased_Items);
  };
  $scope.unpurchased = function(product) {
     product.status = 'unpurchased';
    $rootScope.cart.splice($rootScope.cart.indexOf(product), 1);
    $scope.purchases.push(angular.extend(product));
    $scope.unpurchased_Items.push(product); 
    console.log( $scope.purchases);
    console.log( $scope.unpurchased_Items);
  };


 

   $scope.clear = function(product) {
     var confirmPopup = $ionicPopup.confirm({
    cssClass: 'ClearPopup',
     title: 'Clear All',
     template: 'Do you want to clear all?',
     cancelText: 'No',
        okText: 'Yes'
      }); 
      confirmPopup.then(function(res) {
     if(res) {        
                  for (var i=0; i<$rootScope.cart.length; i++) {
                    $rootScope.cart.splice(i,$rootScope.cart.length);
                  }
    
                  for (var i=0; i<$scope.purchases.length; i++) {
                    $scope.purchases.splice(i,$scope.purchases.length);
                  }
                  for (var i=0; i<$scope.purchased_Items.length; i++) {
                    $scope.purchased_Items.splice(i,$scope.purchased_Items.length);
                  }
                  for (var i=0; i<$scope.unpurchased_Items.length; i++) {
                    $scope.unpurchased_Items.splice(i,$scope.unpurchased_Items.length);
                  }
   
    console.log($scope.purchase);
    $scope.getCartPrice = function () {
    var total = 0;
    return total;
  };
 $scope.getCashOut = function () {
    var total = 0;
    return total;
  };
     } else {
       console.log('You are not sure');
     }
   });
  };
  
  $scope.addCutomize = function() {

   $scope.product = {}
   var myPopup = AddCuzFactory.getPopup($scope);
   // An elaborate, custom popup
   myPopup.then(function(res)  {
  if (res) {
          console.log('Tapped!', res);
          
          $scope.product.imageURL = 'img/customized.png';
           $scope.product.unitofmeasure = 'Piece';
          console.log($scope.product);
          MakeListService.add($scope.product);
          //$rootScope.cart.push(angular.extend($scope.product));
          console.log($rootScope.cart);
          //console.log(ListCart);
//console.log($scope.cartList);

      } else {

         console.log('You clicked on "Cancel" button');

      }
  });
  };  
  
})









.controller('AccountCtrl', function($scope,$http,$ionicPopup, $location,$rootScope,signupService,loginService,sessionService) {
 $scope.field = '';

console.log(loginService.isLoggedIn());
console.log(sessionService.get('islogin'));

  $scope.$on('$ionicView.beforeEnter', function () {

      if (sessionService.get('islogin') == 'TRUE') {
      $location.path('/tab/account')
      }
      else if (sessionService.get('islogin') == 'FALSE'){
          $location.path('/login')
      }
     else{
          $location.path('/login')

      } 
    });


$http.get('http://localhost/PriceWiseWeb/productprice/Option/1').
    then(function(response) { 
      $rootScope.Option = response.data;
      console.log($rootScope.Option);
    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    
$scope.logout = function(){
  loginService.logout();
   $scope.user= {};
  $location.path('/login');

  
 }

})

.controller('PriceFrezeInfoCtrl', function($q,$scope,$state,$ionicPopup,$http,$rootScope,loginService) {
})

.controller('OrgCtrl', function($q,$scope,$state,$ionicPopup,$http,$rootScope,loginService) {

  $http.get('http://localhost/PriceWiseWeb/productprice/Offices/').
    then(function(response) { 
      $rootScope.Offices = response.data;
      console.log($rootScope.Offices);
    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
})



.controller('LoginCtrl', function($q,$scope,$state,$ionicPopup,$http,$rootScope,loginService) {
 $scope.login = function(user) {
        loginService.login(user).success(function(data) {
            $state.go('tab.account');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
              cssClass: 'MovePopup',
                title: 'Login failed!',
                template: 'Please check your credentials!',

            });
        });
    }
$scope.guest = function(user) {
  $state.go('tab.dash');
}

$http.get('http://localhost/PriceWiseWeb/productprice/Option/1').
    then(function(response) { 
      $rootScope.Option = response.data;
      console.log($rootScope.Option);
    }, function(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

})

.controller('RegCtrl', function( $scope,$location,$state,$ionicPopup,signupService) {

 $scope.register = function(newAcc){
  signupService.signup(newAcc).success(function(data) { 
  $state.go('tab.account');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
               cssClass: 'MovePopup',
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
        }  
         $scope.registercancel = function(){
            $location.path('tab/dash')
          }
})


.controller('ListCtrl', function($scope,$http,$rootScope,$state,sessionService) {
  $scope.PrevList = [];
  var ID = sessionService.get('userID');
        
         $scope.$on('$ionicView.beforeEnter', function () {
          $http.get("http://localhost/PriceWiseWeb/productprice/List/"+ID)
        .then(function(response) {
                        console.log(response); 
                         $scope.PrevList = response.data;
                      }, function(response) {
                        console.log(response);
                      }); 
        }); 


        $scope.deleteItem = function(item){
         $scope.PrevList.splice($scope.PrevList.indexOf(item), 1);
          console.log(item.mobile_user_basketID);
          var ID = item.mobile_user_basketID;
           $http.delete("http://localhost/PriceWiseWeb/productprice/DeleteList/"+ID)
        }
$scope.reloadRoute = function() {
   $state.go($state.current, {}, {reload: true});
}


})

 

.controller('ListdetailCtrl', function($scope,$http,$rootScope,$stateParams,$location,$ionicPopup,sessionService) {
var ListID = $stateParams.listId;

$scope.UnpurchasedItems = [];
$http.get("http://localhost/PriceWiseWeb/productprice/ListUnpurchased/"+ListID)
        .then(function(response) {
                        console.log(response); 
                         $scope.UnpurchasedItems = response.data;
                      }, function(response) {
                        console.log(response);
                      }); 


$scope.PurchasedItems = [];
$http.get("http://localhost/PriceWiseWeb/productprice/ListPurchased/"+ListID)
        .then(function(response) {
                        console.log(response); 
                         $scope.PurchasedItems = response.data;
                      }, function(response) {
                        console.log(response);
                      }); 

$scope.getTotalPurchased = function () {
    var total = 0;
    $scope.PurchasedItems.forEach(function (product) {
      total += product.Price * product.Quantity;
    });
    return total;
  };

 
$scope.ListtoCart = function () {
   $scope.PurchasedItems.forEach(function (product) {
     product.name = product.ProductName;
     product.quantity = product.Quantity;
     product.price = product.Price;
     product.unitofmeasure = product.Unitofmeasure;
     product.imageURL = product.ImageURL;
      $rootScope.cart.push(angular.extend(product));
     console.log($rootScope.cart);
    });
  $ionicPopup.alert({
    cssClass: 'MovePopup',
     title: 'Moved',
     template: 'The List has successfully to move to Cart.'
   });
      $location.path('tab/chats');
 };

})



.factory("AddCuzFactory", function ($ionicPopup) {
   function getPopup(scope) {
     return $ionicPopup.show({
     templateUrl: 'templates/addproduct.html',
     cssClass: 'AddProductPopup',
     scope: scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!scope.product.name) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return scope.product.name;

           }
         }
       },
     ]
   })
   }
       
   return {
       getPopup: getPopup
   };   

})



.factory('sessionService',function($window,$ionicHistory){
    return {
      set:function(key,value){
        return $window.localStorage[key] = value;
      },
      get:function(key){
        return $window.localStorage[key] || defaultValue;
      },
      destroy:function(key){
       $window.localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      }
    };
})

.factory('signupService',function($http,$q,$ionicPopup,$state){
    return {
      signup:function(newAcc){
            var deferred = $q.defer();
            var promise = deferred.promise;
            if(newAcc){
                  $http.post("http://localhost/PriceWiseWeb/productprice/addUserMobile/" , newAcc)
                            .then(function(response) {
                              console.log(response);  
                              if (response.data == true) {
                                var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'You are '
            });
                                 alertPopup.then(function(res) {
     $state.go('login');
   });
                              } else {
                                 deferred.reject('Wrong credentials.');
                              }
                  });
            }
            else{
               deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
              promise.then(fn);
              return promise;
            }
            promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
            }
            return promise;
            }

    };

})
.factory('MakeListService',function($rootScope){
 $rootScope.cart = [];
    return {
      add:function(product){
       
       var found = false;
        
      $rootScope.cart.forEach(function (item) {
      if (item.productID === product.productID) {
       
          if(product.quantity){
            console.log( $rootScope.cart);
             item.quantity+product.quantity;
            found = true;
          }        
      }
    });
    if (!found) {
      
      $rootScope.cart.push(angular.extend(product));
      console.log( $rootScope.cart);
    }
      },
      getList:function(){
        return $rootScope.cart;
      },
      
    };
})
// .factory('CuzProductService',function($rootScope){
//  $rootScope.cart = [];
//  $rootScope.amountBudget = 0;
//     return {
//       add:function(product){
       
//        $scope.bud = {};

//   // An elaborate, custom popup
//   var myPopupBudget = $ionicPopup.show({
//     template: '<input type="text" ng-model="bud.amount">',
//     title: 'Budget Amount',
//     subTitle: 'Enter budget amount for this list.',
//     cssClass: 'BudgetPopup',
//     scope: $scope,
//     buttons: [
//       { text: 'Cancel' },
//       {
//         text: '<b>Save</b>',
//         type: 'button-positive',
//         onTap: function(e) {
//           if (!$scope.bud.amount) {
//             //don't allow the user to close unless he enters wifi password
//             e.preventDefault();
//           } else {
//             return $scope.bud.amount;
//           }
//         }
//       }
//     ]
//   });
//  myPopupBudget.then(function(res) {
//      $rootScope.amountBudget = res;
//      console.log(res);
//      console.log($rootScope.amountBudget);
//   });
//       },
//       getList:function(){
//         return $rootScope.cart;
//       },
      
//     };
// })
.factory('loginService',function($q,$http,$location,$ionicPopup,sessionService){
      return{
        login:function(user){
           var deferred = $q.defer();
            var promise = deferred.promise;
            if(user){
                  $http.post("http://localhost/PriceWiseWeb/productprice/doLogin/" , user).
                  then(function(response){
                    if (response.data != 'error') {
                      deferred.resolve('Welcome ' + name + '!');
                         var user =response.data;
                            console.log(user);
                             sessionService.set('userID',user.userID);
                             sessionService.set('username',user.username);
                             sessionService.set('usercompletename',user.completename);
                             sessionService.set('usercontact',user.contact);
                             sessionService.set('useremail',user.email);
                             sessionService.set('useraddress',user.address);
                             sessionService.set('islogin','TRUE');
                    } else {
                        deferred.reject('Wrong credentials.');
                    }
                   
                    });
                }
                else{
                  deferred.reject('Wrong credentials.');
                }
           promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        logout:function(){

          console.log(sessionService.get('islogin'));
          sessionService.destroy('userID');
          sessionService.destroy('username');
          sessionService.destroy('islogin');
          sessionService.set('islogin','FALSE');
          console.log(sessionService.get('islogin'));
        

        },
        isLoggedIn : function() {
        if(sessionService.get('islogin') == 'TRUE' ){
            return true;
           
        } 
        else if (sessionService.get('islogin') == 'FALSE'){
          return false;
            
        }

        else {
            return false;
           
        }
    }
       
      }
       
});


