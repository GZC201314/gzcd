import React, {useState} from 'react';

import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu, {MenuProps} from "./components/Menu/menu";
import MenuItem, {MenuItemProps} from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
//一次把所有icon导入到库中
import { fas } from '@fortawesome/free-solid-svg-icons'
import{library} from '@fortawesome/fontawesome-svg-core'
library.add(fas)
function App() {
    const [show,setShow] = useState(false)
    return (
        <div className="App">
            <header className="App-header">
                <Icon icon='arrow-alt-circle-down' theme='primary' size='10x'/>
                <Menu defaultOpenSubMenus={['2']} defaultIndex='0' mode='horizontal' onSelect={(index) => {
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
                <Button size='lg' onClick={()=>{
                    setShow(!show)
                }}>
                    toggle
                </Button>
                <Transition
                in={show}
                timeout={300}
                animation='zoom-in-left'
                >
                    <div>
                        <p>
                            Edit<code>src/app.tsx</code> and save to reload.
                        </p>
                        <p>
                            Edit<code>src/app.tsx</code> and save to reload.
                        </p>
                        <p>
                            Edit<code>src/app.tsx</code> and save to reload.
                        </p>
                        <p>
                            Edit<code>src/app.tsx</code> and save to reload.
                        </p>
                        <p>
                            Edit<code>src/app.tsx</code> and save to reload.
                        </p>
                    </div>
                </Transition>
                <Transition
                    in={show}
                    timeout={300}
                    animation='zoom-in-left'
                    wrapper
                >
                    <Button
                        btnType='primary'
                    > Hello World</Button>
                </Transition>
                {/*<Button autoFocus>button</Button>*/}
                {/*<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>button</Button>*/}
                {/*<Button btnType={ButtonType.Link} href={"http://www.baidu.com"}>Baidu Link</Button>*/}
            </header>
        </div>
    );
}

export default App;
