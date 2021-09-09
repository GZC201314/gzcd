import React, {useEffect, useState} from 'react'
import classNames from "classnames";
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {

    /**state  state部分**/
    const {className, theme, ...restProps} = props
    const classes = classNames('gzcd-icon',className,{
        [`icon-${theme}`]:theme
    })
    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}
export default Icon
