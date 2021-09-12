import React from "react";
import {render , fireEvent} from "@testing-library/react";
import {Input,InputProps} from "./input";

const defaultProps:InputProps={
    onChange:jest.fn(),
    placeholder:'test-input'
}

describe('test Input component',()=>{
    it('should render the correct default Input', function () {
        const wrapper = render(<Input {...defaultProps}/>)
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        //是否渲染到文档中
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('gzcd-input-inner')
        fireEvent.change(testNode,{target:{value:'23'}})
        expect(testNode.value).toEqual('23')
    });

    it('should render the disabled Input on disabled property', function () {
        const wrapper = render(<Input disabled placeholder='disabled'></Input>)
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    });

    it('should render different input sizes on size property', function () {
        const {queryByText,container} = render(<Input placeholder='pend' prepend='https://' append='.com'></Input>)
        const testContainer = container.querySelector('.gzcd-input-wrapper')
        expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
        expect(queryByText('https://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
        // expect(testNode.disabled).toBeTruthy()
    });
})