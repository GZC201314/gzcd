import React from 'react';

import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Button autoFocus>button</Button>
        <Button  btnType={ButtonType.Primary} size={ButtonSize.Large}>button</Button>
        <Button btnType={ButtonType.Link} href={"http://www.baidu.com"}>Baidu Link</Button>
      </header>
    </div>
  );
}

export default App;