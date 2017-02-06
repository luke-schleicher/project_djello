dj.factory('userService',
  ['Auth',
    function(Auth) {

      var currentUser;

      var getCurrentUser = function() {
        return Auth.currentUser().then(
          function(user) {
            currentUser = user;
            return currentUser;
          }, function(response) {
            console.log(response);
            return currentUser;
          }
        );
      };

      return {
        getCurrentUser: getCurrentUser
      };
    }
  ]
);
