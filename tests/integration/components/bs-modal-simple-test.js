import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-modal-simple', 'Integration | Component | bs-modal-simple', {
  integration: true
});

const transitionTimeout = 500;

test('Simple modal has header, footer and body', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(this.$('.modal .modal-header .modal-title').text().trim(), 'Simple Dialog', 'Modal header has correct title.');
  assert.equal(this.$('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(this.$('.modal .modal-footer button').length, 1, 'Modal has button in footer.');
  assert.equal(this.$('.modal .modal-footer button').text().trim(), 'Ok', 'Modal button has default title.');
  assert.equal(this.$('.modal .modal-body').length, 1, 'Modal has body.');
  assert.equal(this.$('.modal .modal-body').text().trim(), 'Hello world!', 'Modal body has correct content.');
});

test('Simple modal has default CSS classes', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

  assert.ok(this.$('.modal').hasClass('fade'), 'Modal has fade class');

  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.ok(this.$('.modal').hasClass('in'), 'Modal has in class');
    done();
  }, transitionTimeout);
});

test('Simple modal supports custom buttons', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok"}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(this.$('.modal .modal-footer button.btn-default').length, 1, 'Modal has close button.');
  assert.equal(this.$('.modal .modal-footer button.btn-default').text().trim(), 'Cancel', 'Close button has correct title.');
  assert.equal(this.$('.modal .modal-footer button.btn-primary').length, 1, 'Modal has submit button.');
  assert.equal(this.$('.modal .modal-footer button.btn-primary').text().trim(), 'Ok', 'Submit button has correct title.');

});

test('open property shows modal', function(assert) {
  this.set('open', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
  this.set('open', true);
  assert.equal(this.$('.modal').hasClass('in'), true, 'Modal has in class');
  this.set('open', false);
  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
});

test('open property shows modal [fade]', function(assert) {
  let done = assert.async();
  this.set('open', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" open=open}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
  this.set('open', true);
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal has in class');
    this.set('open', false);
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('closeButton property shows close button', function(assert) {
  this.set('closeButton', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeButton=closeButton}}Hello world!{{/bs-modal-simple}}`);
  assert.equal(this.$('.modal .modal-header .close').length, 0, 'Modal has no close button');
  this.set('closeButton', true);
  assert.equal(this.$('.modal .modal-header .close').length, 1, 'Modal has close button');
});

test('fade property toggles fade effect', function(assert) {
  this.set('fade', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=fade}}Hello world!{{/bs-modal-simple}}`);
  assert.equal(this.$('.modal').hasClass('fade'), false, 'Modal has no fade class');
  this.set('fade', true);
  assert.equal(this.$('.modal').hasClass('fade'), true, 'Modal has fade class');
});

test('backdrop=true adds backdrop element', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" backdrop=true}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal-backdrop').length, 1, 'Modal has backdrop element');
    assert.ok(this.$('.modal-backdrop').hasClass('in'), 'Modal backdrop has in class');
    done();
  }, transitionTimeout);
});

test('backdrop=false removes backdrop element', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" backdrop=false}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal-backdrop').length, 0, 'Modal has no backdrop element');
    done();
  }, transitionTimeout);
});

test('clicking close button closes modal when autoClose=true', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-header .close').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking ok button closes modal when autoClose=true', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-footer button').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking close button leaves modal open when autoClose=false', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" autoClose=false}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-header .close').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('can implement custom close buttons', function(assert) {
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" as |modal|}}
      Hello world! <a href="#" class="close-link" onclick={{modal.close}}>close</a>
    {{/bs-modal-simple}}
  `);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .close-link').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('size property adds size class', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" size="lg"}}Hello world!{{/bs-modal-simple}}`);
  assert.ok(this.$('.modal-dialog').hasClass('modal-lg'), 'Modal has size class.');
});

test('onShow/onShown actions fire correctly with fade=false', function(assert) {
  assert.expect(4);

  this.set('open', false);
  let openActionCount = 0;
  let openedActionCount = 0;
  this.on('openAction', () => {
    openActionCount += 1;
    assert.notEqual(this.$('.modal-body').width(), 0, 'the modal is displayed when openAction is fired');
    assert.equal(openedActionCount, 0, 'openAction does not fire before openedAction');
  });
  this.on('openedAction', () => {
    openedActionCount += 1;
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onShow=(action "openAction") onShown=(action "openedAction") open=open fade=false}}Hello world!{{/bs-modal-simple}}`);

  this.set('open', true);

  assert.equal(openActionCount, 1, 'open action fired after setting open=true');
  assert.equal(openedActionCount, 1, 'opened action fired after setting open=true');
});

test('onShow/onShown fire correctly with fade=true', function(assert) {
  assert.expect(5);

  this.set('open', false);
  let openActionCount = 0;
  let openedActionCount = 0;
  this.on('openAction', () => {
    openActionCount += 1;
    assert.notEqual(this.$('.modal-body').width(), 0, 'the modal is displayed when openAction is fired');
  });
  this.on('openedAction', () => {
    openedActionCount += 1;
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onShow=(action "openAction") onShown=(action "openedAction") open=open}}Hello world!{{/bs-modal-simple}}`);

  this.set('open', true);

  assert.equal(openActionCount, 0, 'open action did not fire immediately');
  assert.equal(openedActionCount, 0, 'opened action did not fire immediately');

  // wait for fade animation
  let done = assert.async();
  setTimeout(() => {
    assert.equal(openActionCount, 1, 'open action fired');
    assert.equal(openedActionCount, 1, 'opened action fired');

    done();
  }, transitionTimeout);
});

test('onHide is called when clicking close button', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction")}}Hello world!{{/bs-modal-simple}}`);
  this.$('.modal .modal-header .close').click();
});

test('onHidden is called after modal is closed', function(assert) {
  assert.expect(1);

  this.set('open', true);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHidden=(action "testAction") open=open}}Hello world!{{/bs-modal-simple}}`);

  this.set('open', false);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    done();
  }, transitionTimeout);

});

test('onSubmit is called when clicking submit button', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "testAction") as |modal|}}Hello world!{{/bs-modal-simple}}`);
  this.$('.modal .modal-footer button.btn-primary').click();
});

test('when modal has a form and the submit button is clicked, the form is submitted', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.on('doNotCallThisAction', () => {
    assert.ok(false, 'submitAction of modal must not be called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "doNotCallThisAction") as |modal|}}{{#bs-form action=(action "testAction")}}{{/bs-form}}{{/bs-modal-simple}}`);
  this.$('.modal .modal-footer button.btn-primary').click();
});

test('autofocus element is focused when present and fade=false', function(assert) {
  assert.expect(1);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" fade=false open=open}}
      <input class="my-input" autofocus="autofocus"/> blahblahblah
    {{/bs-modal-simple}}
    
  `);

  this.$('.modal').one('focus', '.my-input', () => {
    assert.ok(true, 'focus was triggered on the autofocus element');
  });

  this.set('open', true);
});

test('autofocus element is focused when present and fade=true', function(assert) {
  assert.expect(1);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" fade=true open=open}}
      <input class="my-input" autofocus="autofocus"/>
    {{/bs-modal-simple}}
    
  `);

  this.$('.modal').one('focus', '.my-input', () => {
    assert.ok(true, 'focus was triggered on the autofocus element');
  });

  this.set('open', true);

  // wait for fade animation
  let done = assert.async();
  setTimeout(() => {
    done();
  }, transitionTimeout);
});

test('Pressing escape key will close the modal if keyboard=true', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=true}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    let e = Ember.$.Event('keydown');
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Pressing escape key will close the modal if keyboard=true and element is autofocused', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=true}}
      <input autofocus="autofocus"/>
    {{/bs-modal-simple}}
    
  `);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    let e = Ember.$.Event('keydown');
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Pressing escape key is ignored if keyboard=false', function(assert) {
  assert.expect(2);
  this.on('testAction', () => {
    assert.ok(false, 'Action must not be called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=false}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    let e = Ember.$.Event('keydown');
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Clicking on the backdrop will close the modal', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction")}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    this.$('.modal').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Clicking on the backdrop is ignored when backdropClose=false', function(assert) {
  assert.expect(2);
  this.on('testAction', () => {
    assert.ok(false, 'Action must not be called.');
  });
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") backdropClose=false}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    this.$('.modal').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Renders in wormhole if renderInPlace is not set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-modal-container"></div>{{#if show}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`);
  this.set('show', true);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal').parent().attr('id'), 'ember-bootstrap-modal-container');
});

test('Renders in place (no wormhole) if renderInPlace is set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-modal-container"></div>{{#if show}}{{#bs-modal-simple title="Simple Dialog" renderInPlace=true}}Hello world!{{/bs-modal-simple}}{{/if}}`);
  this.set('show', true);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.notEqual(this.$('.modal').parent().attr('id'), 'ember-bootstrap-modal-container');
});

test('Removes "modal-open" class when component is removed from view', function(assert) {
  this.set('renderComponent', true);
  this.render(hbs`{{#if renderComponent}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.ok($('body').hasClass('modal-open'), 'body element has "modal-open" class.');

    this.set('renderComponent', false);

    assert.ok(!($('body').hasClass('modal-open')), 'body element does not have "modal-open" class.');
    done();
  }, transitionTimeout);
});

test('Resets scroll bar when component is removed from view', function(assert) {
  document.body.style.paddingRight = '50px';
  this.set('renderComponent', true);
  this.render(hbs`{{#if renderComponent}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    document.body.style.paddingRight = '0px';
    this.set('renderComponent', false);

    assert.equal(document.body.style.paddingRight, '50px', 'paddingRight restored to 50px');
    document.body.style.paddingRight = '0px';
    done();
  }, transitionTimeout);
});
