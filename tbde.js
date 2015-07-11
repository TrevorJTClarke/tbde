/**
 * tbde
 * AKA "The Best Directive Ever"
 * By: @trevorjtclarke
 */
App.directive('tbde',
["$http", function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var randomGifUrl = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=laugh";
            var el = angular.element(element);
            var playing = false;

            function createLaughter(){
                $.ajax(randomGifUrl).success(function(res){
                    var img = document.createElement("IMG");
                    img.src = res.data.image_url;
                    img.id = "tbde";
                    img.className = "avatar avatar-tdbe";

                    $("#mainAvatar").addClass("hided");

                    // put into element
                    el.append(img);

                    setTimeout(function(){
                        playing = false;
                        $("#mainAvatar").removeClass("hided");
                        $("#tbde").remove();
                    },5000);
                });
            }


            var keys = [];
            window.executeHotkeyTest = function(callback,keyValues){
                if(typeof callback !== "function")
                    throw new TypeError("Expected callback as first argument");
                if(typeof keyValues !== "object" && (!Array.isArray || Array.isArray(keyValues)))
                    throw new TypeError("Expected array as second argument");

                var allKeysValid = true;

                for(var i = 0; i < keyValues.length; ++i)
                    allKeysValid = allKeysValid && keys[keyValues[i]];

                if(allKeysValid)
                    callback();
            };

            window.addGlobalHotkey = function(callback,keyValues){
                if(typeof keyValues === "number")
                    keyValues = [keyValues];

                var fnc = function(cb,val){
                    return function(e){
                        keys[e.keyCode] = true;
                        executeHotkeyTest(cb,val);
                    };
                }(callback,keyValues);
                window.addEventListener('keydown',fnc);
                return fnc;
            };

            window.addEventListener('keyup',function(e){
                keys[e.keyCode] = false;
            });

            addGlobalHotkey(function(){
                if(playing === true){return;}
                playing = true;
                console.log("you found it! :D");
                createLaughter();
            },[16,17]); //shift ctrl
        }
    };
}]);
