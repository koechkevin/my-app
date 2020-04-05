import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PageLayout } from './components';
import { Resume } from './Pages';
import Exception404 from './Pages/404';
import FillNewPassword from './Pages/Authentication/FillNewPassword';
import Register from './Pages/Authentication/Register';
import Email from './Pages/Email';
import Message from './Pages/Messages/Messages';
import UserLandingPage from './Pages/UserLandingPage';
import { messageListener } from './redux/effects/messaging';
import store from './redux/store';

import 'antd/dist/antd.css';
import Log from './Social';

const App: FC<any> = () => {
  useEffect(() => {
    messageListener('');
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageLayout>
          <Switch>
            <Route exact path="/" component={UserLandingPage} />
            <Route exact path="/social" component={Log} />
            <Route exact path="/:username" component={UserLandingPage} />
            <Route exact path="/:username/resume" component={Resume} />
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/auth/fill-new-password" component={FillNewPassword} />
            <Route exact path="/:username/messages" component={Message} />
            <Route exact path="/personal/email" component={Email} />
            <Route
              exact
              path="/exception/404"
              render={() => <Exception404 exception={404} text="Sorry, the page you visited does not exist." />}
            />
            <Route
              exact
              path="/exception/403"
              render={() => (
                <Exception404
                  exception={403}
                  text="You are not authorized to access this page. Please login to continue"
                />
              )}
            />
            <Route
              exact
              path=""
              render={() => <Exception404 exception={404} text="Sorry, the page you visited does not exist." />}
            />
          </Switch>
        </PageLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
