import React from 'react';
import {addDecorator, addParameters} from "@storybook/react";
import '../src/styles/index.scss'
import  {withInfo} from '@storybook/addon-info'

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

const styles: React.CSSProperties = {
    padding: '20px 40px'
}
const storyWrapper = (storyFn: any) =>
    <div style={styles}>
        <h3>组件演示</h3>
        {storyFn()}
    </div>


//
// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(storyWrapper)
// @ts-ignore
addDecorator(withInfo)
addParameters({
    info:{
        inline:true,
        header:false
    }
})
