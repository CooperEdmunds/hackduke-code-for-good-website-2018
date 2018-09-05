import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

import { SecondaryText, ShadowItem, TitleFont } from '../common-styles';

const CardBase = styled('div')`
    height: 285px;
    margin-bottom: 25px;
    cursor: ${props => (props.showPointer ? 'pointer' : 'auto')};

    @media screen and (min-width: 960px) {
        flex-grow: 1;
        flex-basis: 0;
        margin-right: 25px;

        :last-child {
            margin-right: 0;
        }
    }

    ${ShadowItem};
    background: ${props => props.color};

    :hover {
        opacity: 0.95;
    }
`;

const fillParent = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const CardClipBounds = styled('div')`
    ${fillParent};
    overflow: hidden;
`;

const cubicEaseOutTransition = css`
    transition: opacity 0.33s cubic-bezier(0.19, 1, 0.22, 1),
        transform 0.33s cubic-bezier(0.19, 1, 0.22, 1);
`;

const CardTitle = styled('div')`
    ${TitleFont};
    ${fillParent};
    text-transform: uppercase;
    font-size: 1.8em;
    font-weight: bold;
    color: white;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;

    opacity: ${props => (props.visible ? 1 : 0)};
    transform: ${props => `translateY(${props.visible ? '0' : '-144px'})`};
    ${cubicEaseOutTransition};
`;

const CardContent = styled('div')`
    ${SecondaryText};
    ${fillParent};
    padding: 25px;
    color: white;

    pointer-events: ${props => (props.visible ? 'auto' : 'none')};
    opacity: ${props => (props.visible ? 1 : 0)};
    transform: ${props => `translateY(${props.visible ? '0' : '144px'})`};
    ${cubicEaseOutTransition};
`;

export default class TrackCard extends React.PureComponent {
    state = {
        opened: false
    };

    setOpened = () => this.setState({ opened: true });

    render() {
        const { opened } = this.state;
        const { color, title, children } = this.props;
        return (
            <CardBase
                color={color}
                showPointer={!opened}
                onClick={this.setOpened}
            >
                <CardClipBounds>
                    <CardTitle visible={!opened}>{title}</CardTitle>
                    <CardContent visible={opened}>{children}</CardContent>
                </CardClipBounds>
            </CardBase>
        );
    }
}
