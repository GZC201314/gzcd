import React from "react";
import {addDecorator, storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Button from "./button";

const defaultButto = () =>
    (
        <Button onClick={action('clicked')}> default button</Button>
    )
const buttonWithSize = () => (
    <>
        <Button size='lg'>large button</Button>
        <Button size='sm'>small button</Button>
    </>
)
const buttonWithType = () => (
    <>
        <Button btnType='primary'>primary button</Button>
        <Button btnType='danger'>danger button</Button>
        <Button btnType='link' href='www.baidu.com'>link button</Button>

    </>
)



storiesOf('Button Component', module)
    .add(
        'Button', defaultButto
    ).add("大小尺寸的Button", buttonWithSize)
    .add("不同类型的Button", buttonWithType)

