import React, {useEffect, useState,useContext} from 'react'
import classNames from "classnames";
import {MenuContext} from "./menu";
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    /**state  state部分**/
    const {index, disabled, className, style,children} = props;
    const context = useContext(MenuContext)
    const classes = classNames('menu-item',className,{
        'is-disabled':disabled,
        'is-active':context.index === index
    })
    /**methods 方法部分**/

    /**effect  effect部分**/
    const handleClick = ()=>{
        if(context.onSelect && !disabled && (typeof index === 'string')){
            context.onSelect(index);
        }
    }

    /**styles 样式部分**/

    /**render**/

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    );
}
MenuItem.displayName = 'MenuItem'
export default MenuItem
