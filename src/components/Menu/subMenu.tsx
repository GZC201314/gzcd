import React, {useContext, FunctionComponentElement, useState} from 'react'
import classNames from "classnames";
import Menu, {MenuContext} from "./menu";
import {MenuItemProps} from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
    index?: string,
    title?: string,
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {

    /**state  state部分**/
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const {index, title, className, children} = props;
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(isOpened)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    /**effect  effect部分**/

    /**methods 方法部分**/
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    const renderChildren = () => {
        const sunMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (children, i) => {
            const childrenElement = children as FunctionComponentElement<MenuItemProps>
            if (childrenElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childrenElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Error:SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <Transition
                in={menuOpen}
                timeout={300}
                animation='zoom-in-top'
            >
                <ul className={sunMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>

        );
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
        }
    } : {}
    /**styles 样式部分**/

    /**render**/

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
                <Icon icon='angle-down' className='arrow-icon'/>
            </div>
            {renderChildren()}
        </li>
    );
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
