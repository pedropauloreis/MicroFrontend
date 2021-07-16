import {createApp} from 'vue';
import Dashboard from './components/Dashboard.vue'

const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
};

//Context #1
//We are running this file in development in isolation
//We are using our local index.html file
//Wicht DEFNITELY has an element with an id of 'dev-products'
//We want to immediately render our app into tha element
if (process.env.NODE_ENV === 'development')
{
    const devRoot = document.querySelector('#_dashboard-dev-root');

    //Assuming our container doesnt an element with id dev-products-dev-only
    if (devRoot)
    {
        //We are running in isolation
        mount(devRoot);
    }
}


//Context #3 PRD
export {mount};
