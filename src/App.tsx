import React from 'react';

import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu, {MenuProps} from "./components/Menu/menu";
import MenuItem, {MenuItemProps} from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Menu defaultOpenSubMenus={['2']} defaultIndex='0' mode='vertical' onSelect={(index) => {
                    console.log(index)
                }}>
                    <MenuItem index='0'>
                        cool Link
                    </MenuItem>
                    <MenuItem index='1' disabled>
                        cool Link 2
                    </MenuItem>
                    <SubMenu title='dropdown'>
                        <MenuItem>
                            dropdown1
                        </MenuItem>
                        <MenuItem>
                            dropdown2
                        </MenuItem>
                    </SubMenu>
                    <MenuItem index='2'>
                        cool Link 3
                    </MenuItem>
                </Menu>
                {/*<Button autoFocus>button</Button>*/}
                {/*<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>button</Button>*/}
                {/*<Button btnType={ButtonType.Link} href={"http://www.baidu.com"}>Baidu Link</Button>*/}
            </header>
        </div>
    );
}

export default App;
