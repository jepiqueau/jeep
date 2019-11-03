var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { generateUniqueId } from './utils/index';
import { attachEventProps } from './utils/attachEventProps';
export function createControllerComponent(displayName, controller) {
    const dismissEventName = `on${displayName}DidDismiss`;
    return class ReactControllerComponent extends React.Component {
        constructor(props) {
            super(props);
            this.id = generateUniqueId();
        }
        static get displayName() {
            return displayName;
        }
        async componentDidMount() {
            const { isOpen } = this.props;
            if (isOpen) {
                this.present();
            }
        }
        async componentDidUpdate(prevProps) {
            if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen === true) {
                this.present(prevProps);
            }
            if (this.controller &&
                prevProps.isOpen !== this.props.isOpen &&
                this.props.isOpen === false) {
                await this.controller.dismiss();
            }
        }
        async present(prevProps) {
            const _a = this.props, { isOpen, onDidDismiss } = _a, cProps = __rest(_a, ["isOpen", "onDidDismiss"]);
            const elementProps = Object.assign(Object.assign({}, cProps), { [dismissEventName]: onDidDismiss });
            this.controller = await controller.create(Object.assign({}, elementProps));
            attachEventProps(this.controller, elementProps, prevProps);
            this.controller.present();
        }
        render() {
            return null;
        }
    };
}
