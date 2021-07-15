import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';


const mount = (el, {onNavigate, defaultHistory, initialPath}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    
    if(onNavigate)
    {
        history.listen(onNavigate);
    }


    
    ReactDOM.render(
        <App history={history} />,
        el
    );

    return {
        onParentNavigate({pathname: nextPathname}) {
            const {pathname} = history.location;
            if(pathname !== nextPathname)
            {
                history.push(nextPathname);
            }
            
        }
    }
};

//Context #1
//We are running this file in development in isolation
//We are using our local index.html file
//Wicht DEFNITELY has an element with an id of 'dev-products'
//We want to immediately render our app into tha element
if (process.env.NODE_ENV === 'development')
{
    const devRoot = document.querySelector('#_auth-dev-root');

    //Assuming our container doesnt an element with id dev-products-dev-only
    if (devRoot)
    {
        //We are running in isolation
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}


//Context #3 PRD
export {mount};
