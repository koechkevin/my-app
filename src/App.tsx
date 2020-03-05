import React, {FC} from 'react';
import { Provider }  from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PageLayout} from './components';
import {Home, Resume} from './Pages';
import Exception404 from './Pages/404';
import Register from './Pages/Authentication/Register';
import UserLandingPage from './Pages/UserLandingPage';
import store from './redux/store';

import 'antd/dist/antd.css';

const App: FC<any> = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <PageLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:username" component={UserLandingPage} />
            <Route exact path="/:username/resume" component={Resume} />
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/exception/404" component={Exception404} />
            <Route exact path="" component={Exception404} />
          </Switch>
      </PageLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
