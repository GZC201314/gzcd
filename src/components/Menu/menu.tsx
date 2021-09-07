import React, {useEffect, useState, createContext} from 'react'
import classNames from "classnames";
import {MenuItemProps} from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: (selectedIndex: string) => void;
    defaultOpenSubMenus?:string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallBack;
    mode?:MenuMode;
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props) => {
    /**state  state部分**/
    const {className, mode, style, children, defaultIndex, onSelect,defaultOpenSubMenus} = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal':mode !== 'vertical',
    })
    /**methods 方法部分**/

    /**effect  effect部分**/
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode:mode,
        defaultOpenSubMenus:defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children,(children,index)=>{
            const childElement = children as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if(displayName==='MenuItem'||displayName==='SubMenu'){
                return React.cloneElement(childElement,{
                    index:index.toString()
                });
            }else {
                console.error("Error:Menu has a child which is not a MenuItem component")
            }
        });
    }

    /**styles 样式部分**/

    /**render**/

    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus:[]
}
export default Menu
