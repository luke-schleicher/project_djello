dj.factory('userService',
  ['Auth',
    function(Auth) {

      var currentUser;

      Auth.currentUser().then(
        function(user) {
          currentUser = user;
        }, function(response) {
          console.log(response);
        }
      );


      var getCurrentUser = function getCurrentUser() {
        return currentUser;
      };

      return {
        getCurrentUser: getCurrentUser
      };
    }
  ]
);
