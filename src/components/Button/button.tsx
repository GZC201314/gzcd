import React, {useEffect, useState} from 'react'
import classNames from "classnames";

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType,
    href?: string,
    children: React.ReactNode
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {

    /**state  state部分**/
    const {btnType,className, disabled, size, href, children,...restProps} = props

    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled,
    })
    //区分链接按钮和普通按钮
    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classes}
               href={href}
                {...restProps}
            >{children}</a>
        )
    }else {
        return (
            <button className={classes}
                    {...restProps}
            >{children}</button>
        )
    }
    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/
}
Button.defaultProps ={
    disabled:false,
    btnType:ButtonType.Default
}
export default Button