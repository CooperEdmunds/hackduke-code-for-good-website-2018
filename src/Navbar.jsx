import React from 'react';

import { css } from 'emotion';
import styled from 'react-emotion';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { MAX_WIDTH, HideOnMobile, TitleFont } from './common-styles';

const navHeightPx = 60;
const fullShadowScrollOffset = 320;

const Nav = styled('div')`
    ${HideOnMobile};
    ${TitleFont};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: ${navHeightPx}px;
    background-color: white;
    z-index: 64;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    :after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: ${navHeightPx}px;
        z-index: -1;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.075);
        opacity: ${props => props.shadowOpacity};
    }
`;

const NavItemsWrapper = styled('div')`
    max-width: ${MAX_WIDTH};
    margin: 0 auto;
    padding-left: 144px;
    height: 100%;
`;

const NavItem = ({ color }) => css`
    ${TitleFont};
    color: #2b2b2b;
    height: 100%;
    font-size: 1.1em;
    line-height: 3.333em;
    display: inline-block;
    margin-right: 15px;
    width: 80px;
    text-align: center;
    border-bottom: 0px solid ${color};
    transition: border-bottom 0.1s;
    cursor: pointer;
    text-decoration: none;

    :hover {
        border-bottom: 6px solid ${color};
    }
`;

const Spacer = styled('div')`
    ${HideOnMobile};
    height: ${navHeightPx}px;
`;

class NavContents extends React.PureComponent {
    render() {
        const { navItems } = this.props;
        return (
            <NavItemsWrapper>
                {navItems.map(({ title, id, titleColor }) => (
                    <AnchorLink
                        offset={navHeightPx / 2}
                        key={id}
                        css={NavItem({ color: titleColor })}
                        href={`#${id}`}
                    >
                        {title}
                    </AnchorLink>
                ))}
            </NavItemsWrapper>
        );
    }
}

export default class Navbar extends React.PureComponent {
    state = { scrollOffset: 0 };

    componentDidMount() {
        this.updateScrollOffset();
        window.addEventListener('scroll', this.updateScrollOffset);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateScrollOffset);
    }

    render() {
        const { scrollOffset } = this.state;
        return (
            <React.Fragment>
                <Nav shadowOpacity={scrollOffset / fullShadowScrollOffset}>
                    <NavContents {...this.props} />
                </Nav>
                <Spacer />
            </React.Fragment>
        );
    }

    updateScrollOffset = () =>
        this.setState({
            scrollOffset: Math.min(window.scrollY, fullShadowScrollOffset)
        });
}
