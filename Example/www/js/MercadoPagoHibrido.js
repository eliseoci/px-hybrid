// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'mercadopago.services','mercadopago.controllers','ngResource', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope, MercadoPagoService, $ionicLoading) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar)
      StatusBar.styleDefault();

    // Saber plataforma para tracking
    $rootScope.platform=ionic.Platform.platform();

    //Agrego css
    var MpCss = document.createElement('style');
    MpCss.type = 'text/css';
    MpCss.innerHTML = '.custom-icon {/*font-size: 64px;*/color : rgb(29,159,222);} .MpBarra{color:red!default;background-color:rgb(29,159,222)!important;border-style: none!important;}.carrito{color:white;font-size: 26px;font-weight: bold;}.texto{font-size: 12pt;text-align: center;color:rgb(153,153,153);}.link{color:rgb(0,102,204);}.flecha{color:rgb(153,153,153);}.amarillo{color:rgb(178,144,84);}.pesos{font-size: 30pt;font-weight: bold;text-align: center; }.tic{font-size: 50px;font-weight: bold;text-align: center;}.header{font-size:13pt !important;font-weight: 200 !important;color:white!important;word-wrap:break-word!important}.opciones{font-size:12pt!important;color:rgb(102,102,102)!important;}.footer{font-size:11pt;color:rgb(153,153,153)!important;text-align: center;}.copy{font-size:9pt;color:rgb(153,153,153)!important;text-align: center;}.pagar{font-size: 15pt!important;text-align: center!important;font-weight: 200!important;}.textoinstru{font-size: 16pt!important;font-weight: 200!important;color:rgb(102,102,102)!important;}';
    document.getElementsByTagName('head')[0].appendChild(MpCss);

    //Agrego Js de Google Analytics
    var GoogleAnalyticsJs=document.createElement('script');
    GoogleAnalyticsJs.type="text/javascript";
    GoogleAnalyticsJs.innerHTML="(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-46085787-6', 'auto');ga('send', 'pageview');";
    document.getElementsByTagName('head')[0].appendChild(GoogleAnalyticsJs);

    $rootScope.MpPrefIdVisible=false;
    $rootScope.MpShowBack=true;
    $rootScope.MpCheckoutInfo=[];

    $rootScope.MpShowPrefId = function() {
      if ($rootScope.MpPrefIdVisible===true)
          $rootScope.MpPrefIdVisible=false;
      else
          $rootScope.MpPrefIdVisible=true;
    };
  });
})

.config(function($stateProvider,$ionicConfigProvider) {

  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
  $ionicConfigProvider.navBar.alignTitle('center'); //Alinear header en android

  var MpPaymentMethodSearch = {
    name: 'MercadoPago_PaymentMethodSearch',
    url: '/',
    cache: false,
    params: {
      flavour: {}
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpPaymentMethodSearchCtrl'};

  var MpPaymentMethodSearch2 = {
    name: 'MercadoPago_PaymentMethodSearch2',
    url: '/',
    cache: false,
    params: {
      flavour: {},
      paymentMethod: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpPaymentMethodSearch2Ctrl'};

  var MpCheckout = {
    name: 'MercadoPago_Checkout',
    url: '/',
    cache: false,
    params: {
      flavour: {}
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCheckoutCtrl'};

  var MpInstructions = {
    name: 'MercadoPago_Instructions',
    url: '/',
    cache: false,
    params: {
      flavour: {},
      instructionInfo: {},
      paymentInfo: {}
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpInstructionsCtrl'};

  var MpCongrats = {
    name: 'MercadoPago_Congrats',
    url: '/',
    params: {
      flavour: {},
      paymentInfo: {}

    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCongratsCtrl'};

  var MpCardForm = {
    name: 'MercadoPago_CardForm',
    url: '/',
    cache: false,
    params: {
      flavour: {},
      paymentMethod: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCardFormCtrl'};

  var MpCardIssuers = {
    name: 'MercadoPago_CardIssuers',
    url: '/',
    params: {
      flavour: {},
      paymentMethod: {},
      token: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCardIssuersCtrl'};

  var MpInstallments = {
    name: 'MercadoPago_Installments',
    url: '/',
    params: {
      flavour: {},
      paymentMethod: {},
      cardIssuer:{},
      token:{}
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpInstallmentsCtrl'};

  $stateProvider
    .state(MpCardForm)
    .state(MpPaymentMethodSearch)
    .state(MpPaymentMethodSearch2)
    .state(MpCheckout)
    .state(MpInstructions)
    .state(MpCongrats)
    .state(MpInstallments)
    .state(MpCardIssuers);

});
angular.module('mercadopago.services', [])
.factory('MercadoPagoService', function ($resource,$state,$ionicHistory,$rootScope,$ionicLoading,$q,$timeout) {

  var public_key,call,prefid,flavour,access_token;
  var errorNum=0;

  var getUUID= function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
  };

  var getPublickey=function(){
    return public_key;
  };

  var buscarDatos=function(){

    var deferred= $q.defer();
    getPrefId().get(function(pref){
      getPaymentMethodSearch().get(function(dato){
        $rootScope.datos=dato;
        $rootScope.prefid=pref;
        deferred.resolve(dato);
    },
    function(error){
      deferred.reject(error);
      console.log(error.status);
    });
  },function(error){
    deferred.reject(error);
  });
  return deferred.promise;
};

  var getPaymentMethodSearch=function(){
    return $resource("https://api.mercadopago.com/beta/checkout/payment_methods/search/options?public_key="+public_key, {}, {
    get: {
        method: 'GET',
        timeout: 10800,
    }});
  };
  var getInstructions= function(payment_id, payment_type){
    console.log(payment_id+" "+ payment_type);
    return $resource("https://api.mercadopago.com/beta/checkout/payments/"+payment_id+"/results?public_key="+public_key+"&payment_type="+payment_type, {}, {
    get: {
        method: 'GET',
        timeout: 8100,
    }});
  };
  var trackingOn=function(data){
    return $resource("https://api.mercadopago.com/beta/checkout/tracking",data, {
    save: {
        method: 'POST',
        timeout: 1000,
    }});
  };
  var trackingOff=function(data){
    return $resource("https://api.mercadopago.com/beta/checkout/tracking/off",data, {
    save: {
        method: 'POST',
        timeout: 1000,
    }});
  };
  var postPayment=function(data){

    return $resource("https://api.mercadopago.com/beta/checkout/payments",data, {
    save: {
        method: 'POST',
        timeout: 9800,
        headers: {'X-Idempotency-Key': getUUID(),'Content-Type':'application/json; charset=UTF-8'},
    }});
  };
  var createToken=function(data){
    return $resource("https://api.mercadopago.com/v1/card_tokens?public_key="+public_key,data, {
    save: {
        method: 'POST',
        timeout: 1000,
    }});
  };
  var getPrefId=function(){
    return $resource("https://api.mercadolibre.com/checkout/preferences/"+prefid+"?access_token="+access_token, {}, {
    get: {
        method: 'GET',
        timeout: 5800,
    }});
  };
  var startCheckout=function(callback){

    $ionicLoading.show({template: 'Cargando...'});
    call=callback;
    var promise=buscarDatos();

    promise.then(function(response){
      errorNum=0;
      $ionicLoading.hide();
      $rootScope.selectedPaymentMethod=undefined;
      $rootScope.MpCheckoutInfo=[];

      $state.go('MercadoPago_Checkout',
      {
       "flavour":3
      });

    }, function(error) {
      console.log(error);
      if (error.status==-1){
        if(errorNum<3){
          errorNum++;
          startCheckout();
        }
        else{
          alert("Intente devuelta");
          errorNum=0;
          $ionicLoading.hide();
        }
      }
  });
};
  var startRyc=function(callback, pm){

    $ionicLoading.show({template: 'Cargando...'});
    call=callback;
    var promise=buscarDatos();

    promise.then(function(){
      numeros=0;
      $ionicLoading.hide();
      $rootScope.selectedPaymentMethod=pm;

        $state.go('MercadoPago_Checkout',
        {
          "flavour":1,
        });

   }, function(error) {
     console.log(error);

     if (error.status==-1){
       if(errorNum<3){
         errorNum++;
         startRyc(callback,pm);
       }
       else {
         $ionicLoading.hide();
         alert("Intente devuelta");
         errorNum=0;
      }
    }
  });
};
  var startGrupos=function(callback){
    $ionicLoading.show({template: 'Cargando...'});
    call=callback;

    var promise=buscarDatos();
    promise.then(function(){
      errorNum=0;
      $ionicLoading.hide();

      $state.go('MercadoPago_PaymentMethodSearch', {
          "flavour":1
      });

    }, function(error) {
      console.log(error);
      if (error.status==-1){
        if(errorNum<3){
          errorNum++;
          startGrupos();
        }
        else {
          alert("Intente devuelta");
          errorNum=0;
          $ionicLoading.hide();
        }
      }
  });
};
  var startF2=function(callback){

    $ionicLoading.show({template: 'Cargando...'});
    call=callback;

    var promise=buscarDatos();
    promise.then(function(){
      errorNum=0;
      $ionicLoading.hide();
      $rootScope.selectedPaymentMethod=2;

      $state.go('MercadoPago_PaymentMethodSearch',
      {
       "flavour":2
      });

    }, function(error) {
      console.log(error);
      if (error.status==-1){
        if(errorNum<3){
          errorNum++;
          startF2();
        }
        else {
          alert("Intente devuelta");
          errorNum=0;
          $ionicLoading.hide();
        }
      }
    });
  };
  var startIns=function(callback, datos, f){
    console.log(datos);
    call=callback;
    getInstructions(datos.id,datos.payment_type_id).get(function(response){
      $ionicLoading.hide();
      errorNum=0;
      console.log(response);

      $state.go('MercadoPago_Instructions',
      {
         "flavour":f,
         "paymentInfo": datos,
         "instructionInfo":response
       });

    },function(error){
      console.log(error);
      if (error.status==-1){
        if(errorNum<3){
          errorNum++;
          startIns(callback,datos,f);
        }
        else {
          alert("Intente devuelta");
          errorNum=0;
          $ionicLoading.hide();
        }
      }
    });
  };
  var startCongrats=function(callback, datos, f){
        $ionicLoading.hide();
        call=callback;
        $state.go('MercadoPago_Congrats', {
         "flavour":f,
         "paymentInfo": datos});
  };

  var volver= function(flavour, datos, seguir){
    $rootScope.selectedPaymentMethod=undefined;
    if(flavour==3 && seguir===true){
      $ionicLoading.show({template: 'Cargando...'});
      if (datos[0]===undefined){ //medio off
        var pm=datos[1].id;
        if (datos[1].id=="redlink_bank_transfer"||datos[1].id=="redlink_atm")pm="redlink";

          postPayment().save({
            "public_key":public_key,
            "payment_method_id":pm,
            "pref_id":prefid,
            "email":"test-email@email.com"},function(response){
              if (datos[1].id=="redlink_bank_transfer")
                response.payment_type_id="bank_transfer";

              trackingOff().save({
                "public_key":getPublickey(),
                "payment_id":response.id,
                "sdk_flavor":flavour,
                "sdk_platform":$rootScope.platform,
                "sdk_type":"hybrid",
                "sdk_framework":"ionic",
                "sdk_version":"1.0"
              },function(response){
                console.log("tracking",response);
              },function(error){
                console.log(error);
              });
              startIns(call,response,3);

          }, function(error){
              $ionicLoading.hide();
              if (error.status==400){
                console.log(error.data.message);
                alert(error.data.message);
              }
              else {
                console.log(eror);
                alert("Intente nuevamente");
              }
          });
        }
    else {
          postPayment().save({ //online
            "public_key":public_key,
            "payment_method_id":datos[1].id,
            "pref_id":prefid,
            "email":$rootScope.prefid.payer.email,
            "token":datos[0].id,
            "issuer_id":datos[2].id,
            "installments":datos[3]},function(response){
              startCongrats(call,response,3);

            }, function(error){
              $ionicLoading.hide();
              if (error.status==400){
                console.log(error.data.message);
                alert(error.data.message);
              }
              else {
                console.log(eror);
                alert("Intente nuevamente");
              }
            });
        }
      }

  else{
    $ionicHistory.goBack(-1*($ionicHistory.currentView().index));
    if (call!==null)
      call(datos);
  }
};

    return {
      getPaymentMethods:function(){
        return $resource("https://api.mercadopago.com/v1/payment_methods?public_key="+public_key, {}, {
        get: {
            method: 'GET',
            timeout: 10000,
            isArray:true,
        }});
      },
      getIssuers:function(pmid,bin){
        return $resource("https://api.mercadopago.com/v1/payment_methods/card_issuers?public_key="+public_key+"&payment_method_id="+pmid+"&bin="+bin,{}, {
        get: {
            method: 'GET',
            timeout: 10000,
            isArray: true
        }});
      },
      getInstallments:function(pmid,issuid,amm){
        return $resource("https://api.mercadopago.com/v1/payment_methods/installments?public_key="+public_key+"&payment_method_id=:payment_method_id&issuer.id=:issuer&amount=:ammount",{ payment_method_id: pmid,ammount:amm,issuer:issuid},{
        get: {
            method: 'GET',
            timeout: 10000,
            isArray: true
        }});
      },
      getIdentificationTypes:function(){
        return $resource("https://api.mercadopago.com/v1/identification_types?public_key="+public_key, {}, {
        get: {
            method: 'GET',
            timeout: 10000,
            isArray: true
        }});
      },
      getBankDeals:function(){
        return $resource("https://api.mercadopago.com/v1/payment_methods/deals?public_key="+public_key, {}, {
        get: {
            method: 'GET',
            timeout: 10000,
            isArray: true
        }});
      },

      createPayment:function(YOUR_BASE_URL, YOUR_PAYMENT_URI,data){
        return $resource(YOUR_BASE_URL+YOUR_PAYMENT_URI,data);
      },
      createPrefId:function(YOUR_BASE_URL, YOUR_PAYMENT_URI,data){
        return $resource(YOUR_BASE_URL+YOUR_PAYMENT_URI,data);
      },
      getPaymentMethodSearch:getPaymentMethodSearch,
      setPrefId:function(dato){
        prefid=dato;
      },
      getPublickey:getPublickey,
      setAccessToken:function(dato){
        access_token=dato;
      },
      setPublicKey:function(dato){
        public_key=dato;
      },
      postPayment:postPayment,
      getInstructions:getInstructions,
      getPrefId:getPrefId,
      startIns:startIns,
      createToken:createToken,
      trackingOn:trackingOn,
      trackingOff:trackingOff,
      getTotal:function(prefid){
        var precio=0;
        for(i=0;i<prefid.items.length;i++)
          precio+=prefid.items[i].unit_price;
        return precio;
      },
      startCheckout:startCheckout,
      startF2:startF2,
      startGrupos:startGrupos,
      startRyc:startRyc,
      volver:volver,
  };
});

angular.module('mercadopago.controllers', [])
.controller('MpCardIssuersCtrl', function($scope, MercadoPagoService,$state, $stateParams){

  $scope.HTML=" <ion-nav-bar class='MpBarra bar-positive'><ion-nav-title>{{header}}</ion-nav-title><ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons><ion-nav-buttons side='left' class='button-clear' ng-show='MpShowBack'><i class='ion-ios-arrow-back carrito' ng-click='$ionicGoBack()' style='padding:5px; display:block;width:200px'></i></ion-nav-buttons><ion-content class='has-header'<div class='list'><div class='item' ng-repeat='cardIssuer in cardIssuers' ng-click='selectedCardIssuer(cardIssuer)'><img src='{{cardIssuer.thumbnail}}' width='50' height='19' style='margin-right: 20px;'>{{cardIssuer.name}}</div></div></ion-content>";
  $scope.header="Selecciona el banco";
  // ga('send', 'pageview', 'Card Issuers');
  var errorNum=0;

  $scope.getIssuer=function(){
    MercadoPagoService.getIssuers($stateParams.paymentMethod.id, $stateParams.token.first_six_digits).get(function(data) {
      errorNum=0;
      if (data.length==1)
        $scope.selectedCardIssuer(data[0]); //si es uno solo que elija ese directo
      else
        $scope.cardIssuers = data;
    },function(error){
      console.log(error);
      if(errorNum<3){
        errorNum++;
        $scope.getIssuer();
    } else{
        alert("Intente devuelta");
        errorNum=0;
      }
  });
};
  $scope.getIssuer();

  $scope.selectedCardIssuer = function(issuer) {
    $state.go('MercadoPago_Installments',
      {
         "cardIssuer": issuer,
         "paymentMethod": $stateParams.paymentMethod,
         "token": $stateParams.token,
         "flavour": $stateParams.flavour,
      });
  };
})
.controller('MpInstallmentsCtrl', function($scope, MercadoPagoService, $stateParams,$rootScope,$ionicHistory){
  //console.log("ins",$ionicHistory.currentView());

  $scope.HTML=" <ion-nav-bar class='MpBarra bar-positive'><ion-nav-title>{{header}}</ion-nav-title><ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons><ion-nav-buttons side='left' class='button-clear' ng-show='MpShowBack'><i class='ion-ios-arrow-back carrito' ng-click='$ionicGoBack()' style='padding:5px; display:block;width:200px'></i></ion-nav-buttons><ion-content class='has-header'<div class='list'><div class='item' ng-repeat='installment in installments.payer_costs' ng-click='selectedInstallment(installment)'>{{installment.recommended_message}}</div></div></ion-content>";
  $scope.header="Selecciona las cuotas";

  // ga('send', 'pageview', 'installments');

  var errorNum=0;
  $scope.total=MercadoPagoService.getTotal($rootScope.prefid);

  MercadoPagoService.getInstallments($stateParams.paymentMethod.id, $stateParams.issuer.id, $scope.total).get(function(data) {
    $scope.installments = data[0];
    console.log(data);
    errorNum=0;
  },function(error){
      console.log(error);
      if(error.status==-1){
        if(errorNum<3){
          errorNum++;
          $scope.getInstallments($stateParams.paymentMethod.id, $stateParams.issuer.id, $scope.total);
        }else{
          alert("Intente devuelta");
          errorNum=0;
      }
    }
  });

  $scope.selectedInstallment = function(installment) {
    var datos=[];
    datos.push($stateParams.token);
    datos.push($stateParams.paymentMethod);
    datos.push($stateParams.issuer);
    datos.push(installment.installments);
    datos.push(installment);
    $rootScope.MpCheckoutInfo=datos;
    if ($stateParams.flavour==2)
      MercadoPagoService.volver($stateParams.flavour,datos,true);
    else {
      $rootScope.selectedPaymentMethod=$stateParams.paymentMethod; //si es f3 vuelvo a ryc
      $ionicHistory.goBack(-1*($ionicHistory.currentView().index-1));
    }
  };
})

.controller('MpCardFormCtrl', function($scope, MercadoPagoService,$state, $stateParams,$rootScope){

  $scope.HTML=" <ion-nav-bar class='MpBarra bar-positive'><ion-nav-title>{{header}}</ion-nav-title><ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons><ion-nav-buttons side='left' class='button-clear' ng-show='MpShowBack'><i class='ion-ios-arrow-back carrito' ng-click='$ionicGoBack()' style='padding:5px; display:block;width:200px'></i></ion-nav-buttons><ion-content class='has-header' animation='slide-left-right'  scroll='true' has-bouncing='true'><form ng-submit='createToken()'  ><div class='list'><label class='item item-input'><span class='input-label'>Card Number</span><img ng-show='mostrarIcono'ng-src='{{keyPress().thumbnail}}'style='padding: 0px 10px'><input type='number' id='cardNumber' ng-model='card_token.card_number' ng-keyup='keyPress($event.keyCode)' placeholder='4509 9535 6623 3704'></label><label class='item item-input'><span class='input-label'>Cardholder Name</span><input type='text' id='cardholderName' ng-model='card_token.cardholder.name' placeholder='APRO'></label><label class='item item-input'><span class='input-label'>Expiration Date</span><input type='Month' id='cardExpirationMonth' ng-model='card_token.expiration_month' placeholder='MM AAAA'> </label><label class='item item-input item-select'><div class='input-label'>Document Type</div><select id='docType' ng-model='card_token.cardholder.identification.type' ng-options=' identification_type.name for identification_type in identification_types'><option value=''>Seleccionar</option></select></label><label class='item item-input'><span class='input-label'>Document number</span><input type='number' id='docNumber' ng-model='card_token.cardholder.identification.number' placeholder='12345678'></label><label class='item item-input'><span class='input-label'>Security Code</span><input type='number' id='securityCode' ng-model='card_token.security_code' placeholder='123'></label><center><br><button type='submit' class='button   button-balanced' style='padding:0px 100px;'>Pagar</button></center></div></form></ion-content>";
  $scope.header="Datos de tu tarjeta";

  // ga('send', 'pageview', 'Card Form');

  $scope.mostrarIcono=false; //mostrar que tarjeta es
  var errorNum=0;
  $scope.getIdentificationTypes=function(){
  MercadoPagoService.getIdentificationTypes().get(function(data) {
    $scope.identification_types = data;
    errorNum=0;
  },function(error){
    console.log(error);
    if(error.status==-1){
      if(errorNum<3){
        errorNum++;
        $scope.getIdentificationTypes();
      }else{
        alert("Intente devuelta");
        errorNum=0;
      }
    }
    });
  };
  $scope.getIdentificationTypes();

  $scope.card_token={};

  $scope.sacarBins=function(num, card){
    var bin=[""]; var a=0;
    if ($rootScope.datos.payment_methods[num].payment_type_id=="credit_card"||$rootScope.datos.payment_methods[num].payment_type_id=="debit_card"){
    for (i=1;i<($rootScope.datos.payment_methods[num].settings[0].bin.pattern.length);i++){ //saco los numeros
      if ($rootScope.datos.payment_methods[num].settings[0].bin.pattern[i]!='('&& $rootScope.datos.payment_methods[num].settings[0].bin.pattern[i]!=')'){
         if ($rootScope.datos.payment_methods[num].settings[0].bin.pattern[i]!='|'){
           bin[a]+=$rootScope.datos.payment_methods[num].settings[0].bin.pattern[i];
      }
        else{
          a++;
          bin[a]="";
        }
      }
    }
    if (bin[0].length===0)
      return false;

    for(i=0;i<bin.length;i++){
      if(bin[i]==(card-card%Math.pow(10,6-bin[i].length))/Math.pow(10,6-bin[i].length)) //los comparo con la tarjeta
        return true;
    }
    return false;
  }
  else
    return false;
  };
  $scope.sacarExclusiones=function(num,card){
    var bin=[""]; var a=0;
    if ($rootScope.datos.payment_methods[num].payment_type_id=="credit_card"||$rootScope.datos.payment_methods[num].payment_type_id=="debit_card"){
    for (i=1;i<($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern.length);i++){ //saco los numeros
      if ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i]!='('&& $rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i]!=')'){
         if ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i]!='|'){
        bin[a]+=$rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i];
      }
        else{
          a++;
          bin[a]="";
        }
      }

    }
    if (bin[0].length===0)
      return true;
    for(i=0;i<bin.length;i++){
      if(bin[i]==(card-card%Math.pow(10,6-bin[i].length))/Math.pow(10,6-bin[i].length)) //los comparo con la tarjeta
        return false;
    }
    return true;
  }
  else
    return false;
};
var MpCardNumberBefore="";
  $scope.keyPress = function(keyCode){
    if($scope.card_token.card_number!=undefined&&($scope.card_token.card_number+'').length >=6 && MpCardNumberBefore!=$scope.card_token.card_number){
      $scope.mostrarIcono=true;
    var base=Math.pow(10,($scope.card_token.card_number+'').length-6);
    var num= ($scope.card_token.card_number-$scope.card_token.card_number%base)/base;

    var i=($rootScope.datos.payment_methods.length)-1;

    while(i>=0){
        if ($scope.sacarExclusiones(i,num)&&$scope.sacarBins(i,num)){
          return $rootScope.datos.payment_methods[i];
        }
      i--;
    }
    $scope.mostrarIcono=false;
     MpCardNumberBefore=$scope.card_token.card_number;
  }
  else if($scope.card_token.card_number===undefined||($scope.card_token.card_number+'').length <=6){
    $scope.mostrarIcono=false;
    return "";
  }

};
  $scope.createToken = function() {
    var month= new Date($scope.card_token.expiration_month);

    var token={
      "card_number": "4556364421355272",
      "security_code": "123",
      "expiration_month": 4,
      "expiration_year": 2020,
      "cardholder": {
      "name": "APRO",
      "identification": {
        "subtype": null,
        "type": "DNI",
        "number": "12345678"}}
    };


  if ($scope.card_token.card_number!=undefined)
    token.card_number=$scope.card_token.card_number;
  else
    $scope.card_token.card_number=token.card_number;
  if($scope.card_token.cardholder!=undefined){
    if($scope.card_token.cardholder.name!=undefined)
      token.cardholder.name=$scope.card_token.cardholder.name;
    if($scope.card_token.cardholder.identification!=undefined){

        if($scope.card_token.cardholder.identification.type!=undefined)
          token.cardholder.identification.type=$scope.card_token.cardholder.identification.type.id;
        if($scope.card_token.cardholder.identification.number!=undefined)
            token.cardholder.identification.number=""+$scope.card_token.cardholder.identification.number+"";
      }
  }
  // if($scope.card_token.expiration_year!=undefined)
  //   token.expiration_year=$scope.card_token.expiration_year;
  // if($scope.card_token.expiration_month!=undefined)
  //   token.expiration_month=$scope.card_token.expiration_month;
  if($scope.card_token.security_code!=undefined)
    token.security_code=""+$scope.card_token.security_code+"";


//  if ($scope.card_token.cardholder!=undefined){
//   $scope.card_token.cardholder.identification.number=""+$scope.card_token.cardholder.identification.number+"";
//   $scope.card_token.security_code=""+$scope.card_token.security_code+"";
// }

MercadoPagoService.createToken().save(token,function(token){
  console.log(token);
  var body={
     //online
      "public_key":MercadoPagoService.getPublickey(),
      "token":token.id,
      "sdk_flavor":$stateParams.flavour,
      "sdk_platform":$rootScope.platform,
      "sdk_type":"hybrid",
      "sdk_framework":"ionic",
      "sdk_version":"1.0"
  };
  MercadoPagoService.trackingOn().save(body,function(response){
    console.log("tracking",response);
  },function(error){
    console.log(error);
  });
  $state.go('MercadoPago_CardIssuers',{
    'paymentMethod':$scope.keyPress(),
    'token': token,
    "flavour": $stateParams.flavour,});
  });
  };
})

.controller('MpPaymentMethodSearchCtrl', function($scope, MercadoPagoService,$state, $stateParams, $rootScope,$ionicHistory, $ionicLoading){

  $scope.HTML=" <ion-nav-bar class='MpBarra bar-positive'><ion-nav-title>{{header}}</ion-nav-title><ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons><ion-nav-buttons side='left' class='button-clear' ng-show='MpShowBack'><i class='ion-android-arrow-back carrito' ng-click='irparaatras()' style='padding:5px; display:block;width:200px'></i></ion-nav-buttons><ion-content class='has-header' style='background-color:rgb(244,244,244)'><div ng-show='MpPrefIdVisible==true'class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{titulo}}<img ng-src='{{imagen}}'><br>{{total | currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px'><div  id= 'l'class='item item-icon-left item-icon-right opciones' ng-repeat='grupo in grupos' ng-click='selectedGrupo(grupo)'><i class=' icon {{grupo.icon}} custom-icon'></i>{{grupo.description}}<i class='icon ion-ios-arrow-right flecha'></i></div></div><br><footer></footer></ion-content>";
  $scope.header="¿Comó quieres pagar?";

  // ga('send', 'pageview', '/Grupos');


  $scope.titulo=$rootScope.prefid.items[0].title; // seteo el prefid para el carrito
  $scope.imagen=$rootScope.prefid.items[0].picture_url;
  $scope.total=MercadoPagoService.getTotal($rootScope.prefid);

  $rootScope.MpShowBack=true; //mostrar la flecha de atras

  $rootScope.datos.groups[0].icon="ion-card "; //Agrego iconos
  $rootScope.datos.groups[1].icon="ion-cash ";
  $rootScope.datos.groups[2].icon="ion-ios-locked ";

  $scope.grupos=$rootScope.datos.groups;

  $rootScope.$ionicGoBack=function(){
    if ($rootScope.selectedPaymentMethod==undefined && $state.current.name=='MercadoPago_PaymentMethodSearch')
      $ionicHistory.goBack(-2);
    else
      $ionicHistory.goBack(-1);
  };

  $scope.irparaatras=function(){
    $rootScope.$ionicGoBack();
  };

  $scope.Salir=function(){
    MercadoPagoService.volver($stateParams.flavour,"cancelo"); //cancelar y salir
  };
  $scope.selectedGrupo = function(pm) {

    if(pm.children==null){
      if($stateParams.flavour==1)
        MercadoPagoService.volver($stateParams.flavour, pm); //devuelvo el resultado sino hay childs y f2 gris

    else if (pm.id=="credit_card"){
        $state.go('MercadoPago_CardForm', {
          "paymentMethod": pm,
          "flavour":$stateParams.flavour,});
      }
    }
    else{
      $state.go('MercadoPago_PaymentMethodSearch2', {
        "paymentMethod": pm,
        "flavour":$stateParams.flavour,});
    }
  };
  })
.controller('MpPaymentMethodSearch2Ctrl', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory, $rootScope){

  $scope.HTML=" <ion-nav-bar class='MpBarra bar-positive'><ion-nav-title>{{header}}</ion-nav-title><ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons><ion-nav-buttons side='left' class='button-clear' ng-show='MpShowBack'><i class='ion-ios-arrow-back carrito' ng-click='$ionicGoBack()' style='padding:5px; display:block;width:200px'></i></ion-nav-buttons><ion-content class='has-header'style='background-color:rgb(244,244,244)'><div ng-show='MpPrefIdVisible==true'class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{titulo}}<img ng-src='{{imagen}}'><br>{{total| currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px'><div  id= 'l'class='item item-icon-right' ng-repeat='grupo in grupos' ng-click='elegir(grupo)' style='padding: 10px'><div style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px' class='opciones' ><img id= 'im' ng-src='{{getImagen(grupo)}}' style='padding: 0px 10px 0px 0px'>{{grupo.description}}</div><br><div class='footer' style='text-align: left'>{{grupo.comment}} </div><i class='icon ion-ios-arrow-right flecha'></i></div></div><footer></footer></ion-content>";
  $scope.header=$stateParams.paymentMethod.children_header;

  // ga('send', 'pageview', 'Grupos2');

  $scope.titulo=$rootScope.prefid.items[0].title; //preferencia
  $scope.imagen=$rootScope.prefid.items[0].picture_url;
  $scope.total=MercadoPagoService.getTotal($rootScope.prefid);

  $scope.grupos=$stateParams.paymentMethod.children; //agarro las paymentMethodes

  $scope.getImagen=function(pm){ //buscar imagenes de los pm
    var id=pm.id;
  if (pm.show_icon==true){
    if(id=="redlink_bank_transfer"||id=="redlink_atm") id="redlink";
      for(a=0;a<$rootScope.datos.payment_methods.length;a++){
        if($rootScope.datos.payment_methods[a].id==id){
          pm.thumbnail=$rootScope.datos.payment_methods[a].thumbnail;
          return $rootScope.datos.payment_methods[a].thumbnail;
        }
      }
    }
  };

  $scope.Salir=function(){ //cancelar
    MercadoPagoService.volver($stateParams.flavour,"cancelo");
  };

  $scope.elegir=function(pm){
    if ($stateParams.flavour==1)
      MercadoPagoService.volver($stateParams.flavour, pm); //volver si es f2 gris

    else if ($stateParams.flavour==2){ //datos de f2
      var datos=[];
      datos.push($scope.token);
      datos.push(pm);
      datos.push($scope.issuer);
      datos.push($scope.payer_cost);
      MercadoPagoService.volver($stateParams.flavour,datos);
    }
    else {
      $rootScope.selectedPaymentMethod=pm; //si es f3 vuelvo a ryc
      $rootScope.MpCheckoutInfo[0]=undefined;
      $ionicHistory.goBack(-2);
    }
  };
  })
.controller('MpCheckoutCtrl', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory,$rootScope){

  $scope.HTML="<ion-nav-bar class='MpBarra bar-positive'><ion-nav-title>{{header}}</ion-nav-title><ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons></ion-nav-bar><ion-content class='has-header' style='background-color:rgb(244,244,244)'><div class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{titulo}}<img ng-src='{{imagen}}'><br>{{total | currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px;border-bottom: none'><div  id= 'l'class='item item-icon-right' ng-click='goBack()' style='padding: 10px;border: none'><div style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px' class='opciones'><img id= 'im' ng-src='{{getImagen(grupos)}}' style='padding: 0px 10px 0px 0px'>{{grupos.description}}</div><br><div class='footer' style='text-align: left'>{{grupos.comment}} </div><i class='icon ion-ios-arrow-right flecha'></i></div><div  id= 'l'class='item item-icon-right' ng-if='on==true' style='padding: 10px;'><div class='opciones'style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px;font-weight: 200; text-align: left;color:rgb(0,159,222)!important'>{{cuotas}}<i class='texto' style='color:rgb(67,176,0);text-align: left;'ng-show='intereses'>Sin intereses</i></div><br><div class='footer' style='text-align: left'> </div></div></div><div class='opciones'style='height: 40pt;background-color:rgb(244,244,244);vertical-align: middle; font-size: 16pt;line-height: 40pt; border-bottom: 2pt;border-bottom-color: rgb( 222,222,222);  border-style:solid; text-align: center;font-weight: 200;word-spacing-spacing: 1.5px'>Total a pagar: {{total| currency}}</div><br><div class='copy' style='padding: 0px 20px'><p>    Al pagar, afirmo que soy mayor de edad y acepto los <a class='link'>Términos y Condiciones</a> de MercadoPago.</p></div><div style='padding: 0px 10px 0px 10px'><button class='button button-block button-positive pagar' style='background-color:rgb(0,159,222)' ng-click='pagar()'>Pagar</button></div><footer></footer></ion-content>";
  $scope.header="Revisa si está todo bien…";

  //ga('send', 'pageview', '/RyC');

  $rootScope.MpShowBack=false; //no mostrar flecha atras
  $scope.on=false; //si es pago on
  $scope.intereses=false;

  $scope.grupos=$rootScope.selectedPaymentMethod; //muestro la paymentMethod elegida

  $scope.titulo=$rootScope.prefid.items[0].title; //muestro la compra
  $scope.imagen=$rootScope.prefid.items[0].picture_url;
  $scope.total=MercadoPagoService.getTotal($rootScope.prefid);

  if($scope.grupos!=undefined && $rootScope.MpCheckoutInfo[0]!=undefined){ //seteo si es un pago on
    $scope.cuotas=$rootScope.MpCheckoutInfo[4].installments+" cuotas de $"+ $rootScope.MpCheckoutInfo[4].installment_amount+ " ";
    if ($rootScope.MpCheckoutInfo[4].installment_rate==0)
      $scope.intereses=true;
    $scope.grupos.description="terminada en "+ $rootScope.MpCheckoutInfo[0].last_four_digits;
    $scope.on=true;
  }

  if($rootScope.selectedPaymentMethod==undefined){ //va directo a grupos apenas entro con f3
    $state.go('MercadoPago_PaymentMethodSearch', {
          "flavour":$stateParams.flavour});
  }

  $scope.getImagen=function(pm){ //agrego la imagen a la paymentMethod
    if(pm!=undefined){
      var id=pm.id;
      if (true){ //show icon true
      if(id=="redlink_bank_transfer"||id=="redlink_atm") id="redlink";
        for(a=0;a<$rootScope.datos.payment_methods.length;a++){
          if($rootScope.datos.payment_methods[a].id==id)
            return $rootScope.datos.payment_methods[a].thumbnail;
        }
      }
    }
  };
  $scope.Salir=function(){ //volver si cancelo
    MercadoPagoService.volver($stateParams.flavour,"cancelo");
  };
  $scope.goBack = function() {
    if($stateParams.flavour==1) //editar paymentMethod elegida si es f2 gris, devuelvo false
      MercadoPagoService.volver($stateParams.flavour,"false");
    else{
      $rootScope.MpShowBack=true; //mostrar atras si es f3
      $state.go('MercadoPago_PaymentMethodSearch', {
          "flavour":$stateParams.flavour});
    // }
    // $state.go('MercadoPago_Installments',{
    //      "cardIssuer": $rootScope.MpCheckoutInfo[2],
    //      "paymentMethod": $scope.grupos,
    //      "token": $rootScope.MpCheckoutInfo[0],
    //      "flavour": $stateParams.flavour,
    //     // "issuer_id": issuer.id
    //   });
    }
  };

  $scope.pagar=function(){
    $rootScope.MpShowBack=true; //mostrar flecha atras

    if($stateParams.flavour==1) // devuelvo true si es f2 gris
      MercadoPagoService.volver($stateParams.flavour,"true");

    else{
      var datos=[]; //ir a pagar
      datos.push($rootScope.MpCheckoutInfo[0]); //token
      datos.push($scope.grupos); //pm
      datos.push($rootScope.MpCheckoutInfo[2]);
      datos.push($rootScope.MpCheckoutInfo[3]);

      MercadoPagoService.volver($stateParams.flavour,datos,true);
    }
  };
})
.controller('MpInstructionsCtrl', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory, $rootScope){

  $scope.HTML="<ion-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style=' background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 20px 16pt 20pt 16pt;' class='textoinstru'><i class='icon ion-social-usd pesos' style='color:rgb(239,199,1); padding:40pt'></i><br class='textoinstru'>{{titulo}}</div><div class='card'><div class='item item-text-wrap opciones' style='text-align: left;width:100%;display:inline-block;border: none'><div ng-repeat='in in infos track by $index'>{{in}}<br></div><br><div ng-repeat='reference in references'><div class='copy'style='font-weight: 200; text-align: left;'>{{reference.label}}</div><div class='textoinstru'style='text-align: left; letter-spacing: 1.5px;padding:5px 0px 5px 0px'>{{value(reference)}}</div></div></div><div class='item item-text-wrap opciones' style=' background-color:rgb(244,244,244); text-align: left;'>{{second}}</div><div class='item item-text-wrap texto item-icon-left amarillo' style=' background-color:rgb(244,244,244); text-align: left;border-style: none; color:rgb(178,144,84);font-weight: 200'><i>{{accreditation_message}}</i><i class='icon ion-ios-clock-outline amarillo'></i></div></div><footer></footer></ion-content></ion-view>";

  $scope.titulo=$stateParams.instructionInfo.title;
  $scope.accreditation_message=$stateParams.instructionInfo.accreditation_message;
  $scope.infos=$stateParams.instructionInfo.info;
  $scope.references=$stateParams.instructionInfo.references;
  $scope.second=$stateParams.instructionInfo.secondary_info[0];


  $scope.value=function (reference) { //junto los datos de field_value
    var resultado="";

    for (i=0;i<reference.field_value.length;i++)
    if(reference.separator!=null){
      resultado+=reference.field_value[i]+reference.separator;
    }
      else {
        resultado+=reference.field_value[i];
      }
    return resultado;
  };
  $scope.Salir=function(){ //salir de la pantalla
    MercadoPagoService.volver($stateParams.flavour,$stateParams.paymentInfo,false);
  };
})
.controller('MpCongratsCtrl', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory, $rootScope){

//ga('send', 'pageview', 'Congrats');
  $scope.getImagen=function(){ //buscar imagenes de los pm
    var pm=$stateParams.paymentInfo.payment_method_id;
    if(pm=="redlink_bank_transfer"||pm=="redlink_atm") pm="redlink";
      for(a=0;a<$rootScope.datos.payment_methods.length;a++){
        if($rootScope.datos.payment_methods[a].id==pm){
          return $rootScope.datos.payment_methods[a].thumbnail;
      }
    }
  };
  $scope.total=MercadoPagoService.getTotal($rootScope.prefid);

  console.log($stateParams.paymentInfo);

  $scope.finalTarjeta=$stateParams.paymentInfo.card.last_four_digits;
  $scope.cuotas=$stateParams.paymentInfo.installments;
  $scope.cuanto=$stateParams.paymentInfo.transaction_details.installment_amount;
  $scope.comprobante=$stateParams.paymentInfo.id;
  $scope.intereses=function(){
    for (i=0;i<$stateParams.paymentInfo.fee_details.length;i++){
      if ($stateParams.paymentInfo.fee_details[i].type=="financing_fee")
        return false;
    }
    return true;
  };
  $scope.titulo="";
  $scope.subtitulo="";
  $scope.nombre=$stateParams.paymentInfo.statement_descriptor;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  var pmid=$stateParams.paymentInfo.payment_method_id;
  pmid=capitalizeFirstLetter(pmid);
  $scope.pmid=pmid;

  switch ($stateParams.paymentInfo.status_detail) {
    case "accredited":
      $scope.titulo="";
      $scope.subtitulo="";
      break;
    case "pending_contingency":
      $scope.titulo="Estamos procesando el pago";
      $scope.subtitulo="En menos de 1 hora te enviaremos por e-mail el resultado.";

      break;
    case "pending_review_manual":
      $scope.titulo="Estamos procesando el pago";

      $scope.subtitulo="En menos de 2 días hábiles te diremos por e-mail si se acreditó o si necesitamos más información.";
      $scope.subtitulo="En poquitas horas te diremos por e-mail si se acreditó o si necesitamos más información.";
      break;
    case "rejected_high_risk":
      $scope.titulo="Por seguridad, tuvimos que rechazar tu pago";
      $scope.subtitulo="Si quieres pagar con el dinero de tu cuenta, contáctate con Atención al Cliente de MercadoPago. O si prefieres, puedes elegir otro medio de pago.";
        break;
    case "cc_rejected_insufficient_amount":
      $scope.titulo="Tu "+pmid+" no tiene fondos suficientes";
      $scope.subtitulo="¡No te desanimes! Recárgala en cualquier banco o desde tu banca electrónica e inténtalo de nuevo. O si prefieres, puedes elegir otro medio de pago.";
        break;
    case "cc_rejected_other_reason":
      $scope.titulo=""+pmid+" no procesó el pago";
      $scope.subtitulo="Usar otra tarjeta u otro medio de pago.";
        break;
    case "cc_rejected_max_attempts":
      $scope.titulo="Llegaste al límite de intentos permitidos";
      $scope.subtitulo="Elige otra tarjeta u otro medio de pago.";
        break;
    case "cc_rejected_call_for_authorize":
      $scope.titulo="";
      $scope.subtitulo="";
        break;
    case "cc_rejected_duplicated_payment":
      $scope.titulo=""+pmid+" no procesó el pago";
      $scope.subtitulo="Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.";
      break;
    case "cc_rejected_card_disabled":
      $scope.titulo="Llama a "+pmid+" para que active tu tarjeta";
      $scope.subtitulo="El teléfono está al dorso de tu tarjeta.";
      break;
    case "cc_rejected_bad_filled_other":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="Algún dato de tu "+pmid+" es incorrecto.";
      break;
    case "cc_rejected_bad_filled_card_number":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="El número de tu "+pmid+" es incorrecto.";
      break;
    case "cc_rejected_bad_filled_security_code":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="El código de seguridad no es el correcto.";
      break;
    case "cc_rejected_bad_filled_date":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="La fecha de vencimiento no es la correcta.";
      break;
    default:

  }
  $scope.Volver=function(){
    $ionicHistory.goBack(-4);
  };

  $scope.Salir=function(){
    MercadoPagoService.volver($stateParams.flavour,$rootScope.datos,false);
  };
  if ($stateParams.paymentInfo.status_detail=="cc_rejected_call_for_authorize")
  $scope.HTML="<ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div class='textoinstru' style=' background-color:rgb(228,242,249);border-bottom: 2pt;border-bottom-color: rgb(222,222,222); border-style:solid;line-height: 28pt;text-align: center;padding: 10px 16pt 16pt 16pt;color:rgb(102,102,102)!important;font-size:18pt!important' class='textoinstru'><i class='icon ion-android-call tic' style='color:rgb(57,135,173); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>Debes autorizar ante {{pmid}} el pago de {{total | currency}} a MercadoPago<br class='textoinstru'><div class='textoinstru' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 10px 30px; color:rgb(102,102,102)'>El teléfono está al dorso de tu tarjeta.</div></div><br><br><div class='footer'><a class='link' ng-click='Salir()'>Ya hablé con Visa y me autorizó</a></div><br><div class='footer' style='padding: 10px 0'>¿No pudiste autorizarlo?</div><div class='footer' style='line-height: 15pt;'><a class='link' ng-click='Salir()'>Elige otro medio de pago</a></div><br><footer></footer></ion-content></ion-view>";

  else if ($stateParams.paymentInfo.status=="rejected")
  $scope.HTML="<ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div class='textoinstru' style=' background-color:rgb(248,233,233);border-bottom: 2pt;border-bottom-color: rgb(222,222,222); border-style:solid;line-height: 25pt;text-align: center;padding: 10px 16pt 16pt 16pt;color:rgb(185,74,72)!important;font-size:18pt!important' class='textoinstru'><i class='icon ion-android-cancel tic' style='color:rgb(153,6,1); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>{{titulo}}<br class='textoinstru'><div class='textoinstru' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 8px 5px; color:rgb(102,102,102)'>{{subtitulo}}</div></div><br><br><center><button class='button button-outline button-positive' style='background-color:rgb(255,255,255); -webkit-tap-highlight-background-color: rgb(0,0,0,0);text-align: center; font-size: 12pt;color: rgb(0,159,222); border-color:rgb(0,159,222);'ng-click='Volver()'>Usar otro medio de pago</button></center><footer></footer></ion-content></ion-view>";

  else if ($stateParams.paymentInfo.status=="in_process")
    $scope.HTML="<ion-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style=' background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 20px 16pt 20pt 16pt;' class='textoinstru'><i class='icon ion-ios-clock-outline pesos' style='color:rgb(239,199,1); padding:40pt'></i><br class='textoinstru'>{{titulo}}<div class='texto' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 5px 30px; color:rgb(102,102,102)'>{{subtitulo}}</div></div><footer></footer></ion-content></ion-view>";
  else
    $scope.HTML="<ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div style=' background-color:rgb(234,255,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 28pt;text-align: center;padding: 10px 16pt 16pt 16pt;' class='textoinstru'><i class='icon ion-checkmark-circled tic' style='color:rgb(47,176,0); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>¡Listo, se acreditó tu pago!<div class='texto' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 5px 30px; color:rgb(102,102,102)'>Te enviaremos los datos  a usuario@gmail.com</div></div><div class='card' style='margin:0px 0px 0px 0px'><div class='item item-text-wrap textoinstru ' style='text-align: left;width:100%;display:inline-block; border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;'><img id= 'im' ng-src='{{getImagen()}}' style='padding: 0px 10px 0px 0px'>terminada en {{finalTarjeta}}<br class='textoinstru'><br><div class='textoinstru'style='font-weight: 200; text-align: left;color:rgb(0,159,222)!important'>{{cuotas}} de {{cuanto | currency}}  <i class='texto' style='color:rgb(67,176,0);text-align: left;'ng-show='intereses()'>Sin intereses</i></div><br><div class='texto'style='text-align: left;  color:rgb(102,102,102)'>En tu estado de cuenta verás el cargo como {{nombre}}.</div></div></div><div class='item item-text-wrap texto' style=' text-align: center;border-style: none;font-weight: 200;color: rgb(102,102,102); border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;'><i>Comprobante: {{comprobante}}</i></div></div><footer></footer></ion-content></ion-view>";

})
.directive('footer', function(){
    return {
      restrict: 'AE',
      template: "<br> <div style='background-color: rgb( 222,222,222); border-bottom: 1pt;border-bottom-color: rgb( 222,222,222); border-style:solid; margin: 0px 20px 0px 20px'></div> <br> <div class='footer'>Usuario@gmail.com (<a class='link'>Salir</a>)</div><br><div class='footer'><a class='link' ng-click='Salir()'>Cancelar y volver</a></div><br><div class='copy'<p>© 1999-2015 Procesado por MercadoPago</p></div><br>"
    };
})
.directive('compileHtml', function($compile) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
          scope.$watch(function () {
              return scope.$eval(attrs.compileHtml);
          }, function (value) {
              element.html(value);
              $compile(element.contents())(scope);
          });
      }
    };
});
