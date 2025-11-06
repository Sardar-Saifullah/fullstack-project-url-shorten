import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Changed imports
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import store from './store';
import Header from './components/Header';
import UrlShortener from './pages/UrlShortener';
import UrlList from './pages/UrlList';
import RedirectPage from './pages/RedirectPage'; // Add this
import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <Header />
          <Content className="content">
            <Switch> {/* Use Switch instead of Routes */}
              <Route exact path="/" component={UrlShortener} /> {/* Use component prop */}
              <Route path="/urls" component={UrlList} /> {/* Use component prop */}
               <Route path="/r/:shortCode" component={RedirectPage} /> {/* Add this route */}
            </Switch>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;