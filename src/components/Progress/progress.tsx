import React, {FC} from 'react'
import {ThemeProps} from '../Icon/icon'

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {

    /**state  state部分**/
    const {
        percent, strokeHeight,
        showText,
        styles,
        theme
    } = props
    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return (
        <div className={'gzcd-progress-bar'} style={styles}>
            <div className={'gzcd-progress-bar-outer'} style={{height:`${strokeHeight}`}}>
                <div className={`gzcd-progress-bar-inner color-${theme}`}
                style={{width:`${percent}%`}}>
                    {showText && <span className={'inner-text'}>{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    );
}
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}
export default Progress
