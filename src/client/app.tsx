import * as React from 'react'; // need to import * as... otherwise parcel renames it - which then breaks when the jsx is transformed assuming the name is React
import ReactDOM from 'react-dom';

const AppRoot = () => <div>Hallo Welt!</div>

ReactDOM.render(
    <AppRoot />,
    document.getElementById('react-mount-point')
  );