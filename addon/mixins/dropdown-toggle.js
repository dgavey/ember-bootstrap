import Ember from 'ember';

/**
 * Mixin for components that act as dropdown toggles.
 *
 * @class DropdownToggle
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({
  classNames: ['dropdown-toggle'],

  isToggleButton: true,

  /**
   * @property ariaRole
   * @default button
   * @type string
   * @protected
   */
  ariaRole: 'button',

  /**
   * Reference to the parent dropdown component
   *
   * @property dropdown
   * @type {Components.Dropdown}
   * @private
   */
  dropdown: null,

  setDropdown() {
    let dropdown = this.get('dropdown');
    if (dropdown) {
      if (!this.get('isDestroyed') && !dropdown.get('toggle')) {
        dropdown.set('toggle', this);
      }
    }
  }

});
