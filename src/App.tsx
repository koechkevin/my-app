import React, {FC} from 'react';
import { Provider }  from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PageLayout} from './components';
import {Home, Resume} from './Pages';
import store from './redux/store';

import 'antd/dist/antd.css';

const App: FC<any> = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <PageLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/resume" component={Resume} />
          </Switch>
      </PageLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
