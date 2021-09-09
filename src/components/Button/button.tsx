import React, {useEffect, useState,ButtonHTMLAttributes,AnchorHTMLAttributes,FC,ReactNode} from 'react'
import classNames from "classnames";

export type ButtonSize = 'lg'|'sm'
export type ButtonType ='primary'|'default'|'danger'|'link'

interface BaseButtonProps {
    /**
     * 设置Button的样式类
     */
    className?: string,
    /**
     * 设置Button禁用
     */
    disabled?: boolean,
    /**
     * 设置Button的大小
     */
    size?: ButtonSize,
    /**
     * 设置Button的类型
     */
    btnType?: ButtonType,
    /**
     * 设置Link Button链接
     */
    href?: string,
    /**
     * Button下面的子节点
     */
    children: ReactNode
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 这是我的第一个Button组件
 * ## 引用方法
 * ~~~js
 * import {Button} from 'gzcd'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {

    /**state  state部分**/
    const {btnType,className, disabled, size, href, children,...restProps} = props

    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled,
    })
    //区分链接按钮和普通按钮
    if (btnType === 'link' && href) {
        return (
            <a className={classes}
               href={href}
                {...restProps}
            >{children}</a>
        )
    }else {
        return (
            <button className={classes}
                    disabled={disabled}
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
    btnType:'default'
}
export default Button;
