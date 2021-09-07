import React from "react";
import {fireEvent, render} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from "./button";

const defaultProps ={
    onClick:jest.fn()
}
const testProps:ButtonProps={
    btnType:ButtonType.Primary,
    size:ButtonSize.Large,
    className:"gzcCls",
    onClick:jest.fn()
}
const disabledProps:ButtonProps={
    disabled:true,
    onClick:jest.fn()
}
describe('test button component',()=>{
    it('should render the correct default button', function () {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    });
    it('should render the correct based on different props', function () {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn-primary btn-lg gzcCls')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(testProps.onClick).toHaveBeenCalled()
    });

    it('should render a link when btntype equals link and href is provided', function () {
        const wrapper = render(<Button btnType={ButtonType.Link} href={"www.baidu.com"}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn-link')
    });
    it('should render a disabled button when disabled set to true', function () {
        const wrapper = render(<Button  {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element.disabled).toBeFalsy()
    });
})




