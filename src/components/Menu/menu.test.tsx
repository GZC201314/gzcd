import React from "react";
import {fireEvent, render, RenderResult, cleanup,waitFor} from '@testing-library/react'
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
const generateMenu = (props: any) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>

            <SubMenu title='dropdown'>
                <MenuItem>
                    dropdown1
                </MenuItem>
                <MenuItem>
                    dropdown2
                </MenuItem>
            </SubMenu>

            <MenuItem>
                xyz
            </MenuItem>
        </Menu>
    )
}
const createStyleFile = () => {
    const cssFile: string = `
    .submenu{
        display:none;
    }
    .submenu.menu-opened{
        display:block;
    }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
    //该函数在每个case执行之前都会执行，用于抽取重复的代码，防止代码冗余
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')

    })
    it('should render correct Menu and MenuItem based on default props', function () {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    });
    it('click items should change active and call the right callback', function () {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('3')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    });
    it('should render vertical mode when mode is set to vertical', function () {
        //用于清空beforeEach创建的元素
        cleanup()
        wrapper = render(generateMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    });
})
