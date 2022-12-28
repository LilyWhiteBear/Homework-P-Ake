export const Routing = {
    Common : {
        Authen: 'auth',
        Main: 'main'
    },
    Authen : {
        Login : 'login'
    },
    Main : {
        Link : 'link',
        Calendar: 'calendar',
        Table: 'table',
        Form: 'form',
        Steps: {
            Step1: 'step1',
            Step2: 'step2',
            Step3: 'step3'
        },
        Payment: 'payment'
    },
    API : {
        Authen : {
            Login : '/v2/api-gw/register/login',
            GetKey: '/v2/api-gw/services/encryption/getkey'
        },
        Streaming : {
            Login : 'https://localhost:5001/WeatherForecast'
        },
        Omise: {
            Script: 'https://cdn.omise.co/omise.js'
        },
        Backend: {
            Host: 'http://localhost:9000',
            Sub: {
                credit: '/checkout/checkout-by-credit',
                banking: '/checkout/checkout-by-internet-banking',
                jwt: '/auth/generate-jwt'
            }
        }
    }
}

export const MainRouteCode = [Routing.Main.Calendar, Routing.Main.Table, Routing.Main.Form, Routing.Main.Payment]