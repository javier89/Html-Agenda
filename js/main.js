var addressApp = angular.module('addressApp', ['ngRoute'])
.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'templates/list.html',
            controller: 'listController',
            reloadOnSearch: false,
        })
        .when('/contact', {
            templateUrl: 'templates/contact.html',
            controller: 'contactController',
            reloadOnSearch: false,
        })
})
.controller('mainController', function($scope) {

    var datos = localStorage.getItem("addressApp_data");

    if( datos != null ) {
        $scope.contacts = [ ];

        var rawContacts = JSON.parse(datos);

        _(rawContacts).forEach( function (value) {
            $scope.contacts.push(new Contact(value));
        });
    } else {
        $scope.contacts = [
            new Contact({first_name:"Joselito", last_name:"Padilla", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Juan", last_name:"Gomez", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Angulo", last_name:"Martinez", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Manuel", last_name:"Pichardo", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Fernanda", last_name:"Garcia", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Joselito", last_name:"Padilla", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Juan", last_name:"Gomez", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Angulo", last_name:"Martinez", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Manuel", last_name:"Pichardo", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"}),
            new Contact({first_name:"Fernanda", last_name:"Garcia", email:"j@gmail.com", phoneNumber:"4569877896", country: "Mex"})
        ];
    }
    console.debug($scope.contacts);
})

/*
    * List view
*/
.controller('listController', function($scope, $location){
    document.getElementsByTagName("html")[0].className = "listController";
    // control change view form animation
    $scope.goForm = function(_id){
        $location.path("contact").search({id:_id});
    }

    // Scroll control
    $scope.btn_scroll_down = function(direction){
        $scope.scroll_direction = direction;
        $scope.scroll_timer = setInterval(scroll_exe, 10);
    };

    $scope.btn_scroll_up = function(){
        clearInterval($scope.scroll_timer);
    };

    var scroll_exe = function(){
        var wrapper = document.getElementsByClassName("list_wrapper")[0];
        wrapper.scrollTo(0, wrapper.scrollTop + $scope.scroll_direction);
    }
})

/*
* Form View
*/
.controller('contactController', function($scope, $location, $routeParams){
    document.getElementsByTagName("html")[0].className = "contactController";

    // back ti lost
    $scope.goList = function(){
        $location.path("/")
    }

    // Countries list
    $scope.countries = window.countries;
    // controls if new or edit and change the button bar depending on it
    $scope.new = true ;
    var id_param = Number($routeParams.id);
    if(!_.isNaN(id_param)){
        $scope.savedContact=_.find($scope.contacts, function(o){
            return o.id == id_param;
        });
        $scope.contact = angular.copy($scope.savedContact);
        $scope.new = false;
    }

    // save contact
    $scope.add = function(){
        var new_contact = new Contact();
        _.forIn($scope.contact, function (value, key){
            new_contact[key] = value;
        });
        $scope.contacts.push(new_contact);
        returnHome();
    }

    // update contact
    $scope.update = function(){
        _.forIn($scope.contact, function(vale, key){
            $scope.savedContact[key] = value;
        });
        returnHome();
    }

    // delete contact
    $scope.delete = function(){
        var deleted = _.remove($scope.contacts, function(object){
            return object.id == $scope.contact.id;
        });
        returnHome();
    }

    // exe at thr end of any change
    var returnHome = function(){
        persistData();
        $scope.goList();
    }

    // saveData in the clients
    var persistData = function(){
        localStorage.setItem("addressApp_data", JSON.stringify($scope.contacts));
    }

})

/*
 * At the end of the list render if show scroll bar
*/
.directive('listReadyDirective', function($timeout){
    return {
        restrict: 'A',
        link:function($scope,element, attrs){
            if($scope.$last === true){
                $timeout(function(){
                    var wrapper = document.getElementsByClassName("list_wrapper")[0];
                    var ul = wrapper.getElementsByTagName("ul")[0];
                    var _display = "none";
                    console.log(ul.offsetHeight + ">" + wrapper.offsetHeight);
                    if(ul.offsetHeight > wrapper.offsetHeight){
                        _display = "block";
                    }
                    document.getElementsByClassName("scroll_bar")[0].style.display = _display;
                }, 10)
            }
        }
    }

})