import React, {FC} from 'react';
import { Provider }  from 'react-redux';
import store from './redux/store';

const App: FC<any> = () => {

  return (
    <Provider store={store}>

    </Provider>
  );
};

export default App;
