let navbar = {
    templateUrl: 'js/components/common/navbar.html',
    controller: ['UsersService', '$state', '$interval', function(UsersService, $state, $interval) {
        'use strict'

        this.clock = Date.now();
        this.tick = () => {
            this.clock = Date.now();
        }
        $interval(this.tick, 1000);



        angular.extend(this, {

            $onInit() {


                UsersService.getCurrent().then((user) => {
                    this.user = user
                }).catch((err) => {

                })
            },
            disconnect() {
                UsersService.disconnect().then(() => {
                    Materialize.toast('Disconnected', 4000, 'toast-warning')
                    this.user = null
                    $state.reload()
                })
            }

            


            

        })
    }]
}

export default navbar
