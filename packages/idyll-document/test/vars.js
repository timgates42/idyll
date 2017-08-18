import React from 'react';

import componentClasses from 'idyll-components';
import InteractiveDocument from '../src/';
import ast from './fixtures/ast.json'

describe('Component state initialization', () => {
  it('creates the expected state', () => {
    const doc = new InteractiveDocument({ast, componentClasses});
    expect(doc.state).toEqual({x: 2, frequency: 1});
  });

  it('creates the expected derived vars', () => {
    const doc = new InteractiveDocument({ast, componentClasses});
    expect(doc.derivedVars).toEqual({
      xSquared: {
        value: 4,
        update: expect.any(Function)
      }
    });
  });

  it('creates the expected data props', () => {
    const doc = new InteractiveDocument({ast, componentClasses, datasets: {myData: 'FAKE DATA'}});
    expect(doc.state).toEqual({x: 2, frequency: 1, myData: 'FAKE DATA'});
  });

  it('can return the expected derived var values', () => {
    const doc = new InteractiveDocument({ast, componentClasses});
    expect(doc.getDerivedVars()).toEqual({xSquared: 4});
  });

  it('can update the derived vars', () => {
    const doc = new InteractiveDocument({ast, componentClasses});
    doc.updateDerivedVars({x: 3, frequency: 5});
    expect(doc.getDerivedVars()).toEqual({xSquared: 9});
  });
});
