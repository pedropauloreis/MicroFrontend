import React, {lazy, Suspense, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from './components/Header'
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName =  createGenerateClassName({
    productionPrefix: 'ctn',
});

export default () => {

   const [isSignedIn, setIsSignedIn] = useState(false);
   let env = "";
   let styleInn;

   switch (process.env.ENVIRONMENT)
   {
      case 'development':
         env = "DEVELOPMENT";
         styleInn = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
         };
         break;
      
      case 'stage':
            env = "STAGE";
            styleInn = {
               color: "white",
               backgroundColor: "Orange",
               padding: "10px",
               fontFamily: "Arial"
            };
            break;

      case 'production':
               env = "";
               styleInn = { };
               break;
    }

   return(
      
      <BrowserRouter>
         <StylesProvider generateClassName={generateClassName}>
            <div>
               <div style={styleInn} > {env} </div>
               <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
               <Suspense fallback={<Progress />} >
                  <Switch>
                     <Route path="/auth" ><AuthLazy  onSignIn={() => setIsSignedIn(true)} /></Route> 
                     <Route path="/"><MarketingLazy /></Route> 

                  </Switch>
               </Suspense>
            </div>
         </StylesProvider>
      </BrowserRouter>
      
   );
   
};
